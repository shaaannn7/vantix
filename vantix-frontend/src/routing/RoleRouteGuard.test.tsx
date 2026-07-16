// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import { RoleRouteGuard } from './RoleRouteGuard';
import { useAuthStore } from '@/store/authStore';

describe('RoleRouteGuard component', () => {
  beforeEach(() => {
    // Reset state before each guard test
    useAuthStore.setState({
      user: null,
      isAuthenticated: false,
    });
  });

  afterEach(() => {
    cleanup();
  });

  it('blocks rendering when no user session is authenticated', () => {
    render(
      <RoleRouteGuard allowedRoles={['OPERATOR']}>
        <div data-testid="children">Operational Area</div>
      </RoleRouteGuard>
    );

    expect(screen.queryByTestId('children')).toBeNull();
    expect(screen.getByText(/ACCESS_DENIED/i)).toBeDefined();
  });

  it('allows rendering when user role matches allowed privileges', () => {
    useAuthStore.setState({
      user: {
        userId: '1',
        username: 'operator_01',
        fullName: 'J. Smith',
        role: 'OPERATOR',
      },
      isAuthenticated: true,
    });

    render(
      <RoleRouteGuard allowedRoles={['OPERATOR', 'SECURITY']}>
        <div data-testid="children">Operational Area</div>
      </RoleRouteGuard>
    );

    expect(screen.getByTestId('children')).toBeDefined();
    expect(screen.getByText('Operational Area')).toBeDefined();
    expect(screen.queryByText(/ACCESS_DENIED/i)).toBeNull();
  });

  it('blocks rendering when user role does not match allowed privileges', () => {
    useAuthStore.setState({
      user: {
        userId: '1',
        username: 'guest_01',
        fullName: 'Visitor',
        role: 'GUEST',
      },
      isAuthenticated: true,
    });

    render(
      <RoleRouteGuard allowedRoles={['OPERATOR', 'SECURITY']}>
        <div data-testid="children">Operational Area</div>
      </RoleRouteGuard>
    );

    expect(screen.queryByTestId('children')).toBeNull();
    expect(screen.getByText(/ACCESS_DENIED/i)).toBeDefined();
  });
});
