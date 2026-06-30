import type { ResourceResult } from "@/lib/types";
import Badge from "@/components/common/Badge";
import Button from "@/components/common/Button";

interface ResourceCardProps {
  resources: ResourceResult;
}

export default function ResourceCard({ resources }: ResourceCardProps) {
  const { recommendations, priority_note } = resources;

  return (
    <div className="bg-white rounded-2xl border border-green-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-emerald-600 px-6 py-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-emerald-200 text-xs font-medium uppercase tracking-wide mb-1">
            Products
          </p>
          <h2 className="text-white text-xl font-bold leading-tight">
            {recommendations.length} Recommendation{recommendations.length !== 1 ? "s" : ""}
          </h2>
        </div>
        <span className="text-3xl mt-0.5">🛒</span>
      </div>

      <div className="p-6 space-y-5">
        {/* Priority note */}
        {priority_note && (
          <div className="flex gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4">
            <span className="text-amber-500 text-lg shrink-0">⚡</span>
            <p className="text-sm text-amber-800 font-medium leading-relaxed">{priority_note}</p>
          </div>
        )}

        {/* Product list */}
        {recommendations.length > 0 ? (
          <div className="space-y-4">
            {recommendations.map((product, i) => (
              <div
                key={i}
                className="border border-gray-100 rounded-xl p-4 space-y-3 hover:border-green-200 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <Badge label={product.type} variant="type" value={product.type} />
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm leading-snug">
                      {product.product_name}
                    </h3>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-gray-500">Estimated cost</p>
                    <p className="font-semibold text-green-700 text-sm">{product.estimated_cost}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 leading-relaxed">{product.why}</p>

                {product.application_notes && (
                  <div className="bg-gray-50 rounded-lg px-3 py-2">
                    <p className="text-xs text-gray-500 font-medium mb-0.5">How to use</p>
                    <p className="text-xs text-gray-600">{product.application_notes}</p>
                  </div>
                )}

                <div className="flex items-center justify-between gap-3 pt-1">
                  <p className="text-xs text-gray-400 truncate">{product.availability}</p>
                  <a
                    href={product.kapruka_search_link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="secondary" size="sm">
                      Buy on Kapruka →
                    </Button>
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center py-4">
            No product recommendations available.
          </p>
        )}
      </div>
    </div>
  );
}
