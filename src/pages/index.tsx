import Cta from '@/components/cta'
import Features from '@/components/features'
import Hero from '@/components/hero'

export default function Page() {
  return (
    <div className="w-full">
      <div className="max-w-6xl mx-auto">
        <Hero />
        <Features />
        <Cta />
      </div>
    </div>
  )
}
