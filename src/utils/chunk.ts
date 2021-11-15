export const chunk = <T>(array: T[], chunkNumArg = 1): T[][] => {
  const chunkNum = Math.max(chunkNumArg, 0);

  if (!array.length || chunkNum < 1) {
    return [];
  }

  return new Array(chunkNum)
    .fill(null)
    .map((_, index) => array.filter((_2, arrayIndex) => arrayIndex % chunkNum === index));
};
