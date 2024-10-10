import React from 'react'
import { render, screen, act, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthProvider, useAuth } from './AuthContext'

// Mock fetch response
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ token: 'fake-token' }),
  })
) as jest.Mock;

// Mock component to test the useAuth hook
const TestComponent = () => {
  const { user, login, logout } = useAuth()
  return (
    <div>
      {user ? (
        <>
          <span>Logged in as {user.email}</span>
          <button onClick={logout}>Logout</button>
        </>
      ) : (
        <button onClick={() => login('test@example.com', 'password')}>Login</button>
      )}
    </div>
  )
}

describe('AuthContext', () => {
  it('provides authentication state and methods', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    // Initially, user should not be logged in
    expect(screen.queryByText(/Logged in as/)).not.toBeInTheDocument()

    // Login
    const loginButton = screen.getByText('Login')
    await act(async () => {
      await userEvent.click(loginButton)
    })

    // User should now be logged in
    await waitFor(() => {
      expect(screen.getByText('Logged in as test@example.com')).toBeInTheDocument()
    }, { timeout: 3000 })

    // Logout
    const logoutButton = screen.getByText('Logout')
    await act(async () => {
      await userEvent.click(logoutButton)
    })

    // User should be logged out
    await waitFor(() => {
      expect(screen.queryByText(/Logged in as/)).not.toBeInTheDocument()
    }, { timeout: 3000 })
  })
})
