"""OpenMeteo API wrapper — free, no auth required."""
from __future__ import annotations

import requests

from agents.utils.logger import get_logger

logger = get_logger(__name__)

_BASE_URL = "https://api.open-meteo.com/v1/forecast"
_TIMEOUT_SECONDS = 10


def fetch_weather(latitude: float, longitude: float) -> dict:
    """Fetch current conditions and 7-day forecast from OpenMeteo.

    Returns a dict with keys:
        current_temperature  (°C)
        current_humidity     (%)
        rainfall_7d          (mm total over 7 days)
        daily_precipitation  (list of 7 daily mm values)
        daily_temp_max       (list of 7 daily max °C)
        daily_temp_min       (list of 7 daily min °C)

    Raises:
        requests.RequestException: on network failures.
        ValueError: if the API returns an unexpected structure.
    """
    params = {
        "latitude": latitude,
        "longitude": longitude,
        "current": "temperature_2m,relative_humidity_2m,precipitation",
        "daily": "precipitation_sum,temperature_2m_max,temperature_2m_min",
        "forecast_days": 7,
        "timezone": "Asia/Colombo",
    }

    logger.info("Fetching OpenMeteo weather for (%.4f, %.4f)", latitude, longitude)
    response = requests.get(_BASE_URL, params=params, timeout=_TIMEOUT_SECONDS)
    response.raise_for_status()
    data = response.json()

    current = data.get("current", {})
    daily = data.get("daily", {})

    daily_precip: list[float] = daily.get("precipitation_sum", [])
    rainfall_7d = sum(v for v in daily_precip if v is not None)

    result = {
        "current_temperature": current.get("temperature_2m", 0.0),
        "current_humidity": current.get("relative_humidity_2m", 0.0),
        "rainfall_7d": round(rainfall_7d, 1),
        "daily_precipitation": daily_precip,
        "daily_temp_max": daily.get("temperature_2m_max", []),
        "daily_temp_min": daily.get("temperature_2m_min", []),
    }

    logger.info(
        "Weather fetched: temp=%.1f°C humidity=%.0f%% rainfall_7d=%.1fmm",
        result["current_temperature"],
        result["current_humidity"],
        result["rainfall_7d"],
    )
    return result
