import AnnouncementBar from '@/components/layouts/announcementBar'
import Footer from '@/components/layouts/footer'
import Navbar from '@/components/layouts/navbar'
import BrandStory from '@/components/sections/banner'
import CategoriesSection from '@/components/sections/categories'
import HeroSection from '@/components/sections/hero'
import Marquee from '@/components/sections/maquee'
import NewsletterSection from '@/components/sections/newslatter'
import ProductsSection from '@/components/sections/products'
import TestimonialsSection from '@/components/sections/testemonials'
import React from 'react'

export default function page() {
  return (
    <div>
      <Navbar />
      <AnnouncementBar />
      <HeroSection />
      <Marquee />
      <CategoriesSection />
      <ProductsSection />
      <BrandStory />
      <TestimonialsSection />
      <NewsletterSection />
      <Footer/>
    </div>
  )
}
