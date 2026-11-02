import { colors, fonts } from "@/constants/theme";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Easing, StyleSheet, View } from "react-native";

// What I'm up to right now, in Pacific time. Priority: one-off events (exams, deadlines),
// then weekly class meetings from the syllabi, then a rough daily routine. Fall 2026 sources:
// EECS 144/244 Lecture 1 slides (lecture, lab, discussion), eecs189.org/fa26 (exams, homework),
// and the Arch 130 bCourses syllabus (lecture, section 1-2pm Thursday, assignments due at noon).

// Each status is a few lines; the site rotates through them every 10 seconds.
type Lines = string | string[];
type Event = { start: string; end: string; text: Lines }; // ISO times with offset
type Weekly = { days: number[]; start: string; end: string; text: Lines; skip?: string[] }; // 0 = Sunday, "HH:MM", skip: YYYY-MM-DD

// What each class is covering, by the week's first lecture date (from the syllabi).
const CS189_TOPICS: [string, string][] = [
  ["2026-10-27", "transformers"],
  ["2026-11-03", "large language models"],
  ["2026-11-10", "attention methods"],
  ["2026-11-12", "MDPs and reinforcement learning"],
  ["2026-11-24", "fine-tuning, LoRA, and distillation"],
  ["2026-12-01", "diffusion models"],
];
const ARCH_THEMES: [string, string][] = [
  ["2026-10-27", "critical regionalism and landscape urbanism"],
  ["2026-11-03", "ecological modernism"],
  ["2026-11-10", "architecture and labor"],
  ["2026-11-17", "design and embodiment"],
  ["2026-12-01", "radical approaches to community design"],
];
const current = (list: [string, string][], date: string) =>
  [...list].reverse().find(([from]) => date >= from)?.[1] ?? list[0][1];

const EVENTS: Event[] = [
  // EECS 144 midterm: Tuesday Nov 3, assumed to be in the lecture slot.
  { start: "2026-10-30T12:00:00-07:00", end: "2026-11-03T15:30:00-08:00", text: [
    "Studying for my EECS 144 midterm on Tuesday",
    "Reviewing BDDs and SAT solving",
    "Practicing equivalence checking problems",
  ] },
  { start: "2026-11-03T15:30:00-08:00", end: "2026-11-03T17:00:00-08:00", text: "Taking the EECS 144 midterm" },
  // CS 189 homework, due Fridays: the night before.
  ...[
    ["2026-11-12", "HW4 part 1"],
    ["2026-11-19", "HW4 part 2"],
    ["2026-12-03", "HW5 part 1"],
    ["2026-12-10", "HW5 part 2"],
  ].map(([day, hw]) => ({ start: `${day}T18:00:00-08:00`, end: `${day}T23:59:00-08:00`, text: [`Finishing CS 189 ${hw}`, "Debugging a PyTorch training loop", "Checking my gradients by hand"] })),
  // CS 189 final: Thu Dec 17, 11:30 AM to 2:30 PM.
  { start: "2026-12-14T08:00:00-08:00", end: "2026-12-17T11:30:00-08:00", text: ["Studying for the CS 189 final", "Re-deriving backprop from scratch", "Working through old CS 189 exams"] },
  { start: "2026-12-17T11:30:00-08:00", end: "2026-12-17T14:30:00-08:00", text: "Taking the CS 189 final" },
  // Arch 130 assignments, due at noon: the evening before.
  ...[
    ["2026-11-04", "creative assignment"],
    ["2026-11-09", "reading response"],
    ["2026-11-18", "creative assignment"],
    ["2026-11-30", "final reflection"],
  ].map(([day, what]) => ({ start: `${day}T19:00:00-08:00`, end: `${day}T23:59:00-08:00`, text: [`Writing my Arch 130 ${what}`, "Sketching in my course journal", "Doing the week's Arch 130 reading"] })),
  // Holidays and no-class days.
  { start: "2026-11-11T00:00:00-08:00", end: "2026-11-12T00:00:00-08:00", text: "Veterans Day, no class" },
  { start: "2026-11-25T00:00:00-08:00", end: "2026-11-30T00:00:00-08:00", text: ["Home for Thanksgiving", "Watching Blade Runner for Arch 130", "Eating too much"] },
];

// Weekly class meetings, until the last day of instruction.
const CLASSES_END = "2026-12-05T00:00:00-08:00";
const WEEKLY: Weekly[] = [
  { days: [2, 4], start: "14:00", end: "15:30", skip: ["2026-11-10"], text: [
    "In Arch 130 lecture (architectural design theory)",
    "Learning about {arch}",
    "Taking notes by hand (no laptops in Arch 130)",
  ] },
  { days: [4], start: "13:00", end: "14:00", text: ["In Arch 130 discussion", "Debating {arch}", "Arguing about architecture"] },
  { days: [2, 4], start: "15:30", end: "17:00", text: [
    "In EECS 144 lecture (design automation)",
    "Learning formal verification",
    "Learning how chips get verified",
  ] },
  { days: [4], start: "10:00", end: "12:00", text: ["In EECS 144 lab", "Writing SystemVerilog assertions", "Running a formal verification tool"] },
  { days: [5], start: "10:00", end: "11:00", text: ["In EECS 144 discussion", "Working through verification problems", "Asking questions about model checking"] },
];

