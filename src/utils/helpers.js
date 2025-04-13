export const timeLeftUntil = (date) => {
  const targetDate = new Date(date);
  const now = new Date();

  if (targetDate <= now) return null; // Date has passed

  const diffMs = targetDate - now;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''}`;
  if (diffWeeks > 0) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''}`;
  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''}`;
  if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''}`;

  return 'Less than an hour';
};

export const timeSince = (date) => {
  const targetDate = new Date(date);
  const now = new Date();

  if (targetDate > now) return null; // Date is in the future

  const diffMs = now - targetDate;
  const diffSeconds = Math.floor(diffMs / 1000);
  const diffMinutes = Math.floor(diffSeconds / 60);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);
  const diffWeeks = Math.floor(diffDays / 7);
  const diffMonths = Math.floor(diffDays / 30);

  if (diffMonths > 0)
    return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
  if (diffWeeks > 0) return `${diffWeeks} week${diffWeeks > 1 ? 's' : ''} ago`;
  if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
  if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;

  return 'Less than an hour ago';
};

export const ratingHelper = (ratings) => {
  const ratingCount =
    ratings['1_stars'] +
    ratings['2_stars'] +
    ratings['3_stars'] +
    ratings['4_stars'] +
    ratings['5_stars'];

  const totalRating =
    ratings['1_stars'] * 1 +
    ratings['2_stars'] * 2 +
    ratings['3_stars'] * 3 +
    ratings['4_stars'] * 4 +
    ratings['5_stars'] * 5;

  const rating = (totalRating / ratingCount).toFixed(1);

  return { ratingCount, rating };
};
