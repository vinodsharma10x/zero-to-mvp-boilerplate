import React from 'react'
import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import LoginForm from './LoginForm'
import { AuthProvider } from '@/context/AuthContext'

const mockLogin = jest.fn()
jest.mock('@/context/AuthContext', () => ({
  ...jest.requireActual('@/context/AuthContext'),
  useAuth: () => ({
    login: mockLogin
  })
}))

const renderLoginForm = () => {
  render(
    <AuthProvider>
      <LoginForm />
    </AuthProvider>
  )
}

describe('LoginForm', () => {
  beforeEach(() => {
    mockLogin.mockClear()
  })

  it('displays an error message for Invalid email address', async () => {
    renderLoginForm()
    
    const emailInput = screen.getByLabelText(/email/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await act(async () => {
      await userEvent.type(emailInput, 'Invalid email address')
      await userEvent.click(submitButton)
    })

    await waitFor(() => {
      const emailError = screen.queryByTestId('email-error')
      expect(emailError).toBeInTheDocument()
      expect(emailError).toHaveTextContent("Invalid email address")
    }, { timeout: 3000 })
  })

  it('displays an error message for short password', async () => {
    renderLoginForm()
    
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await act(async () => {
      await userEvent.type(passwordInput, 'short')
      await userEvent.click(submitButton)
    })

    await waitFor(() => {
      const passwordError = screen.queryByTestId('password-error')
      expect(passwordError).toBeInTheDocument()
      expect(passwordError).toHaveTextContent('Password must be at least 6 characters')
    }, { timeout: 3000 })
  })

  it('calls login function with correct credentials', async () => {
    renderLoginForm()
    
    const emailInput = screen.getByLabelText(/email/i)
    const passwordInput = screen.getByLabelText(/password/i)
    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await act(async () => {
      await userEvent.type(emailInput, 'test@example.com')
      await userEvent.type(passwordInput, 'password123')
      await userEvent.click(submitButton)
    })

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@example.com', 'password123')
    }, { timeout: 3000 })
  })
})
