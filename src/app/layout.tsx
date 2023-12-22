import type { Metadata } from 'next';
import { Inter, Lato } from 'next/font/google';
import { GeistSans } from 'geist/font/sans';
import '../styles/global.css';
import Provider from './_trpc/Provider';
import AuthProvider from '@/components/AuthProvider';
import Navbar from '@/components/Navbar';
import { Toaster, toast } from 'sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const lato = Lato({
  subsets: ['latin'],
  variable: '--font-lato',
  weight: ['400', '700', '300'],
});
export const metadata: Metadata = {
  title: 'CampCode',
  description: 'One Stop Destination for tracking leetcode problems',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${GeistSans.variable} ${lato.variable}`}
    >
      <body>
        <Toaster richColors position="top-right" />
        <AuthProvider>
          <Provider>
            <Navbar />
            <div className="font-inter max-w-screen-xl px-8 mx-auto">
              {children}
            </div>
          </Provider>
        </AuthProvider>
      </body>
    </html>
  );
}
