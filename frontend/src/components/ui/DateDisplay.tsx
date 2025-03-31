import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./DateDisplay.module.css";
import { formatNumber, Lang } from "@amen24/shared";

const calendars = ["gregorian", "coptic", "hebrew"] as const;
type CalendarType = (typeof calendars)[number];

const getLocaleForCalendar = (calendar: CalendarType) => {
  switch (calendar) {
    case "gregorian":
      return "en"; // Default to avoid errors
    case "coptic":
      return "en-u-ca-coptic";
    case "hebrew":
      return "en-u-ca-hebrew";
    default:
      return "en"; // Fallback
  }
};

const HebrewMonthMap: Record<string, number> = {
  Nisan: 1,
  Iyyar: 2,
  Sivan: 3,
  Tammuz: 4,
  Av: 5,
  Elul: 6,
  Tishrei: 7,
  Cheshvan: 8,
  Kislev: 9,
  Tevet: 10,
  Shevat: 11,
  Adar: 12,
  "Adar II": 13, // Only in leap years
};

const DateDisplay: React.FC = () => {
  const { t, i18n } = useTranslation("month");
  const [calendarIndex, setCalendarIndex] = useState(0);

  const switchCalendar = () => {
    setCalendarIndex((prevIndex) => (prevIndex + 1) % calendars.length);
  };

  const getFormattedDate = (calendar: CalendarType) => {
    const locale = getLocaleForCalendar(calendar);

    const formatter = new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "numeric", // Keep numeric for Gregorian & Coptic
      year: "numeric",
      localeMatcher: "lookup", // Ensures more consistent behavior across browsers
    });

    const parts = formatter.formatToParts(new Date());

    const day = parts.find((p) => p.type === "day")?.value;
    let monthIndex = parts.find((p) => p.type === "month")?.value;
    const year = parts.find((p) => p.type === "year")?.value;

    if (!day || !monthIndex || !year) return "Error fetching date";

    if (locale === "en-u-ca-hebrew") {
      // Hebrew months are returned as names, not numbers
      const mappedMonth = HebrewMonthMap[monthIndex]; // Convert name to number
      if (mappedMonth) {
        monthIndex = mappedMonth.toString();
      } else {
        console.warn(`Unexpected Hebrew month: ${monthIndex}`); // Debugging help
        return "Invalid Hebrew date"; // Avoid crashing if mapping fails
      }
    }

    // Get translated month name
    const monthName = t(`${calendar}.${monthIndex}`, { ns: "month" });

    const formattedDay = formatNumber(Number(day), i18n.language as Lang);
    const formattedYear = formatNumber(Number(year), i18n.language as Lang);

    return `${formattedDay} ${monthName} ${formattedYear}`;
  };


  return (
    <div onClick={switchCalendar} className={styles.calendar}>
      {getFormattedDate(calendars[calendarIndex])}
    </div>
  );
};

export default DateDisplay;
