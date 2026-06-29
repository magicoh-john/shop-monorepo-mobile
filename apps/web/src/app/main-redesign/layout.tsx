import Link from 'next/link';
import { Search, Heart, ShoppingBag } from 'lucide-react';

/**
 * 정적 프리뷰(/main-redesign) 전용 GNB.
 * (shop)/layout.tsx의 기존 Header를 상속하지 않도록 이 라우트는
 * (shop) 그룹 밖에 있다 — 여기서 Figma 에디토리얼 톤에 맞는 자체 GNB를 둔다.
 */
function RedesignGnb() {
  return (
    <header className="bg-dm-surface-bright border-b border-dm-outline-variant">
      <div className="max-w-[1280px] mx-auto px-4 md:px-10 h-14 md:h-16 flex items-center justify-between">
        <Link href="/main-redesign" className="font-dm-display text-lg md:text-xl text-dm-primary tracking-tight">
          MAISON
        </Link>
        <nav className="hidden md:flex items-center gap-8 font-dm-body text-xs font-bold tracking-[0.08em] uppercase text-dm-on-surface">
          <span>New</span>
          <span>Women</span>
          <span>Men</span>
          <span>Beauty</span>
        </nav>
        <div className="flex items-center gap-4 text-dm-on-surface">
          <Search className="size-5" strokeWidth={1.5} />
          <Heart className="size-5" strokeWidth={1.5} />
          <ShoppingBag className="size-5" strokeWidth={1.5} />
        </div>
      </div>
    </header>
  );
}

export default function MainRedesignLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <RedesignGnb />
      <main className="flex-1">{children}</main>
    </div>
  );
}
