'use client';

import { useEffect, Suspense } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { pageview } from '@/lib/analytics';

// 内部组件，使用 useSearchParams
function AnalyticsTracker() {
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

  return null;
}

// 主组件，使用 Suspense 包裹
export default function AnalyticsProvider() {
  return (
    <Suspense fallback={null}>
      <AnalyticsTracker />
    </Suspense>
  );
}
