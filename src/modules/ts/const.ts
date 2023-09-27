

export const defaultTargetWeekdays = [
  {
    id: "Monday",
    text: "月",
    value: true,
  },
  {
    id: "Tuesday",
    text: "火",
    value: true,
  },
  {
    id: "Wednesday",
    text: "水",
    value: true,
  },
  {
    id: "Thursday",
    text: "木",
    value: true,
  },
  {
    id: "Friday",
    text: "金",
    value: true,
  },
  {
    id: "Saturday",
    text: "土",
    value: true,
  },
  {
    id: "Sunday",
    text: "日",
    value: true,
  },
  {
    id: "Holiday",
    text: "祝日",
    value: false,
  },
];

export const defaultBaseRainfallProbability = 50;

const weekdayLength = defaultTargetWeekdays.length;

export const allCheckPayload = Array.from(
  {
    length: weekdayLength,
  },
  () => ({
    value: true,
  }),
);

export const allNotCheckPayload = Array.from(
  {
    length: weekdayLength,
  },
  () => ({
    value: false,
  }),
);

export const settingApiEndpoint =
  "https://script.google.com/macros/s/AKfycbzjUPYVvB9EA-sxSiax_euKuRKPl0VFK6TS8qYWJLca9oM9V7uijNNhKonATGndOWGM4Q/exec";
