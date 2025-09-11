'use client'; // FIX: Convert to client component to use context provider.

import type { Metadata } from 'next';
import React from 'react';
// FIX: Import the AuthProvider to make it available to all child components.
import { AuthProvider } from '../contexts/AuthContext';


// This is the root layout file for the Next.js application.
// It replaces the old index.html and provides the basic HTML structure for all pages.

// Metadata object for SEO. This information helps Google understand the site's purpose.
export const metadata: Metadata = {
  title: 'Simply The Best! - Tôn vinh sự xuất sắc',
  description: 'Nền tảng cộng đồng tôn vinh thành tựu, lan tỏa cảm hứng và kết nối những cá nhân xuất sắc trong mọi lĩnh vực.',
  keywords: ['thành tựu', 'xuất sắc', 'cộng đồng', 'truyền cảm hứng', 'thể thao', 'nghệ thuật'],
  // TODO: Add Open Graph and Twitter card metadata for better social sharing previews.
};

// Organization Schema (Structured Data) using JSON-LD.
// This gives Google detailed information about the organization, which can enhance search results (e.g., knowledge panels).
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Simply The Best!',
  url: 'https://simplythebest.vn', // Replace with the actual domain
  logo: 'https://simplythebest.vn/logo.png', // Replace with the actual logo URL
  description: 'Nền tảng cộng đồng tôn vinh thành tựu, lan tỏa cảm hứng và kết nối những cá nhân xuất sắc.',
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'support@simplythebest.vn',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <head>
        <script src="https://cdn.tailwindcss.com"></script>
        <style>{`
          /* Custom scrollbar for a more premium feel */
          ::-webkit-scrollbar { width: 8px; }
          ::-webkit-scrollbar-track { background: #1a1a1a; }
          ::-webkit-scrollbar-thumb { background: #d4af37; border-radius: 4px; }
          ::-webkit-scrollbar-thumb:hover { background: #f0c42d; }
        `}</style>
        {/* Google Search Console verification tag would be placed here */}
        {/* <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" /> */}

        {/* Injecting the JSON-LD schema into the head of the document */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="bg-gray-900 text-white antialiased">
        {/* FIX: Wrap children with AuthProvider to provide auth context to the entire app */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}