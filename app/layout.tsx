import { Providers } from '@/components/Providers';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Averia_Serif_Libre } from 'next/font/google';

const font = Averia_Serif_Libre({
  weight: '400',
  subsets: ['latin'],
});

const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'Next.js and Supabase Starter Kit',
  description: 'The fastest way to build apps with Next.js and Supabase',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className={`min-h-screen flex flex-col items-center ${font.className}`}>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
