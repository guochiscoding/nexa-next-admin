'use client';

import { ProtectedRouteView } from '@/routes/ProtectedRouteView';

export default function Page() {
  return <ProtectedRouteView routeKey="home" />;
}
