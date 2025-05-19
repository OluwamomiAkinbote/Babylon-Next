import './globals.css';
import Header from '@/components/Header/Header';
import Footer from '@/components/Footer/Footer';

export const metadata = {
  title: {
    default: 'Newstropy',
    template: '%s | Newstropy'
  },
  description: 'Breakingnews | Stories | Community',
  keywords: ['Breaking News', 'Football News', 'Trending news', 'Latest news'],
  authors: [{ name: 'Newstropy', url: 'https://www.newstropy.online/' }],
  metadataBase: new URL('https://www.newstropy.online'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Newstropy',
    description: 'Breakingnews | Stories | Community',
    url: 'https://www.newstropy.online/',
    siteName: 'Newstropy',
    images: [
      {
        url: 'https://boltzmann.s3.us-east-1.amazonaws.com/Abstract/seo-logo-image.png',
        width: 1200,
        height: 630,
        alt: 'Newstropy Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Newstropy',
    description: 'Breakingnews | Stories | Community',
    images: ['https://boltzmann.s3.us-east-1.amazonaws.com/Abstract/seo-logo-image.png'],
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        rel: 'mask-icon',
        url: '/safari-pinned-tab.svg',
        color: '#5bbad5',
      },
    ],
  },

};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        <link rel="canonical" href="https://www.newstropy.online/" />
      </head>
      <body>
        <Header />
        <main className="min-h-[calc(100vh-160px)]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}