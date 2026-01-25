import { Ionicons } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { BlurView } from "expo-blur";
import { LinearGradient } from "expo-linear-gradient";
import { TabList, Tabs, TabSlot, TabTrigger } from "expo-router/ui";
import { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ImageBackground,
  Pressable,
  StyleSheet,
  View,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function RootLayout() {
  const [tabWidth, setTabWidth] = useState(0);
  const translateX = useRef(new Animated.Value(0)).current;

  // Helper to handle animation
  const handlePress = (index: number) => {
    Animated.spring(translateX, {
      toValue: index * tabWidth,
      useNativeDriver: true,
    }).start();
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{
          uri: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
        }}
        style={StyleSheet.absoluteFill}
        blurRadius={18}
      />

      <Tabs>
        {/* --- THE MASKED AREA --- */}
        <MaskedView
          style={{ flex: 1 }}
          maskElement={
            <LinearGradient
              // Transparent = Hidden, Black = Visible
              colors={["transparent", "black", "black", "transparent"]}
              locations={[0.05, 0.15, 0.82, 0.91]}
              style={StyleSheet.absoluteFill}
            />
          }
        >
          <TabSlot />
        </MaskedView>

        {/* Keeping your bottom blur for extra glass depth */}
        <View style={styles.bottomEdgeContainer} pointerEvents="none">
          <MaskedView
            style={StyleSheet.absoluteFill}
            maskElement={
              <LinearGradient
                colors={["transparent", "black"]}
                style={StyleSheet.absoluteFill}
              />
            }
          >
            <BlurView
              intensity={100}
              tint="light"
              style={StyleSheet.absoluteFill}
            />
          </MaskedView>
        </View>

        {/* Tab Configuration */}
        <TabList style={{ display: "none" }}>
          <TabTrigger name="index" href="/" />
          <TabTrigger name="leave" href="/leave" />
          <TabTrigger name="reminder" href="/reminder" />
        </TabList>

        <View style={styles.tabBarWrapper}>
          <BlurView intensity={90} tint="light" style={styles.blurContainer}>
            <Animated.View
              style={[
                styles.bubble,
                {
                  width: tabWidth - 10,
                  transform: [{ translateX: Animated.add(translateX, 5) }],
                },
              ]}
            />
            <View
              style={styles.visualTabList}
              onLayout={(e) => setTabWidth(e.nativeEvent.layout.width / 3)} // Changed to 3
            >
              <TabTrigger name="index" asChild>
                <TabButton icon="calendar" onPress={() => handlePress(0)} />
              </TabTrigger>
              <TabTrigger name="leave" asChild>
                <TabButton icon="leaf" onPress={() => handlePress(1)} />
              </TabTrigger>
              <TabTrigger name="reminder" asChild>
                <TabButton
                  icon="notifications"
                  onPress={() => handlePress(2)}
                />
              </TabTrigger>
            </View>
          </BlurView>
        </View>
      </Tabs>
    </View>
  );
}

function TabButton({ icon, isFocused, ...props }: any) {
  return (
    <Pressable {...props} style={styles.button}>
      <Ionicons
        name={icon}
        size={24}
        color={isFocused ? "#007AFF" : "#8E8E93"}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bottomEdgeContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 120, // Covers the tab bar area beautifully
    zIndex: 1,
  },
  tabBarWrapper: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    width: "65%",
    height: 60,
    borderRadius: 30,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    zIndex: 20,
  },
  blurContainer: { flex: 1 },
  visualTabList: { flex: 1, flexDirection: "row", zIndex: 1 },
  button: { flex: 1, alignItems: "center", justifyContent: "center" },
  bubble: {
    position: "absolute",
    top: 5,
    bottom: 5,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    zIndex: 0,
  },
});
