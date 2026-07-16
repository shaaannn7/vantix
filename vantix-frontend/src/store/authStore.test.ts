import { describe, it, expect, beforeEach } from 'vitest';
import { useAuthStore } from './authStore';

describe('authStore state machine', () => {
  beforeEach(() => {
    // Reset state to initial pre-seeded values before each test run
    useAuthStore.setState({
      user: {
        userId: '1',
        username: 'fifa_op_01',
        fullName: 'J. Smith',
        role: 'OPERATOR',
      },
      isAuthenticated: true,
    });
  });

  it('initializes with default operator credentials', () => {
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user?.role).toBe('OPERATOR');
    expect(state.user?.username).toBe('fifa_op_01');
  });

  it('performs user login correctly', () => {
    const mockUser = {
      userId: '2',
      username: 'security_02',
      fullName: 'A. Garcia',
      role: 'SECURITY' as const,
    };
    
    useAuthStore.getState().login(mockUser);
    
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.user).toEqual(mockUser);
  });

  it('performs user logout correctly', () => {
    useAuthStore.getState().logout();
    
    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(false);
    expect(state.user).toBeNull();
  });
});
