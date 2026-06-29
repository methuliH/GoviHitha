import Link from "next/link";
import Button from "@/components/common/Button";

const steps = [
  {
    number: "01",
    title: "Upload a photo",
    description:
      "Take a photo of the affected crop leaves or fruits. Upload it along with a short description of what you see.",
  },
  {
    number: "02",
    title: "AI analyses the image",
    description:
      "Google Gemini Vision examines the image and cross-references the symptoms with known Sri Lankan crop diseases.",
  },
  {
    number: "03",
    title: "Weather risks are checked",
    description:
      "Real-time weather data from OpenMeteo is fetched for your district and evaluated against the diagnosed disease.",
  },
  {
    number: "04",
    title: "You get an action plan",
    description:
      "A prioritised plan is generated: what to buy, where to buy it (Kapruka links), and what to do before the next rainfall.",
  },
];

const faqs = [
  {
    q: "Is GoviHitha free to use?",
    a: "Yes. GoviHitha is free for Sri Lankan farmers. It uses the Gemini API and OpenMeteo, both of which have generous free tiers.",
  },
  {
    q: "Which crops are supported?",
    a: "Rice, Tea, Coconut, Banana, Corn, Cassava, Pepper, Chilli, Tomato, and Potato. More crops will be added.",
  },
  {
    q: "How accurate is the diagnosis?",
    a: "Accuracy depends on image quality and lighting. Clear, close-up photos of affected leaves give the best results. Always consult a local agricultural officer for critical decisions.",
  },
  {
    q: "Do I need internet access?",
    a: "Yes. GoviHitha calls the Gemini Vision API and OpenMeteo weather service, both of which require internet access.",
  },
  {
    q: "Are Kapruka links guaranteed to have stock?",
    a: "No. Kapruka links are generated as search queries. Stock availability depends on Kapruka's sellers at the time of purchase.",
  },
];

export default function About() {
  return (
    <div className="flex flex-col gap-12 max-w-3xl mx-auto">
      {/* Intro */}
      <section>
        <h1 className="text-3xl font-bold text-green-900 mb-3">About GoviHitha</h1>
        <p className="text-gray-600 leading-relaxed">
          <strong className="text-green-800">GoviHitha</strong> (&ldquo;Farmer&apos;s Friend&rdquo; in Sinhala) is an AI-powered crop advisory
          system built for Sri Lankan farmers. It combines Google Gemini Vision, real-time weather data,
          and local product knowledge to help farmers act fast when their crops are at risk.
        </p>
      </section>

      {/* How it works */}
      <section>
        <h2 className="text-xl font-bold text-green-800 mb-6">How it works</h2>
        <div className="flex flex-col gap-4">
          {steps.map(({ number, title, description }) => (
            <div key={number} className="flex gap-5 bg-white border border-green-100 rounded-xl p-5 shadow-sm">
              <div className="text-2xl font-bold text-green-200 select-none w-10 shrink-0 pt-0.5">
                {number}
              </div>
              <div>
                <h3 className="font-semibold text-green-800 mb-1">{title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section>
        <h2 className="text-xl font-bold text-green-800 mb-6">Frequently asked questions</h2>
        <div className="flex flex-col gap-4">
          {faqs.map(({ q, a }) => (
            <div key={q} className="bg-white border border-green-100 rounded-xl p-5 shadow-sm">
              <p className="font-semibold text-green-800 mb-1">{q}</p>
              <p className="text-sm text-gray-600 leading-relaxed">{a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="text-center pb-4">
        <p className="text-gray-600 mb-4">Ready to diagnose your crop?</p>
        <Link href="/">
          <Button size="lg">Start Diagnosis</Button>
        </Link>
      </section>
    </div>
  );
}
