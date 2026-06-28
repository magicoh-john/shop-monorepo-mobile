import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
import { auth } from '@/auth';
import { getCart, buildCartKey } from '@/lib/cart';
import Header from "@/components/layout/Header";
import BottomNav from "@/components/layout/BottomNav";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect('/login');
  }

  const cookieStore = await cookies();
  const sessionId = cookieStore.get('cart_session')?.value;
  const key = buildCartKey(session.user?.id, sessionId);
  const items = await getCart(key);
  const totalCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 pb-16 md:pb-0">{children}</main>
      <BottomNav totalCount={totalCount} />
    </div>
  );
}
