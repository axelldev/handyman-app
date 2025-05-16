import Logo from "@/assets/images/logo.png";
import useLocations from "@/hooks/useLocations";
import { Location } from "@/types/location";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  useDrawerStatus,
} from "@react-navigation/drawer";
import { Href, router, usePathname } from "expo-router";
import { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const logoImage = Image.resolveAssetSource(Logo).uri;

export default function DrawerContent(props: DrawerContentComponentProps) {
  const { getLocations } = useLocations();
  const [locations, setLocations] = useState<Location[]>([]);
  const isDrawerOpen = useDrawerStatus() === "open";
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (!isDrawerOpen) return;
    getLocations().then(setLocations);
  }, [getLocations, isDrawerOpen]);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView>
        <Image
          source={{ uri: logoImage }}
          style={{ width: 100, height: 100 }}
        />
        <View>
          <DrawerItemList {...props} />
        </View>
        <View
          style={{
            marginTop: 8,
            paddingTop: 8,
            borderBlockColor: "#ccc",
            borderTopWidth: 1,
          }}
        >
          {locations.map((location) => {
            const path: Href = `/locations/${location.id}`;
            const isActive = pathname === path;
            return (
              <DrawerItem
                key={location.id}
                label={location.name}
                onPress={() => router.navigate(path)}
                focused={isActive}
                {...props}
              />
            );
          })}
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          paddingHorizontal: 16,
          paddingTop: 16,
          paddingBottom: insets.bottom,
          borderTopWidth: 1,
          borderTopColor: "lightgray",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            color: "gray",
          }}
        >
          Copyright @axelldev {new Date().getFullYear()}
        </Text>
      </View>
    </View>
  );
}
