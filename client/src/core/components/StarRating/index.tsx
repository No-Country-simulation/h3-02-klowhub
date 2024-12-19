import { StarIcon } from '../Icon/StarRating';

interface StartRatingProps {
  rating?: number;
}

const calculateStars = (rating: number, maxStars: number = 5) => {
  const fullStars = Math.floor(rating);
  const hasPartialStar = rating % 1 !== 0;
  const partialStarPercentage = hasPartialStar ? (rating % 1) * 100 : 0;
  const emptyStars = maxStars - Math.ceil(rating);

  return { fullStars, hasPartialStar, partialStarPercentage, emptyStars };
};

export const StarRating = ({ rating = 0 }: StartRatingProps) => {
  const { fullStars, hasPartialStar, emptyStars, partialStarPercentage } = calculateStars(rating);
  const stars = [];

  for (let i = 0; i < fullStars; i++) {
    stars.push(<StarIcon key={`full-star_${i}`} filled={true} />);
  }

  // Add partial star if exists
  if (hasPartialStar) {
    stars.push(
      <div className="relative">
        <StarIcon key={`partial-star`} filled={false} />
        <div className="absolute inset-0 overflow-hidden">
          <StarIcon filled={true} half percentage={`${100 - partialStarPercentage}%`} />
        </div>
      </div>
    );
  }

  // Add empty stars
  for (let i = 0; i < emptyStars; i++) {
    stars.push(<StarIcon key={`empty-star_${i}`} filled={false} />);
  }

  return <div className="relative flex">{stars}</div>;
};
