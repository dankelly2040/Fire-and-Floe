import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ACCENT = "#C45C26";
const BG = "#1A1A1A";
const CARD_BG = "#2A2A2A";
const TEXT_PRIMARY = "#F5F0EB";
const TEXT_SECONDARY = "#B8AFA6";

type SessionType = "community" | "buyout";

const TIMES_COMMUNITY = ["9:00", "10:30", "12:00", "13:30", "15:00", "16:30"];
const TIMES_BUYOUT = ["9:00", "12:00", "15:00"];

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

const DAY_LABELS = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

export default function BookScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const today = new Date();

  const [sessionType, setSessionType] = useState<SessionType>("community");
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [seats, setSeats] = useState(1);

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
      style={[styles.container, { paddingTop: insets.top }]}
      contentContainerStyle={styles.content}
    >
      <Text style={styles.title}>Book a Session</Text>

      <View style={styles.typeToggle}>
        {(["community", "buyout"] as const).map((type) => (
          <Pressable
            key={type}
            style={[
              styles.typeBtn,
              sessionType === type && styles.typeBtnActive,
            ]}
            onPress={() => {
              setSessionType(type);
              setSelectedTime(null);
              setSeats(1);
            }}
          >
            <Text
              style={[
                styles.typeBtnText,
                sessionType === type && styles.typeBtnTextActive,
              ]}
            >
              {type === "community" ? "Community" : "Private Buyout"}
            </Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.calendar}>
        <View style={styles.calHeader}>
          <Pressable onPress={prevMonth}>
            <Text style={styles.calNav}>{"<"}</Text>
          </Pressable>
          <Text style={styles.calMonth}>
            {MONTH_NAMES[currentMonth]} {currentYear}
          </Text>
          <Pressable onPress={nextMonth}>
            <Text style={styles.calNav}>{">"}</Text>
          </Pressable>
        </View>

        <View style={styles.calDayLabels}>
          {DAY_LABELS.map((d) => (
            <Text key={d} style={styles.calDayLabel}>
              {d}
            </Text>
          ))}
        </View>

        <View style={styles.calGrid}>
          {calendarCells.map((day, i) => (
            <Pressable
              key={i}
              style={[
                styles.calCell,
                day !== null && selectedDay === day && styles.calCellSelected,
                day !== null && isToday(day) && styles.calCellToday,
              ]}
              onPress={() => {
                if (day !== null && !isPast(day)) {
                  setSelectedDay(day);
                  setSelectedTime(null);
                }
              }}
              disabled={day === null || isPast(day)}
            >
              <Text
                style={[
                  styles.calCellText,
                  day !== null && isPast(day) && styles.calCellTextPast,
                  day !== null &&
                    selectedDay === day &&
                    styles.calCellTextSelected,
                ]}
              >
                {day ?? ""}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {selectedDay !== null && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Select a Time</Text>
          <View style={styles.timeGrid}>
            {times.map((time) => (
              <Pressable
                key={time}
                style={[
                  styles.timeBtn,
                  selectedTime === time && styles.timeBtnActive,
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text
                  style={[
                    styles.timeBtnText,
                    selectedTime === time && styles.timeBtnTextActive,
                  ]}
                >
                  {time}
                </Text>
              </Pressable>
            ))}
          </View>
        </View>
      )}

      {sessionType === "community" && selectedTime !== null && (
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>Number of Seats</Text>
          <View style={styles.stepper}>
            <Pressable
              style={styles.stepperBtn}
              onPress={() => setSeats(Math.max(1, seats - 1))}
            >
              <Text style={styles.stepperBtnText}>-</Text>
            </Pressable>
            <Text style={styles.stepperValue}>{seats}</Text>
            <Pressable
              style={styles.stepperBtn}
              onPress={() => setSeats(Math.min(12, seats + 1))}
            >
              <Text style={styles.stepperBtnText}>+</Text>
            </Pressable>
          </View>
          <Text style={styles.seatsNote}>Max 12 guests per session</Text>
        </View>
      )}

      {canBook && (
        <View style={styles.summary}>
          <View>
            <Text style={styles.summaryLabel}>
              {sessionType === "community"
                ? `${seats} Seat${seats > 1 ? "s" : ""}`
                : "Private Buyout"}
            </Text>
            <Text style={styles.summaryDate}>
              {selectedTime}, {MONTH_NAMES[currentMonth]} {selectedDay},{" "}
              {currentYear}
            </Text>
          </View>
          <Pressable
            style={styles.checkoutBtn}
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
          >
            <Text style={styles.checkoutBtnText}>
              Book ${price.toFixed(2)}
            </Text>
          </Pressable>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  content: { paddingBottom: 40 },
  title: {
    fontSize: 28,
    fontWeight: "800",
    color: TEXT_PRIMARY,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  typeToggle: {
    flexDirection: "row",
    marginHorizontal: 20,
    marginTop: 20,
    backgroundColor: CARD_BG,
    borderRadius: 12,
    padding: 4,
  },
  typeBtn: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  typeBtnActive: { backgroundColor: ACCENT },
  typeBtnText: { color: TEXT_SECONDARY, fontWeight: "600", fontSize: 15 },
  typeBtnTextActive: { color: "#fff" },
  calendar: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 16,
  },
  calHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },
  calNav: { color: ACCENT, fontSize: 20, fontWeight: "700", padding: 8 },
  calMonth: { color: TEXT_PRIMARY, fontSize: 17, fontWeight: "700" },
  calDayLabels: { flexDirection: "row" },
  calDayLabel: {
    flex: 1,
    textAlign: "center",
    color: TEXT_SECONDARY,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 8,
  },
  calGrid: { flexDirection: "row", flexWrap: "wrap" },
  calCell: {
    width: "14.28%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  calCellToday: { borderWidth: 1, borderColor: ACCENT },
  calCellSelected: { backgroundColor: ACCENT },
  calCellText: { color: TEXT_PRIMARY, fontSize: 15 },
  calCellTextPast: { color: "#555" },
  calCellTextSelected: { color: "#fff", fontWeight: "700" },
  section: { marginHorizontal: 20, marginTop: 24 },
  sectionLabel: {
    color: TEXT_PRIMARY,
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 12,
  },
  timeGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  timeBtn: {
    backgroundColor: CARD_BG,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#3A3A3A",
  },
  timeBtnActive: { backgroundColor: ACCENT, borderColor: ACCENT },
  timeBtnText: { color: TEXT_SECONDARY, fontWeight: "600", fontSize: 15 },
  timeBtnTextActive: { color: "#fff" },
  stepper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  stepperBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: CARD_BG,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3A3A3A",
  },
  stepperBtnText: { color: TEXT_PRIMARY, fontSize: 22, fontWeight: "600" },
  stepperValue: { color: TEXT_PRIMARY, fontSize: 24, fontWeight: "800" },
  seatsNote: { color: TEXT_SECONDARY, fontSize: 12, marginTop: 8 },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 32,
    backgroundColor: CARD_BG,
    borderRadius: 16,
    padding: 20,
  },
  summaryLabel: { color: TEXT_PRIMARY, fontSize: 16, fontWeight: "700" },
  summaryDate: { color: TEXT_SECONDARY, fontSize: 13, marginTop: 4 },
  checkoutBtn: {
    backgroundColor: ACCENT,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 10,
  },
  checkoutBtnText: { color: "#fff", fontWeight: "800", fontSize: 16 },
});
