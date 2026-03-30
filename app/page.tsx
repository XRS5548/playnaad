import AnnouncementBar from '@/components/layouts/announcementBar'
import Footer from '@/components/layouts/footer'
import Navbar from '@/components/layouts/navbar'
import React from 'react'

export default function page() {
  return (
    <div>
      <Navbar />
      <AnnouncementBar />
      <Footer/>
    </div>
  )
}
