import Link from 'next/link'
import * as React from 'react'
import { Pacifico } from 'next/font/google'

const dancingScript = Pacifico({ subsets: ['latin'], weight: '400' })

import Image from 'next/image'
import { ThemeToggle } from './theme-toggle'

const links = [
  { label: 'Home', href: '/' },
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Workspaces', href: '/workspaces' },
]

export function Footer() {
  return (
    <footer className="rounded-lg shadow-xl border">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <Link
            href="/"
            className="flex gap-2 items-end hover:bg-surface-100-800-token rounded p-1 transition-all"
          >
            <Image src="/scribblev4.png" alt="Scribble logo" height="42" width="42" />
            <span
              className={`hidden text-xl sm:inline-block tracking-widest text-primary-900-50-token ${dancingScript.className}`}
            >
              Scribble
            </span>
          </Link>

          <div className="flex items-center gap-4">
            <ThemeToggle />

            <ul className="flex flex-wrap items-center text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              {links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="mr-4 hover:underline md:mr-6">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}
