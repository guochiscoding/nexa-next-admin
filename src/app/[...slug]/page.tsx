'use client';

import { ProtectedRouteView } from '@/routes/ProtectedRouteView';
import { getRouteKeyFromSlug } from '@/routes/definitions';
import React from 'react';

export default function Page({ params }: { params: Promise<{ slug?: string[] }> }) {
  const { slug } = React.use(params);
  return <ProtectedRouteView routeKey={getRouteKeyFromSlug(slug)} />;
}
