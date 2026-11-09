'use client';

import { routeComponentRegistry } from '@/routes/registry';
import type { RouteKey } from '@/routes/definitions';

export function RouteContent({ routeKey }: { routeKey: RouteKey }) {
  const Component = routeComponentRegistry[routeKey] ?? routeComponentRegistry['not-found'];
  return <Component routeKey={routeKey} />;
}
