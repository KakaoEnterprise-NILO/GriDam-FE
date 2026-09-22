import { Skeleton } from "@/components/ui/skeleton";
export default function StatisticsLoading() {
  return (
    <div className="ml-2 w-full bg-white rounded-3xl shadow-lg max-w-4xl mx-auto px-6 md:px-10 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <Skeleton className="h-10 w-32" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-gray-50 rounded-2xl p-6">
            <Skeleton className="h-6 w-20 mb-4" />
            <Skeleton className="h-64 w-full rounded-xl" />
          </div>
        ))}
      </div>
    </div>
  );
}
