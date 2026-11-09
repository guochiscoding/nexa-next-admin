'use client';

import { ComponentDocsView } from '@/features/component-docs';
import { ForbiddenView, NotFoundView, UnauthorizedView } from '@/features/exceptions';
import { HomeView } from '@/features/home';
import { PageTemplatesView } from '@/features/page-templates';
import { ProjectIntroView } from '@/features/project-intro';
import { TableExampleView } from '@/features/table-example';
import type { RouteKey } from '@/routes/definitions';

export type RouteComponent = (props: { routeKey: RouteKey }) => React.ReactNode;

const pageTemplatesComponent: RouteComponent = ({ routeKey }) => <PageTemplatesView routeKey={routeKey} />;
const componentDocsComponent: RouteComponent = ({ routeKey }) => <ComponentDocsView routeKey={routeKey} />;

export const routeComponentRegistry: Record<RouteKey, RouteComponent> = {
  '401': UnauthorizedView,
  '403': ForbiddenView,
  'component-library': componentDocsComponent,
  'component-library/buttons': componentDocsComponent,
  'component-library/dates': componentDocsComponent,
  'component-library/forms': componentDocsComponent,
  'component-library/radios': componentDocsComponent,
  'component-library/secondary-layout': componentDocsComponent,
  'component-library/tabs': componentDocsComponent,
  'home': HomeView,
  'not-found': NotFoundView,
  'page-templates': pageTemplatesComponent,
  'page-templates/account-center': pageTemplatesComponent,
  'page-templates/account-settings': pageTemplatesComponent,
  'page-templates/advanced-list': pageTemplatesComponent,
  'page-templates/basic-form': pageTemplatesComponent,
  'page-templates/detail': pageTemplatesComponent,
  'page-templates/exception': pageTemplatesComponent,
  'page-templates/result': pageTemplatesComponent,
  'project-intro': ProjectIntroView,
  'table-example': TableExampleView,
};
