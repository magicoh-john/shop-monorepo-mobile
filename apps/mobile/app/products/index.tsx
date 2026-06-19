
import { FlatList, Text, View, Image, Pressable } from "react-native";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import { Product } from "@my-project/types";

async function fetchProducts() {
  const res = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/products`);
  const json = await res.json();
  return json.items as Product[];
}

export default function ProductListScreen() {
  const router = useRouter();
  const { data, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <Text>로딩 중...</Text>;

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ padding: 16, gap: 12 }}
      renderItem={({ item }) => (
        <Pressable
          onPress={() => router.push({ pathname: "/products/[id]", params: { id: item.id } })}
          style={{
            flexDirection: "row",
            gap: 12,
            borderBottomWidth: 1,
            borderColor: "#eee",
            paddingBottom: 12,
          }}
        >
          {item.imageUrl ? (
            <Image
              source={{ uri: item.imageUrl }}
              style={{ width: 64, height: 64, borderRadius: 8 }}
            />
          ) : null}
          <View>
            <Text style={{ fontWeight: "600" }}>{item.name}</Text>
            <Text>{item.price.toLocaleString()}원</Text>
          </View>
        </Pressable>
      )}
    />
  );
}