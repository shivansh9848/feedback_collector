
'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from './ui/button'
import { usePathname } from 'next/navigation'
import { useDarkMode } from '@/context/DarkModeContext'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Menu } from 'lucide-react' 

function Navbar() {
  const pathname = usePathname()
  const [isFeedbackPage, setIsFeedbackPage] = useState(false)

  
  useEffect(() => {
    setIsFeedbackPage(pathname === '/feedback')
  }, [pathname])

  const { isDark, toggleDarkMode } = useDarkMode()

  
  
  const buttonTextClasses = isDark ? 'text-white' : 'text-black'

  return (
    <nav className="p-4 md:p-6 shadow-md bg-gray-900 text-white">
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">
          HeyFeedback
        </Link>
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

        <div className="sm:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="p-2 bg-slate-100">
                <Menu className={buttonTextClasses} size={20} />
              </Button>
            </DropdownMenuTrigger>
           
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
