export function CarCardSkeleton() {
  return (
    <article className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
      {/* Image Section Skeleton */}
      <div className="relative h-48 w-full overflow-hidden bg-slate-100">
        <div className="absolute inset-0 animate-pulse bg-slate-200" />
        {/* Availability Badge Skeleton */}
        <div className="absolute top-3 left-3">
          <div className="h-6 w-20 animate-pulse rounded-full bg-slate-300" />
        </div>
        {/* Rating Badge Skeleton */}
        <div className="absolute top-3 right-3">
          <div className="h-6 w-12 animate-pulse rounded-full bg-slate-300" />
        </div>
      </div>

      {/* Content Section Skeleton */}
      <div className="p-5">
        {/* Header Skeleton */}
        <div className="mb-3">
          <div className="mb-2 h-5 w-3/4 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-1/2 animate-pulse rounded bg-slate-200" />
        </div>

        {/* Price Skeleton */}
        <div className="mb-4">
          <div className="h-7 w-24 animate-pulse rounded bg-slate-200" />
        </div>

        {/* Features Skeleton */}
        <div className="mb-4 grid grid-cols-2 gap-2">
          <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
        </div>

        {/* Trust Indicators Skeleton */}
        <div className="mb-4 flex items-center gap-2">
          <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
          <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
        </div>

        {/* Action Buttons Skeleton */}
        <div className="grid gap-2 sm:grid-cols-2">
          <div className="h-10 w-full animate-pulse rounded-lg bg-slate-200" />
          <div className="h-10 w-full animate-pulse rounded-lg bg-slate-200" />
        </div>
      </div>
    </article>
  );
}

export function AgencyCardSkeleton() {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <div className="h-5 w-32 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
          </div>
          <div className="mb-1 h-4 w-24 animate-pulse rounded bg-slate-200" />
        </div>
        <div className="h-6 w-12 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="mt-3 space-y-2">
        <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-4/5 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-3/5 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <div className="h-4 w-20 animate-pulse rounded bg-slate-200" />
        <div className="h-4 w-24 animate-pulse rounded bg-slate-200" />
      </div>

      <div className="mt-4 flex items-center justify-between">
        <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />
        <div className="h-6 w-16 animate-pulse rounded bg-slate-200" />
      </div>
    </div>
  );
}