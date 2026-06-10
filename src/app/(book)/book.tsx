import SegmentedControl from "@react-native-segmented-control/segmented-control";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

const campSauna = require("@/assets/camp-sauna.png");
const privateSauna = require("@/assets/private-sauna.webp");

const ACCENT = "#C45C26";
const BG = "#1A1A1A";
const CARD_BG = "#2A2A2A";
const TEXT_PRIMARY = "#F5F0EB";
const TEXT_SECONDARY = "#B8AFA6";

type SessionType = "community" | "buyout";

const TIMES_COMMUNITY = ["9:00", "10:30", "12:00", "13:30", "15:00", "16:30"];
const TIMES_BUYOUT = ["9:00", "12:00", "15:00"];

const SESSION_INFO = {
  community: {
    title: "Camp Sauna Sessions",
    description:
      "Come with friends or meet new friends in the sauna! Either choose to use just the sauna or join in on contrast therapy, ebbing between the sauna and the cold waters of the Puget Sound.",
    image: campSauna,
  },
  buyout: {
    title: "Private Sauna",
    description:
      "Enjoy an exclusive 2.5-hour private sauna experience where you'll have time to relax, reset, and reconnect. Perfect for individuals, couples, or groups seeking a wellness escape.",
    image: privateSauna,
  },
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

const DAY_LABELS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

export default function BookScreen() {
  const router = useRouter();
  const today = new Date();

  const [sessionType, setSessionType] = useState<SessionType>("community");
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [seats, setSeats] = useState(1);

  const info = SESSION_INFO[sessionType];
  const daysInMonth = getDaysInMonth(currentYear, currentMonth);
  const firstDay = getFirstDayOfWeek(currentYear, currentMonth);
  const times = sessionType === "community" ? TIMES_COMMUNITY : TIMES_BUYOUT;
  const price = sessionType === "community" ? 32 * seats : 400;

  const isToday = (day: number) =>
    day === today.getDate() &&
    currentMonth === today.getMonth() &&
    currentYear === today.getFullYear();

  const isPast = (day: number) => {
    const d = new Date(currentYear, currentMonth, day);
    const t = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    return d < t;
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
    setSelectedDay(null);
    setSelectedTime(null);
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
    setSelectedDay(null);
    setSelectedTime(null);
  };

  const calendarCells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) calendarCells.push(null);
  for (let d = 1; d <= daysInMonth; d++) calendarCells.push(d);

  const canBook = selectedDay !== null && selectedTime !== null;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: BG }}
      contentInsetAdjustmentBehavior="automatic"
      contentContainerStyle={{ paddingBottom: 40 }}
    >
      {/* Header image */}
      <Image
        source={info.image}
        style={{ width: "100%", aspectRatio: 16 / 9 }}
        contentFit="cover"
      />

      {/* Content */}
      <View style={{ paddingHorizontal: 20, gap: 24, marginTop: 24 }}>
        {/* Title + description */}
        <View style={{ gap: 12 }}>
          <Text style={{ fontSize: 26, fontWeight: "800", color: TEXT_PRIMARY }}>
            {info.title}
          </Text>
          <Text style={{ fontSize: 15, color: TEXT_SECONDARY, lineHeight: 22 }}>
            {info.description}
          </Text>
        </View>

        {/* Session type toggle */}
        <SegmentedControl
          values={["Community", "Private"]}
          selectedIndex={sessionType === "community" ? 0 : 1}
          onChange={({ nativeEvent }) => {
            setSessionType(nativeEvent.selectedSegmentIndex === 0 ? "community" : "buyout");
            setSelectedTime(null);
            setSeats(1);
          }}
          appearance="dark"
        />

        {/* Calendar */}
        <View
          style={{
            backgroundColor: CARD_BG,
            borderRadius: 16,
            borderCurve: "continuous",
            padding: 16,
            gap: 12,
          }}
        >
          {/* Month header */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text style={{ color: TEXT_PRIMARY, fontSize: 17, fontWeight: "700" }}>
              {MONTH_NAMES[currentMonth]} {currentYear}
            </Text>
            <View style={{ flexDirection: "row", gap: 16 }}>
              <Pressable onPress={prevMonth} hitSlop={12}>
                <Text style={{ color: ACCENT, fontSize: 18, fontWeight: "700" }}>
                  {"<"}
                </Text>
              </Pressable>
              <Pressable onPress={nextMonth} hitSlop={12}>
                <Text style={{ color: ACCENT, fontSize: 18, fontWeight: "700" }}>
                  {">"}
                </Text>
              </Pressable>
            </View>
          </View>

          {/* Day labels */}
          <View style={{ flexDirection: "row" }}>
            {DAY_LABELS.map((d) => (
              <Text
                key={d}
                style={{
                  flex: 1,
                  textAlign: "center",
                  color: TEXT_SECONDARY,
                  fontSize: 11,
                  fontWeight: "600",
                  letterSpacing: 0.5,
                }}
              >
                {d}
              </Text>
            ))}
          </View>

          {/* Calendar grid */}
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {calendarCells.map((day, i) => {
              const selected = day !== null && selectedDay === day;
              const todayCell = day !== null && isToday(day);
              const past = day !== null && isPast(day);

              return (
                <Pressable
                  key={i}
                  style={{
                    width: "14.28%",
                    height: 42,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    if (day !== null && !past) {
                      setSelectedDay(day);
                      setSelectedTime(null);
                    }
                  }}
                  disabled={day === null || past}
                >
                  <View
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: 18,
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: selected ? ACCENT : "transparent",
                      borderWidth: todayCell && !selected ? 1.5 : 0,
                      borderColor: ACCENT,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 15,
                        color: selected
                          ? "#fff"
                          : past
                            ? "#555"
                            : TEXT_PRIMARY,
                        fontWeight: selected ? "700" : "400",
                        fontVariant: ["tabular-nums"],
                      }}
                    >
                      {day ?? ""}
                    </Text>
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Time selection */}
        {selectedDay !== null && (
          <View style={{ gap: 12 }}>
            <Text style={{ color: TEXT_PRIMARY, fontSize: 16, fontWeight: "700" }}>
              Select a time
            </Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 10 }}>
              {times.map((time) => {
                const active = selectedTime === time;
                return (
                  <Pressable
                    key={time}
                    onPress={() => setSelectedTime(time)}
                    style={{
                      backgroundColor: active ? ACCENT : CARD_BG,
                      paddingVertical: 12,
                      paddingHorizontal: 20,
                      borderRadius: 10,
                      borderCurve: "continuous",
                      borderWidth: active ? 0 : 1,
                      borderColor: "#3A3A3A",
                    }}
                  >
                    <Text
                      style={{
                        color: active ? "#fff" : TEXT_SECONDARY,
                        fontWeight: "600",
                        fontSize: 15,
                      }}
                    >
                      {time}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {/* Seat stepper */}
        {sessionType === "community" && selectedTime !== null && (
          <View style={{ gap: 12 }}>
            <Text style={{ color: TEXT_PRIMARY, fontSize: 16, fontWeight: "700" }}>
              Number of seats
            </Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 20 }}>
              <Pressable
                onPress={() => setSeats(Math.max(1, seats - 1))}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: CARD_BG,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#3A3A3A",
                }}
              >
                <Text style={{ color: TEXT_PRIMARY, fontSize: 22, fontWeight: "600" }}>
                  -
                </Text>
              </Pressable>
              <Text
                style={{
                  color: TEXT_PRIMARY,
                  fontSize: 24,
                  fontWeight: "800",
                  fontVariant: ["tabular-nums"],
                  minWidth: 30,
                  textAlign: "center",
                }}
              >
                {seats}
              </Text>
              <Pressable
                onPress={() => setSeats(Math.min(12, seats + 1))}
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 22,
                  backgroundColor: CARD_BG,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1,
                  borderColor: "#3A3A3A",
                }}
              >
                <Text style={{ color: TEXT_PRIMARY, fontSize: 22, fontWeight: "600" }}>
                  +
                </Text>
              </Pressable>
            </View>
            <Text style={{ color: TEXT_SECONDARY, fontSize: 12 }}>
              Max 12 guests per session
            </Text>
          </View>
        )}

        {/* Booking summary + CTA */}
        {canBook && (
          <View
            style={{
              backgroundColor: CARD_BG,
              borderRadius: 16,
              borderCurve: "continuous",
              padding: 20,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View>
              <Text style={{ color: TEXT_PRIMARY, fontSize: 16, fontWeight: "700" }}>
                {sessionType === "community"
                  ? `${seats} Seat${seats > 1 ? "s" : ""}`
                  : "Private Buyout"}
              </Text>
              <Text style={{ color: TEXT_SECONDARY, fontSize: 13, marginTop: 4 }}>
                {selectedTime}, {MONTH_NAMES[currentMonth]} {selectedDay},{" "}
                {currentYear}
              </Text>
            </View>
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/checkout",
                  params: {
                    type: sessionType,
                    date: `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}-${String(selectedDay).padStart(2, "0")}`,
                    time: selectedTime,
                    seats: String(seats),
                    price: String(price),
                  },
                })
              }
              style={{
                backgroundColor: ACCENT,
                paddingHorizontal: 24,
                paddingVertical: 14,
                borderRadius: 10,
                borderCurve: "continuous",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "800", fontSize: 16 }}>
                Book ${price.toFixed(2)}
              </Text>
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
