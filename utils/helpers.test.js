import { getTime, stringifyTime } from "./helpers";

// Get the current time in milliseconds
const currentTime = getTime()

// Conversions
const minute = 1000 * 60;
const hour = minute * 60;
const day = hour * 24;
const week = day * 7;
const month = day * 30;
const year = day * 365;

// Test Data
const td = {
  yearPlus: currentTime - (2 * year),
  yearOne: currentTime - year,
  monthPlus: currentTime - (3 * month),
  monthOne: currentTime - month,
  weekPlus: currentTime - (2 * week),
  weekOne: currentTime - week,
  dayPlus: currentTime - (6 * day),
  dayOne: currentTime - day,
  hourPlus: currentTime - (20 * hour),
  hourOne: currentTime - hour,
  minutePlus: currentTime - (59 * minute),
  minuteOne: currentTime - minute,
};

// Expected Results
const result = {
  yearPlus: "2 years ago",
  yearOne: "1 year ago",
  monthPlus: '3 months ago',
  monthOne: '1 month ago',
  weekPlus: '2 weeks ago',
  weekOne: '1 week ago',
  dayPlus: '6 days ago',
  dayOne: '1 day ago',
  hourPlus: '20 hours ago',
  hourOne: '1 hour ago',
  minutePlus: '59 minutes ago',
  minuteOne: '1 minute ago',
};

test("TC-001: >1 year", () => {
  expect(stringifyTime(td.yearPlus)).toBe(result.yearPlus);
});

test("TC-002: 1 year", () => {
  expect(stringifyTime(td.yearOne)).toBe(result.yearOne);
});

test("TC-003: >1 month", () => {
  expect(stringifyTime(td.monthPlus)).toBe(result.monthPlus);
});

test("TC-004: 1 month", () => {
  expect(stringifyTime(td.monthOne)).toBe(result.monthOne);
});

test("TC-005: >1 week", () => {
  expect(stringifyTime(td.weekPlus)).toBe(result.weekPlus);
});

test("TC-006: 1 week", () => {
  expect(stringifyTime(td.weekOne)).toBe(result.weekOne);
});

test("TC-007: >1 day", () => {
  expect(stringifyTime(td.dayPlus)).toBe(result.dayPlus);
});

test("TC-008: 1 day", () => {
  expect(stringifyTime(td.dayOne)).toBe(result.dayOne);
});

test("TC-009: >1 hour", () => {
  expect(stringifyTime(td.hourPlus)).toBe(result.hourPlus);
});

test("TC-010: 1 hour", () => {
  expect(stringifyTime(td.hourOne)).toBe(result.hourOne);
});

test("TC-011: >1 minute", () => {
  expect(stringifyTime(td.minutePlus)).toBe(result.minutePlus);
});

test("TC-012: 1 minute", () => {
  expect(stringifyTime(td.minuteOne)).toBe(result.minuteOne);
});
