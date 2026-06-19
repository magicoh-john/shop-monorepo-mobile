import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { View, Text, Image, Pressable } from "react-native";
import { Product, CartItem } from "@my-project/types";
import { apiFetch } from "@/src/lib/api";

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [added, setAdded] = useState(false);

  const { data } = useQuery({
    queryKey: ["products", id],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.EXPO_PUBLIC_API_URL}/api/products`,
      );
      const json = await res.json();
      return (json.items as Product[]).find((p) => p.id === id);
    },
  });

  if (!data) return <Text>로딩 중...</Text>;

  const addToCart = async () => {
    setAdded(false);
    await apiFetch("/api/cart", {
      method: "POST",
      body: JSON.stringify({
        productId: data.id,
        productName: data.name,
        price: data.price,
        quantity: 1,
        imageUrl: data.imageUrl,
      } satisfies CartItem),
    });
    setAdded(true);
  };

  return (
    <View style={{ padding: 16, gap: 12 }}>
      {data.imageUrl ? (
        <Image
          source={{ uri: data.imageUrl }}
          style={{ width: "100%", height: 240, borderRadius: 8 }}
        />
      ) : null}
      <Text style={{ fontSize: 20, fontWeight: "bold" }}>{data.name}</Text>
      <Text style={{ fontSize: 18 }}>{data.price.toLocaleString()}원</Text>
      <Text style={{ color: "#666" }}>{data.description}</Text>

      <Pressable
        onPress={addToCart}
        style={{
          backgroundColor: "#111",
          padding: 14,
          borderRadius: 8,
          alignItems: "center",
        }}
      >
        <Text style={{ color: "#fff", fontWeight: "600" }}>담기</Text>
      </Pressable>
      {added ? <Text style={{ color: "green" }}>장바구니에 담았습니다</Text> : null}

      <Pressable onPress={() => router.push("/cart")}>
        <Text style={{ color: "#1a73e8" }}>장바구니 보기</Text>
      </Pressable>
    </View>
  );
}