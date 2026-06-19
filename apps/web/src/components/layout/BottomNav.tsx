'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, ShoppingCart, User } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

const tabs = [
  { href: '/', icon: Home, label: '홈' },
  { href: '/products', icon: LayoutGrid, label: '카테고리' },
  { href: '/cart', icon: ShoppingCart, label: '장바구니' },
  { href: '/mypage', icon: User, label: '마이쇼핑' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const totalCount = useCartStore((s) => s.totalCount());

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-background border-t border-border">
      <div className="flex">
        {tabs.map(({ href, icon: Icon, label }) => {
          const isActive = href === '/' ? pathname === '/' : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center justify-center h-14 gap-0.5 text-xs transition-colors ${
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <div className="relative">
                <Icon size={22} />
                {label === '장바구니' && totalCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-primary text-primary-foreground text-xs rounded-full w-4 h-4 flex items-center justify-center font-bold">
                    {totalCount > 9 ? '9+' : totalCount}
                  </span>
                )}
              </div>
              <span>{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
