import { renderHook } from '@testing-library/react'
import { useAuthStatus } from './useAuthStatus'
import { AuthProvider, useAuth } from '@/context/AuthContext'

jest.mock('@/context/AuthContext', () => ({
  ...jest.requireActual('@/context/AuthContext'),
  useAuth: jest.fn()
}))

describe('useAuthStatus', () => {
  it('returns correct authentication status', () => {
    const mockUseAuth = useAuth as jest.MockedFunction<typeof useAuth>
    
    mockUseAuth.mockReturnValue({ user: null, login: jest.fn(), logout: jest.fn() })
    
    const { result, rerender } = renderHook(() => useAuthStatus(), {
      wrapper: ({ children }) => <AuthProvider>{children}</AuthProvider>
    })

    expect(result.current.isLoggedIn).toBe(false)
    expect(result.current.userEmail).toBeUndefined()

    mockUseAuth.mockReturnValue({ user: { email: 'test@example.com' }, login: jest.fn(), logout: jest.fn() })
    
    rerender()

    expect(result.current.isLoggedIn).toBe(true)
    expect(result.current.userEmail).toBe('test@example.com')
  })
})
