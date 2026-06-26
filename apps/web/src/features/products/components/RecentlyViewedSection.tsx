'use client';

import Link from 'next/link';
import { useRecentStore } from '@/store/recentStore';
import ProductImage from './ProductImage';

export default function RecentlyViewedSection() {
  const items = useRecentStore((state) => state.items);

  if (items.length === 0) return null;

  return (
    <section className="flex flex-col gap-4 w-full">
      <h2 className="font-dm-display text-2xl text-dm-on-surface">최근 본 상품</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full">
        {items.slice(0, 4).map((product) => (
          <Link key={product.id} href={`/products/${product.id}`} className="flex flex-col gap-2">
            <div className="h-[280px] rounded-dm-md bg-dm-surface-container-low overflow-hidden">
              <ProductImage src={product.imageUrl} alt={product.name} />
            </div>
            {product.category && (
              <p className="font-dm-ko text-[11px] font-medium text-dm-on-surface-variant">{product.category.name}</p>
            )}
            <p className="font-dm-ko text-sm text-dm-on-surface line-clamp-1">{product.name}</p>
            <p className="font-dm-ko text-sm text-dm-on-surface">{product.price.toLocaleString()}원</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
