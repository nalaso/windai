"use client"
import SettingsSidebar from '@/components/settings-sidebar'
import Header from '@/components/header'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { redirect } from 'next/navigation'

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const { status } = useSession()
    
    useEffect(() => {
      if(status==='unauthenticated') {
          redirect('/')
      }
    }, [status])
    
  return (
    <div>
      <Header />
      <div className="p-10 mx-auto">
        <h1 className="text-3xl font-bold mb-6">Settings</h1>
        <div className="flex">
          <SettingsSidebar />
          <div className="flex-1 ml-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}