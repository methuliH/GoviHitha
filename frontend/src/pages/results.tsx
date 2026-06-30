import Link from "next/link";
import type { OrchestrationResult } from "@/lib/types";
import ActionPlanCard from "@/components/cards/ActionPlanCard";
import DiagnosisCard from "@/components/cards/DiagnosisCard";
import ResourceCard from "@/components/cards/ResourceCard";
import WeatherCard from "@/components/cards/WeatherCard";
import Button from "@/components/common/Button";

// Sample data used until Chunk 9 wires up the real API call
const SAMPLE: OrchestrationResult = {
  situation_summary:
    "Your rice crop in Colombo has been diagnosed with Rice Leaf Blast. Waterlogging risk (high) in 2 days will worsen the situation. Immediate action required.",
  diagnosis: {
    disease_name: "Rice Leaf Blast",
    confidence: 0.92,
    description:
      "Fungal infection caused by Magnaporthe oryzae, common in humid Sri Lankan rice-growing regions. Spreads rapidly in warm, humid conditions.",
    treatment_steps: [
      "Apply Tricyclazole 75% WP fungicide at 0.6g per litre of water",
      "Improve field drainage to reduce standing water",
      "Remove and destroy infected plant material immediately",
    ],
    timeline: "7–10 days with consistent treatment",
    prevention:
      "Use blast-resistant varieties, avoid excess nitrogen fertiliser, rotate crops each season.",
  },
  weather: {
    current_weather: { temperature: 27.8, humidity: 82, rainfall_7d: 86.2 },
    alerts: [
      {
        risk_type: "WATERLOGGING",
        likelihood: "high",
        days_ahead: 2,
        context:
          "Heavy rain forecast in 48h will accelerate fungal spread in waterlogged paddy fields.",
        action:
          "Improve field drainage immediately and apply fungicide before rain arrives.",
      },
      {
        risk_type: "HIGH_HUMIDITY",
        likelihood: "medium",
        days_ahead: 0,
        context:
          "Current humidity of 82% exceeds the 80% threshold for rapid Magnaporthe oryzae spore germination.",
        action: "Monitor closely and consider a preventive second application.",
      },
    ],
    forecast_summary:
      "High humidity and heavy rain in 48h create high-risk conditions. Urgent drainage and fungicide action needed today.",
  },
  resources: {
    recommendations: [
      {
        type: "fungicide",
        product_name: "Tricyclazole 75% WP",
        why: "Directly targets Magnaporthe oryzae, the cause of Rice Leaf Blast.",
        availability: "Available at agri-supply shops in Colombo, Kandy, Galle.",
        estimated_cost: "1,200–2,500 LKR per 100g packet",
        application_notes: "Mix 0.6g per litre of water. Apply every 7 days for 3 weeks.",
        kapruka_search_link: "https://www.kapruka.com/search?q=Tricyclazole",
      },
      {
        type: "tool",
        product_name: "Field drainage shovel",
        why: "Address waterlogging risk before heavy rain arrives in 48h.",
        availability: "Hardware shops islandwide.",
        estimated_cost: "800–1,500 LKR",
        application_notes: "Dig drainage channels along field borders before next rainfall.",
        kapruka_search_link: "https://www.kapruka.com/search?q=drainage+shovel",
      },
    ],
    priority_note:
      "Buy Tricyclazole TODAY and apply before rain. Start drainage work immediately.",
  },
  action_plan: [
    "Buy Tricyclazole 75% WP today (1,200–2,500 LKR) — directly targets the diagnosed fungal infection",
    "Apply Tricyclazole at 0.6g per litre of water across all affected areas",
    "Improve field drainage immediately before heavy rain arrives in 48h",
    "Remove and destroy all visibly infected plant material",
    "Recheck your crop in 7–10 days to assess recovery",
  ],
  timeline: "7–10 days with treatment",
};

export default function Results() {
  return (
    <div className="space-y-6 pb-8">
      {/* Back + header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-green-900">Diagnosis Results</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Based on your crop photo and symptoms
          </p>
        </div>
        <Link href="/diagnose">
          <Button variant="secondary" size="sm">
            ← New diagnosis
          </Button>
        </Link>
      </div>

      {/* Action plan — top, most important */}
      <ActionPlanCard
        steps={SAMPLE.action_plan}
        situationSummary={SAMPLE.situation_summary}
        timeline={SAMPLE.timeline}
      />

      {/* Diagnosis + Weather side by side on larger screens */}
      <div className="grid lg:grid-cols-2 gap-6">
        <DiagnosisCard diagnosis={SAMPLE.diagnosis} />
        <WeatherCard weather={SAMPLE.weather} />
      </div>

      {/* Resources — full width */}
      <ResourceCard resources={SAMPLE.resources} />
    </div>
  );
}
