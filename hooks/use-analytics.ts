'use client';

import { event } from '@/lib/analytics';

// 自定义钩子，用于跟踪用户事件
export const useAnalytics = () => {
  // 跟踪游戏开始事件
  const trackGameStart = () => {
    event({
      action: 'game_start',
      category: 'game',
    });
  };

  // 跟踪游戏结束事件
  const trackGameEnd = (score: number) => {
    event({
      action: 'game_end',
      category: 'game',
      label: 'score',
      value: score,
    });
  };

  // 跟踪按钮点击事件
  const trackButtonClick = (buttonName: string) => {
    event({
      action: 'button_click',
      category: 'engagement',
      label: buttonName,
    });
  };

  // 跟踪分享事件
  const trackShare = (platform: string) => {
    event({
      action: 'share',
      category: 'engagement',
      label: platform,
    });
  };

  return {
    trackGameStart,
    trackGameEnd,
    trackButtonClick,
    trackShare,
  };
};
