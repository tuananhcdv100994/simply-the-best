'use client'; // FIX: Convert to a client component to use hooks and context.

import React, { useContext } from 'react';
// FIX: Import AuthContext and UserBar instead of the public Header.
import { AuthContext } from '@/contexts/AuthContext';
// FIX: Import ContentProvider to make content state available to admin pages.
import { ContentProvider } from '../../contexts/ContentContext';
import UserBar from '@/components/UserBar';
import { useRouter } from 'next/navigation';

// This layout file is specific to the /admin route and its children.
// It wraps the admin pages, ensuring they share a common structure,
// such as the specialized admin header.
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = useContext(AuthContext);
  const router = useRouter();

  const handleNavigate = (view: 'admin' | 'home') => {
    if (view === 'home') {
      router.push('/');
    } else {
      router.push('/admin');
    }
  }

  const handleLogout = () => {
    auth?.logout();
    router.push('/');
  }

  // Render a loading state or nothing if user isn't loaded or is not an admin
  if (auth?.loading) {
    return <div className="flex items-center justify-center min-h-screen text-yellow-400 text-xl">Đang tải...</div>;
  }

  if (!auth?.currentUser || auth.currentUser.role !== 'Admin') {
    // In a real app, you'd redirect. For now, we show an access denied message.
     return (
        <div className="flex flex-col items-center justify-center min-h-screen text-red-400 text-xl">
          <p>Truy cập bị từ chối</p>
          <button onClick={() => router.push('/')} className="mt-4 text-sm font-semibold text-gray-300 hover:text-yellow-400">Về trang chủ</button>
        </div>
     );
  }

  return (
    // FIX: Wrap the entire layout with ContentProvider so all admin children can access content context.
    <ContentProvider>
      <div className="bg-gray-900 min-h-screen">
        {/* FIX: Use UserBar for authenticated admin users instead of the public Header. */}
        {/* This resolves the missing 'onNavigate' prop error by using the correct component. */}
        <UserBar user={auth.currentUser} onLogout={handleLogout} onNavigate={handleNavigate} />
        <main>
          {children}
        </main>
      </div>
    </ContentProvider>
  );
}
