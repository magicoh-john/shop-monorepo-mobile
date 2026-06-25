/**
 * [Server Component] 메인 페이지 리디자인 — 정적 프리뷰 (3차 접근)
 *
 * 목적: 운영 중인 `(shop)/page.tsx`를 직접 건드리지 않고, 디자인 헌법(DESIGN.md)과
 * 실제 Figma 디자인(node-id 1:3)만 반영한 정적 화면을 먼저 완성해 검증하기 위한
 * 별도 라우트다. 이 단계에서는 Prisma 쿼리·비즈니스 로직을 일절 사용하지 않는다 —
 * 카테고리/상품 데이터는 docs/design/pages/main.md에 적힌 Figma 샘플 데이터를
 * 그대로 하드코딩한 정적 값이다.
 *
 * 검증 통과 후 다음 단계(Prisma 데이터 점진 적용)는 이 파일을 기준으로 진행한다.
 */
import Link from 'next/link';
import { Share2, Camera, PlayCircle } from 'lucide-react';

const CATEGORIES = ['패션의류', '신발/가방', '액세서리', '뷰티', '스포츠'];

const NEW_ARRIVALS = [
  { id: 'n1', brand: 'LÉMUELL', name: 'Structured Wool Blazer', price: '$345.00', image: 'https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?w=600&h=600&fit=crop&auto=format' },
  { id: 'n2', brand: 'MINSÉ', name: 'Pure Cashmere Scarf', price: '$120.00', image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=600&h=600&fit=crop&auto=format' },
  { id: 'n3', brand: 'OEUVE', name: 'Mini Moon Leather Bag', price: '$280.00', image: 'https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600&h=600&fit=crop&auto=format' },
  { id: 'n4', brand: 'RECTO', name: 'Square Toe Ankle Boots', price: '$410.00', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=600&fit=crop&auto=format' },
];

const BEAUTY_PICKS = [
  { id: 'b1', category: 'SKINCARE', name: 'Deep Sea Essence', price: '$65.00', image: 'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=500&h=500&fit=crop&auto=format' },
  { id: 'b2', category: 'MAKEUP', name: 'Satin Glide Lipstick', price: '$32.00', image: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=500&h=500&fit=crop&auto=format' },
  { id: 'b3', category: 'MAKEUP', name: 'Glow Cushion Foundation', price: '$48.00', image: 'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=500&h=500&fit=crop&auto=format' },
  { id: 'b4', category: 'HAIR CARE', name: 'Midnight Repair Oil', price: '$55.00', image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=500&h=500&fit=crop&auto=format' },
];

export default function MainRedesignPreviewPage() {
  return (
    <div className="bg-dm-surface min-h-full font-dm-body">

      {/* 2. Hero Banner */}
      <section className="relative w-full min-h-[640px] flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=1600&h=1200&fit=crop&auto=format"
          alt="AW 2024 Collection"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/10" />
        <div className="relative z-10 max-w-[672px] mx-auto px-6 text-center">
          <p className="font-dm-body text-xs font-bold tracking-[0.08em] uppercase text-dm-primary">
            AW 2024 COLLECTION
          </p>
          <h1 className="font-dm-display text-[28px] md:text-5xl leading-[1.2] mt-4 text-dm-primary">
            <em className="italic">The New Silence:</em><br />Refined Winter Minimalism
          </h1>
          <Link
            href="/products"
            className="inline-block mt-8 px-10 py-4 rounded-dm-full bg-dm-primary text-dm-on-primary font-dm-body text-xs font-bold tracking-[0.08em] uppercase hover:opacity-90 transition-opacity"
          >
            DISCOVER THE EDIT
          </Link>
        </div>
      </section>

      {/* 3. Category Tab (Horizontal Scroll) — 정적 프리뷰: 실제 DB 카테고리 미연결 */}
      <section className="border-b border-dm-outline-variant">
        <div className="max-w-[1280px] mx-auto px-4 md:px-10 overflow-x-auto">
          <div className="flex gap-8 py-6 min-w-max">
            {CATEGORIES.map((name) => (
              <span
                key={name}
                className="font-dm-ko text-xs font-bold tracking-[0.04em] text-dm-on-surface-variant whitespace-nowrap pb-1 border-b-2 border-transparent"
              >
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 4. New Arrivals — 정적 프리뷰: Figma 샘플 데이터 */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-10 py-12 md:py-20">
        <div className="flex items-end justify-between mb-8 flex-wrap gap-2">
          <div>
            <h2 className="font-dm-display text-2xl md:text-[32px] text-dm-primary">New Arrivals</h2>
            <p className="font-dm-body text-sm md:text-base text-dm-on-surface-variant mt-1">
              Discover the latest pieces from Seoul&apos;s top designers.
            </p>
          </div>
          <span className="font-dm-body text-xs font-bold tracking-[0.08em] uppercase underline text-dm-on-surface">
            VIEW ALL
          </span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {NEW_ARRIVALS.map((p) => (
            <div key={p.id} className="group block">
              <div className="relative aspect-square overflow-hidden rounded-dm-lg bg-dm-surface-container">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="mt-3 font-dm-ko">
                <p className="text-[11px] font-medium text-dm-on-surface-variant uppercase tracking-wide">{p.brand}</p>
                <p className="text-base font-bold text-dm-on-surface mt-1 line-clamp-1">{p.name}</p>
                <p className="text-base text-dm-on-surface mt-0.5">{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Brand Spotlight (Asymmetric) */}
      <section className="bg-dm-surface-container-low max-w-[1280px] mx-auto px-4 md:px-10 py-12 md:py-20 my-4 rounded-dm-lg">
        <div className="grid md:grid-cols-12 gap-8 items-stretch">
          <div className="md:col-span-7">
            <div className="aspect-[4/3] md:aspect-auto md:h-full rounded-dm-xl overflow-hidden bg-dm-surface-container-high">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=900&fit=crop&auto=format"
                alt="Designer of the month"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:col-span-5 flex flex-col">
            <p className="font-dm-body text-xs font-bold tracking-[0.08em] uppercase text-dm-secondary">
              DESIGNER OF THE MONTH
            </p>
            <h2 className="font-dm-display text-[28px] md:text-[32px] text-dm-primary mt-3">
              Maison De Sèoul:<br />Quiet Elegance
            </h2>
            <p className="font-dm-body text-sm md:text-base text-dm-on-surface-variant mt-4 leading-relaxed">
              Founded in the heart of Hannam-dong, Maison De Sèoul redefines contemporary luxury
              through a lens of extreme minimalism. Every stitch is intentional, every fabric is
              sourced for its sensory experience. This season explores the dialogue between rigid
              architecture and the fluid human form.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="aspect-square rounded-dm-lg overflow-hidden bg-dm-surface-container-high">
                <img
                  src="https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=600&fit=crop&auto=format"
                  alt="텍스처 디테일"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="aspect-square rounded-dm-lg overflow-hidden bg-dm-surface-container-high">
                <img
                  src="https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=600&fit=crop&auto=format"
                  alt="텍스처 디테일"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <span className="inline-flex items-center gap-2 mt-6 font-dm-body text-xs font-bold tracking-[0.08em] uppercase text-dm-primary">
              EXPLORE THE COLLECTION <span aria-hidden>→</span>
            </span>
          </div>
        </div>
      </section>

      {/* 6. The Beauty Ritual — 정적 프리뷰: Figma 샘플 데이터 */}
      <section className="max-w-[1280px] mx-auto px-4 md:px-10 py-12 md:py-20">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-dm-display italic text-2xl md:text-[32px] text-dm-primary">The Beauty Ritual</h2>
          <div className="hidden md:flex gap-3">
            <button type="button" aria-label="이전" className="size-12 rounded-dm-full border border-dm-outline flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-4"><path d="M15 18l-6-6 6-6" /></svg>
            </button>
            <button type="button" aria-label="다음" className="size-12 rounded-dm-full border border-dm-outline flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="size-4"><path d="M9 18l6-6-6-6" /></svg>
            </button>
          </div>
        </div>
        <div
          className="flex gap-4 overflow-x-auto [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none' }}
        >
          {BEAUTY_PICKS.map((p) => (
            <div key={p.id} className="shrink-0 w-[260px] md:w-[320px]">
              <div className="aspect-square rounded-dm-md overflow-hidden bg-dm-surface-container">
                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
              </div>
              <div className="mt-3 font-dm-ko">
                <p className="text-[11px] font-medium text-dm-secondary uppercase tracking-wide">{p.category}</p>
                <p className="text-base font-bold text-dm-on-surface mt-1 line-clamp-1">{p.name}</p>
                <p className="text-base text-dm-on-surface-variant mt-0.5">{p.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Join The Circle (Newsletter) */}
      <section className="bg-dm-primary py-12 md:py-20">
        <div className="max-w-[448px] mx-auto px-6 text-center">
          <h2 className="font-dm-display italic text-2xl md:text-[32px] text-dm-on-primary">
            Join The Circle
          </h2>
          <p className="font-dm-body text-sm md:text-base text-dm-on-primary/80 mt-3">
            Subscribe for early access to new drops and curated styling guides from our editorial team.
          </p>
          <form className="mt-6 flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 rounded-dm-md bg-transparent border border-white/30 px-4 py-3 text-sm text-dm-on-primary placeholder:text-white/40 focus:outline-none focus:border-dm-on-primary"
            />
            <button
              type="submit"
              className="rounded-dm-md bg-dm-on-primary text-dm-primary px-6 py-3 text-xs font-bold tracking-[0.08em] uppercase hover:opacity-90 transition-opacity"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </section>

      {/* 8. Footer */}
      <footer className="max-w-[1280px] mx-auto px-4 md:px-10">
        <div className="flex flex-col md:flex-row gap-10 md:gap-6 items-start md:items-end justify-center py-12 md:py-20">
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            <p className="font-dm-display font-bold text-lg text-dm-primary tracking-wide">THE EDIT</p>
            <p className="font-dm-body text-base text-dm-on-surface-variant max-w-[320px] leading-[1.6]">
              A curated editorial platform for the modern woman. Bringing the best of
              Seoul&apos;s fashion and beauty to the global stage.
            </p>
          </div>
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            <p className="font-dm-body text-xs font-bold tracking-[0.08em] text-dm-primary">SHOP</p>
            <ul className="flex flex-col gap-4 font-dm-body text-base text-dm-on-surface-variant">
              <li>New Arrivals</li>
              <li>Best Sellers</li>
              <li>Clothing</li>
              <li>Beauty</li>
            </ul>
          </div>
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            <p className="font-dm-body text-xs font-bold tracking-[0.08em] text-dm-primary">SUPPORT</p>
            <ul className="flex flex-col gap-4 font-dm-body text-base text-dm-on-surface-variant">
              <li>Shipping Info</li>
              <li>Returns &amp; Exchanges</li>
              <li>Contact Us</li>
              <li>FAQ</li>
            </ul>
          </div>
          <div className="flex-1 min-w-0 flex flex-col gap-6">
            <p className="font-dm-body text-xs font-bold tracking-[0.08em] text-dm-primary">SOCIAL</p>
            <div className="flex gap-4">
              <span className="size-10 rounded-dm-full bg-dm-surface flex items-center justify-center">
                <Share2 className="size-[18px]" strokeWidth={1.5} />
              </span>
              <span className="size-10 rounded-dm-full bg-dm-surface flex items-center justify-center">
                <Camera className="size-[18px]" strokeWidth={1.5} />
              </span>
              <span className="size-10 rounded-dm-full bg-dm-surface flex items-center justify-center">
                <PlayCircle className="size-[18px]" strokeWidth={1.5} />
              </span>
            </div>
          </div>
        </div>
        <div className="border-t border-dm-outline-variant/30 py-[33px] flex flex-col sm:flex-row gap-4 items-center justify-between">
          <p className="font-dm-body text-[11px] text-dm-on-surface-variant">
            © 2024 THE EDIT. All rights reserved. High-end editorial e-commerce.
          </p>
          <div className="flex gap-6 font-dm-body text-[11px] text-dm-on-surface-variant">
            <span>Terms of Service</span>
            <span>Privacy Policy</span>
            <span>Accessibility</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
