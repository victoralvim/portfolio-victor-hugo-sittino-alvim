import type { Metadata } from 'next';
import './globals.css';
import { AuthProvider } from '@/components/AuthProvider';

export const metadata: Metadata = {
  title: 'Pixen',
  description: 'Extract and view Exif metadata from media files.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen selection:bg-[#ffcc00] selection:text-[#002b2b]">
        <AuthProvider>
          <div className="max-w-[680px] mx-auto">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
