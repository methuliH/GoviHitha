import { useEffect, useState } from "react";
import Link from "next/link";
import type { OrchestrationResult } from "@/lib/types";
import ActionPlanCard from "@/components/cards/ActionPlanCard";
import DiagnosisCard from "@/components/cards/DiagnosisCard";
import ResourceCard from "@/components/cards/ResourceCard";
import WeatherCard from "@/components/cards/WeatherCard";
import Button from "@/components/common/Button";

// Fallback shown only if sessionStorage has no result (e.g. direct URL visit)
const SAMPLE: OrchestrationResult = {
  situation_summary:
    "Your rice crop in Colombo has been diagnosed with Rice Leaf Blast. Waterlogging risk (high) in 2 days will worsen the situation. Immediate action required.",
  diagnosis: {
    disease_name: "Rice Leaf Blast",
    confidence: 0.92,
    description:
      "Fungal infection caused by Magnaporthe oryzae, common in humid Sri Lankan rice-growing regions.",
    treatment_steps: [
      "Apply Tricyclazole 75% WP fungicide at 0.6g per litre of water",
      "Improve field drainage to reduce standing water",
      "Remove and destroy infected plant material immediately",
    ],
    timeline: "7–10 days with consistent treatment",
    prevention: "Use blast-resistant varieties, avoid excess nitrogen fertiliser.",
    risk_level: "high",
  },
  weather: {
    current_weather: { temperature: 27.8, humidity: 82, rainfall_7d: 86.2 },
    alerts: [
      {
        risk_type: "WATERLOGGING",
        likelihood: "high",
        days_ahead: 2,
        context: "Heavy rain in 48h will accelerate fungal spread.",
        action: "Improve drainage immediately and apply fungicide today.",
      },
    ],
    forecast_summary: "High humidity and incoming rain create high-risk conditions.",
  },
  resources: {
    recommendations: [
      {
        type: "fungicide",
        product_name: "Tricyclazole 75% WP",
        why: "Directly targets Magnaporthe oryzae.",
        availability: "Available at agri-supply shops in Colombo, Kandy, Galle.",
        estimated_cost: "1,200–2,500 LKR per 100g packet",
        application_notes: "Mix 0.6g per litre. Apply every 7 days.",
        kapruka_search_link: "https://www.kapruka.com/search?q=Tricyclazole",
      },
    ],
    priority_note: "Buy Tricyclazole TODAY before the rain arrives.",
  },
  action_plan: [
    "Buy Tricyclazole 75% WP today (1,200–2,500 LKR)",
    "Apply fungicide at 0.6g per litre across all affected areas",
    "Improve field drainage before rain in 48h",
    "Recheck crop in 7–10 days to assess recovery",
  ],
  timeline: "7–10 days with treatment",
};

export default function Results() {
  const [result, setResult] = useState<OrchestrationResult | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem("govihitha_result");
    if (stored) {
      try {
        setResult(JSON.parse(stored));
      } catch {
        setResult(SAMPLE);
      }
    } else {
      setResult(SAMPLE);
    }
  }, []);

  const data = result ?? SAMPLE;
  const isDemo = !result;

  return (
    <div className="space-y-6 pb-8">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-green-900">Diagnosis Results</h1>
          <p className="text-sm text-gray-500 mt-0.5">
            {isDemo ? "Showing sample results — submit a diagnosis to see real data" : "Based on your crop photo and symptoms"}
          </p>
        </div>
        <Link href="/diagnose">
          <Button variant="secondary" size="sm">← New diagnosis</Button>
        </Link>
      </div>

      {isDemo && (
        <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <span className="text-lg shrink-0">💡</span>
          <p>These are <strong>sample results</strong>. Go to <Link href="/diagnose" className="underline font-medium">Diagnose</Link> to analyse your own crop.</p>
        </div>
      )}

      {/* Action plan — most urgent, shown first */}
      <ActionPlanCard
        steps={data.action_plan}
        situationSummary={data.situation_summary}
        timeline={data.timeline}
      />

      {/* Diagnosis + Weather side by side on large screens */}
      <div className="grid lg:grid-cols-2 gap-6">
        <DiagnosisCard diagnosis={data.diagnosis} />
        <WeatherCard weather={data.weather} />
      </div>

      {/* Resources — full width */}
      <ResourceCard resources={data.resources} />
    </div>
  );
}
