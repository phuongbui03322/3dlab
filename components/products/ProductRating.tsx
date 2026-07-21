interface ProductRatingProps {
  rating?: number;
}

export default function ProductRating({
  rating = 5,
}: ProductRatingProps) {
  return (
    <div className="flex items-center gap-1 text-sm">
      <span className="text-yellow-500">★★★★★</span>

      <span className="font-medium text-gray-700">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}