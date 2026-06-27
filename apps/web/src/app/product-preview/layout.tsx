/**
 * 정적 프리뷰(/product-preview) 전용 레이아웃.
 * (shop) 그룹의 실제 상품 상세 페이지를 거치지 않고, Figma 디자인을 그대로 검증하기 위한 독립 라우트다.
 */
export default function ProductPreviewLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="min-h-screen bg-dm-surface font-dm-body">
      {children}
    </main>
  );
}
