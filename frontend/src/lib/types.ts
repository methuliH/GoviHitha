// TypeScript interfaces matching ADK agent output schemas

export interface DiagnosisResult {
  disease_name: string;
  confidence: number;
  description: string;
  treatment_steps: string[];
  timeline: string;
  prevention: string;
}

export interface WeatherAlert {
  risk_type: "WATERLOGGING" | "FROST" | "DROUGHT" | string;
  likelihood: "high" | "medium" | "low";
  days_ahead: number;
  context: string;
  action: string;
}

export interface WeatherResult {
  current_weather: {
    temperature: number;
    humidity: number;
    rainfall_7d: number;
  };
  alerts: WeatherAlert[];
  forecast_summary: string;
}

export interface ProductRecommendation {
  type: "fungicide" | "fertilizer" | "tool" | "seed" | string;
  product_name: string;
  why: string;
  availability: string;
  estimated_cost: string;
  application_notes?: string;
  kapruka_search_link: string;
}

export interface ResourceResult {
  recommendations: ProductRecommendation[];
  priority_note: string;
}

export interface OrchestrationResult {
  situation_summary: string;
  diagnosis: DiagnosisResult;
  weather: WeatherResult;
  resources: ResourceResult;
  action_plan: string[];
  timeline: string;
}

export interface AgentQuery {
  crop_type: string;
  symptoms: string;
  image_base64: string;
  region: string;
}
