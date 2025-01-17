export default function ServiceCardSkeleton() {
  return (
    <div className="border-2 border-[#C9A227] rounded-lg overflow-hidden shadow-lg bg-[#0F0F0F] animate-pulse">
      <div className="aspect-[3/2] w-full bg-[#1C1F33]" />
      <div className="p-6 space-y-4">
        <div className="h-4 bg-[#1C1F33] rounded w-1/3" />
        <div className="h-4 bg-[#1C1F33] rounded w-full" />
        <div className="space-y-2">
          <div className="h-3 bg-[#1C1F33] rounded w-5/6" />
          <div className="h-3 bg-[#1C1F33] rounded w-4/6" />
          <div className="h-3 bg-[#1C1F33] rounded w-3/6" />
        </div>
      </div>
    </div>
  )
} 