function pacific(now: Date) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Los_Angeles",
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(now);
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  const date = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Los_Angeles" }).format(now); // YYYY-MM-DD
  const day = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(get("weekday"));
  return { day, date, minutes: Number(get("hour")) * 60 + Number(get("minute")) };
}

const toMinutes = (hhmm: string) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3));

const SEMESTER_END = "2026-12-19T00:00:00-08:00"; // after finals: lab on weekdays

function routine(day: number, minutes: number, inSemester: boolean): string[] {
  const hour = minutes / 60;
  const weekday = day >= 1 && day <= 5;
  if (hour < 7.5) return ["Sleeping", "Asleep (probably)", "Recharging"];
  if (hour < 10) return ["At the gym", "Lifting", "Working out before the day starts"];
  if (weekday && (day === 1 || day === 3 || !inSemester) && hour < 15)
    return ["At Berkeley Lab", "Automating laser experiments", "Tuning the gantry scheduler"];
  if (!weekday)
    return hour < 18
      ? ["Working on side projects", "Shipping ARES updates", "Learning about {cs189}"]
      : ["Off the clock", "Out with friends", "Recharging for the week"];
  if (hour < 17)
    return inSemester
      ? ["Studying", "Learning about {cs189}", "Doing readings on {arch}"]
      : ["Working on side projects", "Shipping ARES updates", "Reading papers"];
  if (hour < 23) return ["Studying or building side projects", "Learning about {cs189}", "Working on ARES"];
  return ["Winding down", "Reading before bed", "Planning tomorrow"];
}

function currentLines(now: Date): string[] {
  const { day, date, minutes } = pacific(now);
  const fill = (lines: Lines) =>
    (Array.isArray(lines) ? lines : [lines]).map((l) =>
      l.replace("{cs189}", current(CS189_TOPICS, date)).replace("{arch}", current(ARCH_THEMES, date))
    );
  const event = EVENTS.find((e) => now >= new Date(e.start) && now < new Date(e.end));
  if (event) return fill(event.text);
  if (now < new Date(CLASSES_END)) {
    const cls = WEEKLY.find((w) => w.days.includes(day) && !w.skip?.includes(date) && minutes >= toMinutes(w.start) && minutes < toMinutes(w.end));
    if (cls) return fill(cls.text);
  }
  return fill(routine(day, minutes, now < new Date(SEMESTER_END)));
}

const ROTATE_MS = 10_000;

// Pulsing green dot plus the current status. The text is filled in after mount, because the
// static HTML is built ahead of time and can't know the visitor's current time.
export default function Status() {
  const [text, setText] = useState("");
  const pulse = useRef(new Animated.Value(0)).current;
  const fade = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    let index = 0;
    const lineFor = () => {
      const lines = currentLines(new Date());
      return lines[index % lines.length];
    };
    setText(lineFor());
    // Every 10 seconds, fade to the next line for whatever's happening now.
    const timer = setInterval(() => {
      index += 1;
      Animated.timing(fade, { toValue: 0, duration: 250, useNativeDriver: false }).start(() => {
        setText(lineFor());
        Animated.timing(fade, { toValue: 1, duration: 250, useNativeDriver: false }).start();
      });
    }, ROTATE_MS);

    const reduceMotion = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const loop = Animated.loop(
      Animated.timing(pulse, { toValue: 1, duration: 1800, easing: Easing.out(Easing.ease), useNativeDriver: false })
    );
    if (!reduceMotion) loop.start();
    return () => {
      clearInterval(timer);
      loop.stop();
    };
  }, [pulse, fade]);

  const scale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 2.6] });
  const opacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0] });

  return (
    <View style={styles.row}>
      <View style={styles.dotWrap}>
        <Animated.View style={[styles.halo, { transform: [{ scale }], opacity }]} />
        <View style={styles.dot} />
      </View>
      <Animated.Text style={[styles.text, { opacity: fade }]}>{text || "\u00A0"}</Animated.Text>
    </View>
  );
}

const GREEN = "#10B981";

const styles = StyleSheet.create({
  row: { flexDirection: "row", alignItems: "center", gap: 8 },
  dotWrap: { width: 8, height: 8, alignItems: "center", justifyContent: "center" },
  halo: { position: "absolute", width: 8, height: 8, borderRadius: 4, backgroundColor: GREEN },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: GREEN },
  text: { flexShrink: 1, fontFamily: fonts.sans, fontSize: 14, color: colors.text },
});
