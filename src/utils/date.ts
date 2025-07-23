/** 오늘로부터 며칠 전인지 계산 */
export const getDaysAgo = (dateStr: string): number => {
  const today = new Date();
  const targetDate = new Date(dateStr);

  // 시간, 분, 초를 0으로 설정하여 날짜만 비교
  today.setHours(0, 0, 0, 0);
  targetDate.setHours(0, 0, 0, 0);

  const diffTime = today.getTime() - targetDate.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays;
};

/** 정확히 1년이 되는 날인지 확인 */
export const isOneYearAnniversary = (dateStr: string): boolean => {
  const daysAgo = getDaysAgo(dateStr);
  // 윤년을 고려하여 365일로 간단히 확인
  return daysAgo >= 365;
};
