// Transparent Weighted Smart Matching Engine for FindIt - Woxsen University
// Weighted criteria:
// 1. Category = 25%
// 2. Location = 25%
// 3. Description similarity = 20%
// 4. Color = 10%
// 5. Brand = 10%
// 6. Date proximity = 10%

function calculateWordOverlap(str1 = '', str2 = '') {
  if (!str1 || !str2) return 0;
  const words1 = new Set(str1.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 2));
  const words2 = new Set(str2.toLowerCase().replace(/[^\w\s]/g, '').split(/\s+/).filter(w => w.length > 2));
  if (words1.size === 0 || words2.size === 0) return 0;
  
  let matches = 0;
  for (const word of words1) {
    if (words2.has(word)) matches++;
  }
  
  const union = new Set([...words1, ...words2]).size;
  return matches / union;
}

export function calculateMatchScore(itemA, itemB) {
  let score = 0;
  const reasons = [];

  // 1. Category (25%)
  if (itemA.category && itemB.category && itemA.category.toLowerCase() === itemB.category.toLowerCase()) {
    score += 25;
    reasons.push("Same item category");
  }

  // 2. Location (25%)
  const locA = itemA.location?.building || itemA.location || '';
  const locB = itemB.location?.building || itemB.location || '';
  if (locA && locB && locA.toLowerCase() === locB.toLowerCase()) {
    score += 25;
    reasons.push("Same campus location");
  } else if (locA && locB && (locA.toLowerCase().includes(locB.toLowerCase()) || locB.toLowerCase().includes(locA.toLowerCase()))) {
    score += 15;
    reasons.push("Nearby campus location");
  }

  // 3. Description & Name Similarity (20%)
  const descOverlap = calculateWordOverlap(itemA.description || itemA.name, itemB.description || itemB.name);
  const nameOverlap = calculateWordOverlap(itemA.name, itemB.name);
  const combinedSimilarity = Math.max(descOverlap, nameOverlap);
  if (combinedSimilarity > 0) {
    const descScore = Math.round(combinedSimilarity * 20);
    score += descScore;
    reasons.push(`Similar description (${Math.round(combinedSimilarity * 100)}% match)`);
  }

  // 4. Color Match (10%)
  if (itemA.color && itemB.color && itemA.color.toLowerCase() === itemB.color.toLowerCase()) {
    score += 10;
    reasons.push("Matching color");
  }

  // 5. Brand Match (10%)
  if (itemA.brand && itemB.brand && itemA.brand.toLowerCase() === itemB.brand.toLowerCase()) {
    score += 10;
    reasons.push("Matching brand");
  }

  // 6. Date Proximity (10%)
  if (itemA.date && itemB.date) {
    const dateA = new Date(itemA.date);
    const dateB = new Date(itemB.date);
    const diffDays = Math.abs((dateA - dateB) / (1000 * 60 * 60 * 24));
    
    if (diffDays <= 1) {
      score += 10;
      reasons.push("Reported on same day");
    } else if (diffDays <= 3) {
      score += 7;
      reasons.push("Reported within 3 days");
    } else if (diffDays <= 7) {
      score += 4;
      reasons.push("Reported within 1 week");
    }
  }

  const finalScore = Math.min(Math.round(score), 100);
  return {
    score: finalScore,
    reasons
  };
}
