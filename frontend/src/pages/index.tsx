import Link from "next/link";
import Button from "@/components/common/Button";

const features = [
  {
    icon: "🔬",
    title: "Instant Disease Diagnosis",
    description:
      "Upload a photo of your crop. Gemini Vision identifies the disease, confidence level, and treatment steps.",
  },
  {
    icon: "🌦️",
    title: "Weather Risk Alerts",
    description:
      "Real-time forecasts from OpenMeteo, contextualised to your diagnosed disease and Sri Lankan district.",
  },
  {
    icon: "🛒",
    title: "Local Product Links",
    description:
      "Recommended fungicides, tools, and seeds with estimated LKR costs and direct Kapruka shopping links.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-col items-center gap-12">
      {/* Hero */}
      <section className="text-center pt-8 pb-4">
        <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
          <span>🌿</span> AI-powered · Free for Sri Lankan farmers
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold text-green-900 tracking-tight leading-tight">
          Diagnose your crop.<br />
          <span className="text-green-600">Act before it&apos;s too late.</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600 max-w-xl mx-auto">
          GoviHitha uses AI to identify crop diseases from a photo, warn you about
          incoming weather risks, and recommend products available in your district.
        </p>
        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/diagnose">
            <Button size="lg">Start Diagnosis</Button>
          </Link>
          <Link href="/about">
            <Button size="lg" variant="secondary">How it works</Button>
          </Link>
        </div>
      </section>

      {/* Feature cards */}
      <section className="w-full grid sm:grid-cols-3 gap-5">
        {features.map(({ icon, title, description }) => (
          <div
            key={title}
            className="bg-white rounded-2xl border border-green-100 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-3xl mb-3">{icon}</div>
            <h3 className="font-semibold text-green-800 mb-2">{title}</h3>
            <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
          </div>
        ))}
      </section>

      {/* Supported crops strip */}
      <section className="w-full text-center">
        <p className="text-sm text-gray-500 mb-3 font-medium uppercase tracking-wide">
          Supported crops
        </p>
        <div className="flex flex-wrap justify-center gap-2">
          {["Rice", "Tea", "Coconut", "Banana", "Tomato", "Chilli", "Corn", "Cassava", "Pepper", "Potato"].map(
            (crop) => (
              <span
                key={crop}
                className="px-3 py-1 bg-white border border-green-100 rounded-full text-sm text-green-700 font-medium shadow-sm"
              >
                {crop}
              </span>
            )
          )}
        </div>
      </section>
    </div>
  );
}
