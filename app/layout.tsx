import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { NextUIProvider } from '@nextui-org/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Тест Рокича',
  description: 'Тест Рокича',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-gradient-to-r from-cyan-500 to-blue-500 text-blue-900`}
      >
        <NextUIProvider>
          {children}
          <ToastContainer />
        </NextUIProvider>
      </body>
    </html>
  );
}
