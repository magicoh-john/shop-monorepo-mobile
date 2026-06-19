
import { useEffect, useState } from "react";
import { View, Text, FlatList, Pressable } from "react-native";
import { apiFetch } from "@/src/lib/api";
import { CartItem } from "@my-project/types";

export default function CartScreen() {
  const [items, setItems] = useState<CartItem[]>([]);

  const load = async () => {
    const res = await apiFetch("/api/cart");
    const json = await res.json();
    setItems(json.items);
  };

  useEffect(() => {
    load();
  }, []);

  const removeItem = async (productId: string) => {
    await apiFetch("/api/cart", {
      method: "DELETE",
      body: JSON.stringify({ productId }),
    });
    load();
  };

  return (
    <FlatList
      data={items}
      keyExtractor={(item) => item.productId}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      renderItem={({ item }) => (
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text>
            {item.productName} x {item.quantity}
          </Text>
          <Pressable onPress={() => removeItem(item.productId)}>
            <Text style={{ color: "red" }}>삭제</Text>
          </Pressable>
        </View>
      )}
      ListEmptyComponent={<Text>장바구니가 비어 있습니다</Text>}
    />
  );
}