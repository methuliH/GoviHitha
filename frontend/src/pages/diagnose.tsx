import { useState } from "react";
import { useRouter } from "next/router";
import type { AgentQuery } from "@/lib/types";
import QueryForm from "@/components/forms/QueryForm";

export default function DiagnosePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (query: AgentQuery) => {
    setLoading(true);
    // Store query in sessionStorage so results.tsx can read it
    sessionStorage.setItem("govihitha_query", JSON.stringify(query));
    // Chunk 9 will wire up the real API call here; for now navigate to results
    await router.push("/results");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-900">Diagnose your crop</h1>
        <p className="mt-2 text-gray-600">
          Upload a clear photo of the affected plant and describe what you see.
          Our AI will identify the disease and recommend action.
        </p>
      </div>
      <QueryForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
