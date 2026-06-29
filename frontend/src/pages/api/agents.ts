import type { NextApiRequest, NextApiResponse } from "next";
import type { AgentQuery, OrchestrationResult } from "@/lib/types";

// ---------------------------------------------------------------------------
// Mock result — returned when AGENT_URL is not configured.
// Simulates a realistic diagnosis so the full UI flow can be tested locally
// without a running Python backend.
// ---------------------------------------------------------------------------
function buildMockResult(query: AgentQuery): OrchestrationResult {
  return {
    situation_summary: `Your ${query.crop_type} crop in ${query.region} has been diagnosed with Rice Leaf Blast. Waterlogging risk (high) in 2 days will worsen the situation. Immediate action required.`,
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
      risk_level: "high",
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
      ],
      forecast_summary:
        "High humidity and incoming heavy rain create high-risk conditions. Act today.",
    },
    resources: {
      recommendations: [
        {
          type: "fungicide",
          product_name: "Tricyclazole 75% WP",
          why: "Directly targets Magnaporthe oryzae, the cause of Rice Leaf Blast.",
          availability: "Available at agri-supply shops in Colombo, Kandy, Galle.",
          estimated_cost: "1,200–2,500 LKR per 100g packet",
          application_notes: "Mix 0.6g per litre. Apply every 7 days for 3 weeks.",
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
      `Buy Tricyclazole 75% WP today (1,200–2,500 LKR) — directly targets the diagnosed fungal infection`,
      "Apply Tricyclazole at 0.6g per litre of water across all affected areas",
      "Improve field drainage immediately before heavy rain arrives in 48h",
      "Remove and destroy all visibly infected plant material",
      "Recheck your crop in 7–10 days to assess recovery",
    ],
    timeline: "7–10 days with treatment",
  };
}

// ---------------------------------------------------------------------------
// Route handler
// ---------------------------------------------------------------------------
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<OrchestrationResult | { error: string }>
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const query = req.body as AgentQuery;
  const { crop_type, symptoms, image_base64, region } = query;

  if (!crop_type || !symptoms || !image_base64 || !region) {
    return res.status(400).json({ error: "Missing required fields: crop_type, symptoms, image_base64, region" });
  }

  // If AGENT_URL is configured, proxy to the live Python backend
  const agentUrl = process.env.AGENT_URL;
  if (agentUrl) {
    try {
      const upstream = await fetch(`${agentUrl}/run`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(query),
        signal: AbortSignal.timeout(60_000), // 60s max
      });

      if (!upstream.ok) {
        const text = await upstream.text().catch(() => "");
        return res.status(502).json({ error: `Backend error ${upstream.status}: ${text}` });
      }

      const result = await upstream.json();
      return res.status(200).json(result);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      return res.status(502).json({ error: `Failed to reach agent backend: ${message}` });
    }
  }

  // No backend configured — return mock data with a simulated delay
  await new Promise((r) => setTimeout(r, 1800));
  return res.status(200).json(buildMockResult(query));
}
