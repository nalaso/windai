"use client"
import Link from 'next/link'
import { cn } from "@/lib/utils"
import { usePathname } from 'next/navigation'

const sidebarItems = [
  { name: 'General', href: '/settings/general' },
  { name: 'Account', href: '/settings/account' },
  { name: 'Themes', href: '/themes' },
  { name: 'UI', href: '/settings/ui' },
  { name: 'LLM', href: '/settings/llm' }, // Updated this line
  { name: 'API keys', href: '/settings/api-key' },
  { name: 'About', href: '/settings/about' },
]

export default function SettingsSidebar() {
  const pathname = usePathname()

  return (
    <nav className="w-60 bg-gray-50 h-full">
      <div className="px-3 py-4">
        <ul className="space-y-1">
          {sidebarItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  "block px-3 py-2 rounded-md text-sm font-medium",
                  pathname === item.href
                    ? "bg-gray-200 text-gray-900"
                    : "text-gray-700 hover:bg-gray-100"
                )}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}