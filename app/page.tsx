import Cta from '@/components/cta'
import Features from '@/components/features'
import Hero from '@/components/hero'
import Nav from '@/components/nav'
import Faq from '@/components/faq'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='w-full'>
      <div className='max-w-6xl mx-auto'>
        <Nav />
        <Hero />
        <Features />
        <Cta />
        <Faq />
      </div></div>



  )
}
