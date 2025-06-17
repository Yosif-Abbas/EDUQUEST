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

  let rating = (totalRating / ratingCount).toFixed(1);
  rating = isNaN(rating) ? 0 : parseFloat(rating);

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

export const getFormattedTotalDuration = (sections, isByMinutes = false) => {
  let totalSeconds = 0;

  sections.forEach((section) => {
    section.lectures?.forEach((lecture) => {
      const info = lecture.content_info;
      if (!info) return;

      const lowerInfo = info.toLowerCase();

      if (lecture.type === 'file') {
        // Treat MB as minutes (4 minutes per MB)
        const matchMB = lowerInfo.match(/([\d.]+)\s*mb/);
        if (matchMB) {
          totalSeconds += parseFloat(matchMB[1]) * 4 * 60;
        }
      } else if (lecture.type === 'video') {
        // Match hours, minutes, and seconds in the string
        const matchHours = lowerInfo.match(/([\d.]+)\s*hour/);
        const matchMinutes = lowerInfo.match(/([\d.]+)\s*minute/);
        const matchSeconds = lowerInfo.match(/([\d.]+)\s*sec/);

        let seconds = 0;
        if (matchHours) {
          seconds += parseFloat(matchHours[1]) * 3600;
        }
        if (matchMinutes) {
          seconds += parseFloat(matchMinutes[1]) * 60;
        }
        if (matchSeconds) {
          seconds += parseFloat(matchSeconds[1]);
        }

        totalSeconds += seconds;
      } else if (lecture.type === 'quiz') {
        // Each question takes about 2 minutes
        const matchQuestions = lowerInfo.match(/(\d+)\s*questions/);
        if (matchQuestions) {
          totalSeconds += parseInt(matchQuestions[1]) * 2 * 60;
        }
      }
    });
  });

  if (isByMinutes) return Math.round(totalSeconds / 60);

  // Format the duration
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (hours > 0) {
    return `${hours}h ${minutes > 0 ? minutes + 'm' : ''}`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds > 0 ? seconds + 's' : ''}`;
  } else {
    return `${seconds}s`;
  }
};

// Calculate total duration of a section with formatted output
export const calculateSectionDuration = (section) => {
  let totalSeconds = 0;

  section.lectures?.forEach((lecture) => {
    const info = lecture.content_info;
    if (!info) return;

    const lowerInfo = info.toLowerCase();

    if (lecture.type === 'file') {
      // Treat MB as minutes (4 minutes per MB)
      const matchMB = lowerInfo.match(/([\d.]+)\s*mb/);
      if (matchMB) {
        totalSeconds += parseFloat(matchMB[1]) * 4 * 60;
      }
    } else if (lecture.type === 'video') {
      // Match hours, minutes, and seconds in the string
      const matchHours = lowerInfo.match(/([\d.]+)\s*hour/);
      const matchMinutes = lowerInfo.match(/([\d.]+)\s*minute/);
      const matchSeconds = lowerInfo.match(/([\d.]+)\s*sec/);

      let seconds = 0;
      if (matchHours) {
        seconds += parseFloat(matchHours[1]) * 3600;
      }
      if (matchMinutes) {
        seconds += parseFloat(matchMinutes[1]) * 60;
      }
      if (matchSeconds) {
        seconds += parseFloat(matchSeconds[1]);
      }

      totalSeconds += seconds;
    } else if (lecture.type === 'quiz') {
      // Each question takes about 2 minutes
      const matchQuestions = lowerInfo.match(/(\d+)\s*questions/);
      if (matchQuestions) {
        totalSeconds += parseInt(matchQuestions[1]) * 2 * 60;
      }
    }
  });

  // Format the duration
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (hours > 0) {
    return `${hours}h ${minutes > 0 ? minutes + 'm' : ''}`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds > 0 ? seconds + 's' : ''}`;
  } else {
    return `${seconds}s`;
  }
};

export const formatDate = (timestamp) => {
  const date = new Date(timestamp);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};
