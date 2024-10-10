'use client';

import { ReactNode } from 'react'
import { useAppContext } from '@/context/AppContext'

type LayoutProps = {
  children: ReactNode
  title?: string
}

const Layout = ({ children, title = 'Next.js Boilerplate' }: LayoutProps) => {
  const { theme, toggleTheme } = useAppContext();

  return (
    <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <header className="bg-primary p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">{title}</h1>
          <button 
            onClick={toggleTheme}
            className="btn-primary"
          >
            Toggle Theme
          </button>
        </div>
      </header>
      <main className="flex-grow container mx-auto p-4">
        {children}
      </main>
      <footer className="bg-gray-200 p-4">
        <div className="container mx-auto text-center">
          © 2023 Next.js Boilerplate
        </div>
      </footer>
    </div>
  )
}

export default Layout
