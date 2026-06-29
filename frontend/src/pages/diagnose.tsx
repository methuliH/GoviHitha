import { useRouter } from "next/router";
import type { AgentQuery } from "@/lib/types";
import { useAgent } from "@/hooks/useAgent";
import AgentProgress from "@/components/loading/AgentProgress";
import QueryForm from "@/components/forms/QueryForm";

export default function DiagnosePage() {
  const router = useRouter();
  const { status, error, submit } = useAgent();
  const isLoading = status === "loading";

  const handleSubmit = async (query: AgentQuery) => {
    const result = await submit(query);
    if (result) {
      sessionStorage.setItem("govihitha_result", JSON.stringify(result));
      await router.push("/results");
    }
  };

  if (isLoading) {
    return <AgentProgress />;
  }

  const hasError = status === "error";

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-green-900">Diagnose your crop</h1>
        <p className="mt-2 text-gray-600">
          Upload a clear photo of the affected plant and describe what you see.
          Our AI will identify the disease and recommend action.
        </p>
      </div>

      {hasError && error && (
        <div className="mb-6 flex gap-3 bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
          <span className="text-lg shrink-0">⚠️</span>
          <div>
            <p className="font-semibold mb-0.5">Diagnosis failed</p>
            <p>{error}</p>
            <p className="mt-1 text-red-500">Please try again or check your connection.</p>
          </div>
        </div>
      )}

      <QueryForm onSubmit={handleSubmit} loading={false} />
    </div>
  );
}
