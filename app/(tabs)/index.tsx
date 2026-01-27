import holidayMM from "@/assets/holidays.json";

import holidayJP from "@/assets/holidaysJP.json";

import { GlassCard } from "@/components/GlassCard";

import { router } from "expo-router";

import React, { useMemo, useState } from "react";

import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";

export default function HolidayList() {
  const [country, setCountry] = useState<"MM" | "JP">("MM");

  const upcomingHolidays = useMemo(() => {
    const today = new Date();

    today.setHours(0, 0, 0, 0);

    // Switch data source based on state

    const currentData = country === "MM" ? holidayMM : holidayJP;

    return currentData.response.holidays

      .filter((h) => new Date(h.date.iso) >= today)

      .sort(
        (a, b) =>
          new Date(a.date.iso).getTime() - new Date(b.date.iso).getTime(),
      );
  }, [country]);

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const isHero = index === 0;

    const handlePress = () => {
      // We encode the urlid because it contains a "/"

      const encodedId = encodeURIComponent(item.urlid);

      console.log("Navigating to details for ID:", encodedId);

      router.push({
        pathname: "/details/[id]",

        params: {
          id: encodedId,

          name: item.name, // You can pass extra data as params to avoid re-fetching

          desc: item.description,
        },
      });
    };

    return (
      <GlassCard
        style={[styles.card, isHero && styles.heroCard]}
        isInteractive={true}
        hero={isHero}
        onPress={handlePress}
      >
        {/* 1. Use ternary for the badge */}

        {isHero ? (
          <View style={styles.nextBadge}>
            <Text style={styles.badgeText}>UPCOMING NEXT</Text>
          </View>
        ) : null}

        <View style={styles.row}>
          <View style={styles.dateBox}>
            {/* 2. Ensure numbers are strings and wrapped tightly */}

            <Text style={styles.day}>
              {String(new Date(item.date.iso).getDate())}
            </Text>

            <Text style={styles.month}>
              {new Date(item.date.iso)

                .toLocaleString("en-US", { month: "short" })

                .toUpperCase()}
            </Text>
          </View>

          <View style={styles.contentBox}>
            <Text style={[styles.name, isHero && styles.heroName]}>
              {item.name || "Unnamed Holiday"}
            </Text>

            {/* 3. Check if type array exists before accessing index [0] */}

            <Text style={styles.type}>
              {item.type && item.type.length > 0
                ? item.type[0]
                : "Public Holiday"}
            </Text>
          </View>
        </View>

        {/* 4. Use ternary for the description */}

        {isHero ? (
          <Text style={styles.desc} numberOfLines={3}>
            {item.description
              ? item.description
              : "No description available for this holiday."}
          </Text>
        ) : null}
      </GlassCard>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Country Switcher */}

      <View style={styles.tabContainer}>
        <Pressable
          onPress={() => setCountry("MM")}
          style={[styles.tab, country === "MM" && styles.activeTab]}
        >
          <Text
            style={[styles.tabText, country === "MM" && styles.activeTabText]}
          >
            Myanmar
          </Text>
        </Pressable>

        <Pressable
          onPress={() => setCountry("JP")}
          style={[styles.tab, country === "JP" && styles.activeTab]}
        >
          <Text
            style={[styles.tabText, country === "JP" && styles.activeTabText]}
          >
            Japan
          </Text>
        </Pressable>
      </View>

      <FlatList
        data={upcomingHolidays}
        keyExtractor={(item) => item.urlid + item.date.iso}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingHorizontal: 20,

    paddingTop: 120, // Starts below the status bar mask

    paddingBottom: 160, // Ends above the tab bar mask
  },

  card: {
    marginBottom: 16,

    padding: 20,

    borderRadius: 24,
  },

  heroCard: {
    backgroundColor: "rgba(255, 255, 255, 0.4)", // Brighter for the hero item

    borderWidth: 1.5,

    borderColor: "#007AFF",
  },

  nextBadge: {
    backgroundColor: "#007AFF",

    alignSelf: "flex-start",

    paddingHorizontal: 10,

    paddingVertical: 4,

    borderRadius: 8,

    marginBottom: 12,
  },

  badgeText: {
    color: "#FFF",

    fontSize: 10,

    fontWeight: "900",

    letterSpacing: 1,
  },

  row: {
    flexDirection: "row",

    alignItems: "center",
  },

  dateBox: {
    alignItems: "center",

    justifyContent: "center",

    paddingRight: 15,

    borderRightWidth: 1,

    borderRightColor: "rgba(0,0,0,0.05)",
  },

  day: {
    fontSize: 28,

    fontWeight: "800",

    color: "#1A1A1B",
  },

  month: {
    fontSize: 12,

    fontWeight: "600",

    color: "#007AFF",
  },

  contentBox: {
    paddingLeft: 15,

    flex: 1,
  },

  name: {
    fontSize: 16,

    fontWeight: "700",

    color: "#1A1A1B",
  },

  heroName: {
    fontSize: 22,
  },

  type: {
    fontSize: 12,

    color: "#666",

    marginTop: 2,
  },

  desc: {
    marginTop: 15,

    fontSize: 14,

    color: "#444",

    lineHeight: 20,

    fontStyle: "italic",
  },

  tabContainer: {
    flexDirection: "row",

    marginTop: 120, // Adjust based on your header/mask

    marginHorizontal: 20,

    backgroundColor: "rgba(255,255,255,0.3)",

    borderRadius: 16,

    padding: 4,

    borderWidth: 1,

    borderColor: "rgba(255,255,255,0.2)",
  },

  tab: {
    flex: 1,

    paddingVertical: 10,

    alignItems: "center",

    borderRadius: 12,
  },

  activeTab: {
    backgroundColor: "#fff",

    shadowColor: "#000",

    shadowOffset: { width: 0, height: 2 },

    shadowOpacity: 0.1,

    shadowRadius: 4,

    elevation: 3,
  },

  tabText: {
    fontSize: 14,

    fontWeight: "600",

    color: "#666",
  },

  activeTabText: {
    color: "#007AFF",
  },
});
