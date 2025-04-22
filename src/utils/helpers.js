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

export const ratingPercentageHelper = (ratings, ratingCount) => {
  if (ratingCount === 0) {
    return {
      '1_stars': 0,
      '2_stars': 0,
      '3_stars': 0,
      '4_stars': 0,
      '5_stars': 0,
    };
  }

  // Calculate raw percentages
  const rawPercentages = [1, 2, 3, 4, 5].map((star) => ({
    key: `${star}_stars`,
    value: (ratings[`${star}_stars`] / ratingCount) * 100,
  }));

  // Round percentages and track total
  const rounded = rawPercentages.map((item) => ({
    key: item.key,
    value: Math.round(item.value),
  }));

  let totalRounded = rounded.reduce((sum, item) => sum + item.value, 0);

  // If rounding caused the sum to be off, adjust it
  while (totalRounded !== 100) {
    const diff = 100 - totalRounded;
    const adjustment = diff > 0 ? 1 : -1;

    // Find the item with the largest discrepancy from its raw value
    let targetIndex = -1;
    let maxDiscrepancy = -1;

    rounded.forEach((item, index) => {
      const raw = rawPercentages.find((r) => r.key === item.key).value;
      const discrepancy = Math.abs(raw - (item.value + adjustment));
      if (
        (diff > 0 && item.value + adjustment <= 100) ||
        (diff < 0 && item.value + adjustment >= 0)
      ) {
        if (discrepancy > maxDiscrepancy) {
          maxDiscrepancy = discrepancy;
          targetIndex = index;
        }
      }
    });

    if (targetIndex === -1) break;

    rounded[targetIndex].value += adjustment;
    totalRounded += adjustment;
  }

  // Convert to final object
  return Object.fromEntries(rounded.map((item) => [item.key, item.value]));
};

export const getFormattedTotalDuration = (sections) => {
  let totalMinutes = 0;

  sections.forEach((section) => {
    section.Lectures?.forEach((lecture) => {
      const info = lecture.content_info;
      if (!info) return;

      const lowerInfo = info.toLowerCase();

      if (lecture.type === 'file') {
        // Treat MB as minutes
        const matchMB = lowerInfo.match(/([\d.]+)\s*mb/);
        if (matchMB) {
          totalMinutes += parseFloat(matchMB[1]);
        }
      } else if (lecture.type === 'video') {
        // Match hours and minutes in the string
        const matchHours = lowerInfo.match(/([\d.]+)\s*hour/);
        const matchMinutes = lowerInfo.match(/([\d.]+)\s*minute/);

        let minutes = 0;
        if (matchHours) {
          minutes += parseFloat(matchHours[1]) * 60;
        }
        if (matchMinutes) {
          minutes += parseFloat(matchMinutes[1]);
        }

        totalMinutes += minutes;
      }
    });
  });

  return totalMinutes < 60
    ? `${Math.round(totalMinutes)} minutes`
    : `${Math.floor(totalMinutes / 60) > 0 ? Math.floor(totalMinutes / 60) + 'h' : ''} ${totalMinutes % 60 ? (totalMinutes % 60) + 'm' : ''}`;
};

// Calculate total duration of a section with formatted output
export const calculateSectionDuration = (section) => {
  let totalMinutes = 0;

  section.Lectures?.forEach((lecture) => {
    const info = lecture.content_info;
    if (!info) return;

    const lowerInfo = info.toLowerCase();

    if (lecture.type === 'file') {
      // Treat MB as minutes
      const matchMB = lowerInfo.match(/([\d.]+)\s*mb/);
      if (matchMB) {
        totalMinutes += parseFloat(matchMB[1]);
      }
    } else if (lecture.type === 'video') {
      // Match hours and minutes in the string
      const matchHours = lowerInfo.match(/([\d.]+)\s*hour/);
      const matchMinutes = lowerInfo.match(/([\d.]+)\s*minute/);

      let minutes = 0;
      if (matchHours) {
        minutes += parseFloat(matchHours[1]) * 60;
      }
      if (matchMinutes) {
        minutes += parseFloat(matchMinutes[1]);
      }

      totalMinutes += minutes;
    }
  });

  if (totalMinutes < 60) {
    return `${Math.round(totalMinutes)} minutes`;
  } else {
    const hours = totalMinutes / 60;
    return `${Math.floor(hours) ? Math.floor(hours) + 'h' : ''} ${totalMinutes % 60 ? (totalMinutes % 60) + 'm' : ''}`;
  }
};
