import { cookies } from "next/headers";
import { auth } from "@/auth";
import { getCart, buildCartKey } from "@/lib/cart";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import BottomNav from "@/components/layout/BottomNav";

export default async function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const cookieStore = await cookies();
  const sessionId = cookieStore.get("cart_session")?.value;
  const key = buildCartKey(session?.user?.id, sessionId);
  const items = await getCart(key);
  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      {/* pb-16: BottomNav 높이만큼 하단 여백 (모바일) */}
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <div className="hidden md:block">
        <Footer />
      </div>
      <BottomNav totalCount={totalCount} />
    </div>
  );
}
