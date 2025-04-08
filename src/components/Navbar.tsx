// navbar.tsx
'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { useDarkMode } from '@/context/DarkModeContext'
// Import shadcn dropdown components for a mobile-friendly menu
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu } from 'lucide-react' // Using lucide icons for the hamburger icon

function Navbar() {
  const pathname = usePathname()
  const [isFeedbackPage, setIsFeedbackPage] = useState(false)

  // Update state when route changes
  useEffect(() => {
    setIsFeedbackPage(pathname === '/feedback')
  }, [pathname])

  const { isDark, toggleDarkMode } = useDarkMode()

  // For inline buttons, use the isDark variable to pick text color.
  // (They are rendered inside a container that respects dark mode.)
  const buttonTextClasses = isDark ? 'text-white' : 'text-black'

  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold">
          HeyFeedback
        </Link>
        {/* For larger screens, show inline buttons */}
        <div className="hidden sm:flex gap-4 items-center">
          {isFeedbackPage ? (
            <Button
              className={`w-auto bg-slate-100 ${buttonTextClasses}`}
              variant="outline"
            >
              <Link href="/" className="font-bold">
                Back To Home
              </Link>
            </Button>
          ) : (
            <Button
              className={`w-auto bg-slate-100 ${buttonTextClasses}`}
              variant="outline"
            >
              <Link href="/feedback" className="font-bold">
                Submitted Feedback
              </Link>
            </Button>
          )}
          <Button
            onClick={toggleDarkMode}
            className={`w-auto bg-slate-100 ${buttonTextClasses}`}
            variant="outline"
          >
            {isDark ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </div>

        {/* Mobile Navbar: show a hamburger menu on small screens */}
        <div className="sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="p-2 bg-slate-100">
                {/* The Menu icon uses the same conditional text color */}
                <Menu className={buttonTextClasses} size={20} />
              </Button>
            </DropdownMenuTrigger>
            {/*
              Because the DropdownMenuContent is rendered in a portal, the dark class
              might not be inherited. We use the isDark variable to conditionally set the classes.
            */}
            <DropdownMenuContent
              className={`border border-gray-700 ${
                isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'
              }`}
            >
              <DropdownMenuItem
                className={`hover:bg-gray-700 ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                {isFeedbackPage ? (
                  <Link
                    href="/"
                    className="w-full block font-bold"
                  >
                    Back To Home
                  </Link>
                ) : (
                  <Link
                    href="/feedback"
                    className="w-full block font-bold"
                  >
                    Submitted Feedback
                  </Link>
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                onSelect={toggleDarkMode}
                className={`hover:bg-gray-700 ${
                  isDark ? 'text-white' : 'text-black'
                }`}
              >
                <span className="w-full block font-bold">
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
