import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getCart, setCart, clearCart, type CartItem } from "@/lib/cart";
// 추가
import { jwtVerify } from "jose";

// 추가 시작
const secret = new TextEncoder().encode(process.env.AUTH_SECRET!);


const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,POST,DELETE,PATCH,OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return new Response(null, { headers: CORS_HEADERS });
}

// Authorization: Bearer <토큰> 헤더를 풀어서 user id를 꺼내는 함수
async function getMobileUserId(req: NextRequest): Promise<string | null> {
  const authHeader = req.headers.get("authorization");
  if (!authHeader?.startsWith("Bearer ")) return null;
  try {
    const { payload } = await jwtVerify(authHeader.slice(7), secret);
    return (payload.sub as string) ?? null;
  } catch {
    return null;
  }
}
// 추가

function resolveKey(
  userId: string | null | undefined,
  req: NextRequest,
): string {
  if (userId) return `cart:user:${userId}`;
  const sessionId = req.cookies.get("cart_session")?.value;
  return sessionId ? `cart:session:${sessionId}` : "";
}

// GET /api/cart
export async function GET(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id ?? (await getMobileUserId(req)); // ← 추가
  const key = resolveKey(userId, req);
  const items = await getCart(key);

  const res = NextResponse.json({ items });

  // 비로그인 첫 접근 시 세션 ID 발급
  if (!userId && !req.cookies.get("cart_session")) {
    res.cookies.set("cart_session", crypto.randomUUID(), {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  }

  return res;
}

// POST /api/cart — 상품 추가 Api End point
export async function POST(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id ?? (await getMobileUserId(req)); // ← 추가

  let sessionId = req.cookies.get("cart_session")?.value;
  let newSessionId: string | undefined;

  if (!userId && !sessionId) {
    newSessionId = crypto.randomUUID();
    sessionId = newSessionId;
  }

  const key = userId
    ? `cart:user:${userId}`
    : sessionId
      ? `cart:session:${sessionId}`
      : "";

  if (!key)
    return NextResponse.json({ error: "Invalid session" }, { status: 400 });

  const item: CartItem = await req.json();
  const items = await getCart(key);

  const existing = items.find((i) => i.productId === item.productId);
  if (existing) {
    existing.quantity += item.quantity;
  } else {
    items.push(item);
  }

  await setCart(key, items);

  const res = NextResponse.json({ items });
  if (newSessionId) {
    res.cookies.set("cart_session", newSessionId, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  }
  return res;
}

// DELETE /api/cart — 상품 삭제 또는 전체 비우기
export async function DELETE(req: NextRequest) {
  const session = await auth();
  const userId = session?.user?.id ?? (await getMobileUserId(req)); // ← 추가
  const key = resolveKey(userId, req);
  if (!key) return NextResponse.json({ items: [] });

  const url = new URL(req.url);

  if (url.searchParams.get("clear") === "true") {
    await clearCart(key);
    return NextResponse.json({ items: [] });
  }

  const { productId } = await req.json();
  const items = await getCart(key);
  const updated = items.filter((i) => i.productId !== productId);
  await setCart(key, updated);

  return NextResponse.json({ items: updated });
}

// PATCH /api/cart — 수량 변경
export async function PATCH(req: NextRequest) {
  const session = await auth();  
  const userId = session?.user?.id ?? (await getMobileUserId(req)); // ← 추가
  const key = resolveKey(userId, req);
  if (!key) return NextResponse.json({ items: [] });

  const { productId, quantity } = await req.json();
  const items = await getCart(key);
  const updated = items.map((i) =>
    i.productId === productId ? { ...i, quantity } : i,
  );
  await setCart(key, updated);

  return NextResponse.json({ items: updated });
}
