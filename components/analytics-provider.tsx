'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview } from '@/lib/analytics';

export default function AnalyticsProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (pathname) {
      // 构建完整的 URL 路径，包括查询参数
      let url = pathname;
      if (searchParams?.toString()) {
        url = `${url}?${searchParams.toString()}`;
      }
      
      // 发送页面浏览事件到 Google Analytics
      pageview(url);
    }
  }, [pathname, searchParams]);

  return null; // 这个组件不渲染任何内容
}
