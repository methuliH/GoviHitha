"""ResourceRecommendationAgent — recommends locally-available farm inputs."""
from __future__ import annotations

import json

from google import genai
from google.genai.types import GenerateContentConfig

from agents.config.settings import settings
from agents.prompts.resource_prompt import RESOURCE_PROMPT
from agents.schemas.diagnosis_schema import DiagnosisResult
from agents.schemas.resource_schema import ResourceResult
from agents.schemas.weather_schema import WeatherResult
from agents.utils.error_handler import with_retry
from agents.utils.logger import get_logger

logger = get_logger(__name__)


def _fallback(error: str) -> ResourceResult:
    return ResourceResult(
        recommendations=[],
        priority_note="Unable to generate recommendations at this time.",
        error=error,
    )


class ResourceRecommendationAgent:
    """Stateless agent: call recommend() to get product recommendations."""

    def recommend(
        self,
        crop_type: str,
        diagnosis: DiagnosisResult,
        weather: WeatherResult,
        region: str,
    ) -> ResourceResult:
        """Return product recommendations for the given diagnosis and weather context.

        Args:
            crop_type: e.g. "rice", "tea"
            diagnosis: output from CropDiagnosisAgent
            weather: output from WeatherAlertAgent
            region: Sri Lankan district name

        Returns:
            ResourceResult — always returned, never raises.
        """
        logger.info(
            "Resource recommendation request: crop=%s region=%s disease=%s",
            crop_type, region, diagnosis.disease_name,
        )

        if not settings.GOOGLE_API_KEY:
            return _fallback("GOOGLE_API_KEY not set.")

        # Build weather context summary
        alert_summary = (
            ", ".join(f"{a.risk_type} ({a.likelihood})" for a in weather.alerts)
            if weather.alerts else "No significant weather risks"
        )

        user_prompt = (
            f"Crop: {crop_type}\n"
            f"Region: {region} (Sri Lanka)\n"
            f"Diagnosed disease: {diagnosis.disease_name}\n"
            f"Disease risk level: {diagnosis.risk_level}\n"
            f"Required treatment steps: {'; '.join(diagnosis.treatment_steps)}\n"
            f"Current weather: {weather.current_weather.temperature}°C, "
            f"{weather.current_weather.humidity}% humidity, "
            f"{weather.current_weather.rainfall_7d}mm rainfall last 7 days\n"
            f"Weather risks: {alert_summary}\n\n"
            "Recommend specific products available in Sri Lanka to treat this disease "
            "and address the weather risks. Include Kapruka search links."
        )

        try:
            raw_text = with_retry(
                lambda: _call_gemini(user_prompt),
                max_retries=settings.DIAGNOSIS_MAX_RETRIES,
            )
        except Exception as exc:
            logger.error("Gemini call failed after retries: %s", exc)
            return _fallback(str(exc))

        try:
            clean = raw_text.strip().removeprefix("```json").removeprefix("```").removesuffix("```").strip()
            data = json.loads(clean)
            result = ResourceResult.model_validate(data)
            logger.info(
                "Recommendations complete: %d product(s) — %s",
                len(result.recommendations),
                result.priority_note[:80],
            )
            return result
        except Exception as exc:
            logger.error("Failed to parse Gemini response: %s | raw=%s", exc, raw_text[:200])
            return _fallback(f"Parse error: {exc}")


def _call_gemini(user_prompt: str) -> str:
    client = genai.Client(api_key=settings.GOOGLE_API_KEY)
    response = client.models.generate_content(
        model=settings.GEMINI_MODEL,
        contents=user_prompt,
        config=GenerateContentConfig(
            system_instruction=RESOURCE_PROMPT,
            temperature=0.3,
            response_mime_type="application/json",
        ),
    )
    return response.text.strip()
