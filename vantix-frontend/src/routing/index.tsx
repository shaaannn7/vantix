import { createBrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import React, { Suspense } from 'react';
import { RoleRouteGuard } from './RoleRouteGuard';

// Lazy load layout pages
const MissionControl = React.lazy(() => import('@/pages/MissionControl'));
const CrowdIntelligence = React.lazy(() => import('@/pages/CrowdIntelligence').then(m => ({ default: m.CrowdIntelligence })));
const EmergencyCenter = React.lazy(() => import('@/pages/EmergencyCenter'));
const Transport = React.lazy(() => import('@/pages/Transport').then(m => ({ default: m.Transport })));
const Analytics = React.lazy(() => import('@/pages/Analytics').then(m => ({ default: m.Analytics })));
const Sustainability = React.lazy(() => import('@/pages/Sustainability').then(m => ({ default: m.Sustainability })));
const Settings = React.lazy(() => import('@/pages/Settings').then(m => ({ default: m.Settings })));

const AICommandCenter = React.lazy(() => import('@/pages/AICommandCenter'));
const AISimulationEngine = React.lazy(() => import('@/pages/AISimulationEngine').then(m => ({ default: m.AISimulationEngine })));
const Volunteers = React.lazy(() => import('@/pages/Volunteers').then(m => ({ default: m.Volunteers })));
const SecurityPatrol = React.lazy(() => import('@/pages/SecurityPatrol').then(m => ({ default: m.SecurityPatrol })));
const FanAssistant = React.lazy(() => import('@/pages/FanAssistant').then(m => ({ default: m.FanAssistant })));

import { DemoSystem } from '@/components/demo/DemoSystem';

const DemoWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <ErrorBoundary>
    <Suspense fallback={
      <div className="flex h-screen w-screen items-center justify-center bg-obsidian text-system-cyan font-mono text-sm animate-pulse">
        L3_WORKSPACE_INITIALIZING...
      </div>
    }>
      {children}
      <DemoSystem />
    </Suspense>
  </ErrorBoundary>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <DemoWrapper><MissionControl /></DemoWrapper>,
  },
  {
    path: '/ai-operations',
    element: <DemoWrapper><AICommandCenter /></DemoWrapper>,
  },
  {
    path: '/simulation',
    element: <DemoWrapper><AISimulationEngine /></DemoWrapper>,
  },
  {
    path: '/crowd',
    element: (
      <RoleRouteGuard allowedRoles={['OPERATOR', 'SECURITY']}>
        <DemoWrapper><CrowdIntelligence /></DemoWrapper>
      </RoleRouteGuard>
    ),
  },
  {
    path: '/emergency',
    element: (
      <RoleRouteGuard allowedRoles={['OPERATOR', 'SECURITY', 'MEDICAL']}>
        <DemoWrapper><EmergencyCenter /></DemoWrapper>
      </RoleRouteGuard>
    ),
  },
  {
    path: '/transport',
    element: <DemoWrapper><Transport /></DemoWrapper>,
  },
  {
    path: '/analytics',
    element: <DemoWrapper><Analytics /></DemoWrapper>,
  },
  {
    path: '/sustainability',
    element: <DemoWrapper><Sustainability /></DemoWrapper>,
  },
  {
    path: '/volunteers',
    element: <DemoWrapper><Volunteers /></DemoWrapper>,
  },
  {
    path: '/security',
    element: <DemoWrapper><SecurityPatrol /></DemoWrapper>,
  },
  {
    path: '/fan',
    element: <DemoWrapper><FanAssistant /></DemoWrapper>,
  },
  {
    path: '/settings',
    element: <DemoWrapper><Settings /></DemoWrapper>,
  },
]);
