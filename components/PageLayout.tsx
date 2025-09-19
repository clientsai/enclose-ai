import Header from '@/components/Header'
import Footer from '@/components/Footer'

interface PageLayoutProps {
  children: React.ReactNode
  variant?: 'website' | 'app'
  showFooter?: boolean
}

export default function PageLayout({
  children,
  variant = 'website',
  showFooter = true
}: PageLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header variant={variant} />
      <main className="flex-1">
        {children}
      </main>
      {showFooter && variant === 'website' && <Footer />}
    </div>
  )
}