import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./DateDisplay.module.css";
import { DateCalendar, formatNumber, Lang } from "@amen24/shared";
import { useUpdateProfileMutation } from "@/store/userApi";
import { useGetMeQuery } from "@/store/authApi";

const calendars = ["gregorian", "coptic", "hebrew"] as const;
type CalendarType = (typeof calendars)[number];

const getLocaleForCalendar = (calendar: CalendarType) => {
  switch (calendar) {
    case "gregorian":
      return "en";
    case "coptic":
      return "en-u-ca-coptic";
    case "hebrew":
      return "en-u-ca-hebrew";
    default:
      return "en";
  }
};

// Hebrew month mapping: name -> biblical order (Nisan = 1)
const HebrewMonthMap: Record<string, number> = {
  Nisan: 1,
  Iyar: 2,
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
  "Adar II": 13,
};

// Civil to Biblical month number mapping
const civilToBiblical = (civilMonth: number): number => {
  const mapping: Record<number, number> = {
    1: 7,
    2: 8,
    3: 9,
    4: 10,
    5: 11,
    6: 12,
    7: 1,
    8: 2,
    9: 3,
    10: 4,
    11: 5,
    12: 6,
    13: 13, // Leap year Adar II
  };
  return mapping[civilMonth] ?? -1;
};

const DateDisplay: React.FC = () => {
  const { t, i18n } = useTranslation(["month"]);
  const { data: user } = useGetMeQuery();
  const [updateProfile] = useUpdateProfileMutation();

  const preferredCalendar = user?.profile?.dateCalendar ?? "gregorian";
  const defaultIndex = useMemo(
    () => Math.max(0, calendars.indexOf(preferredCalendar as CalendarType)),
    [preferredCalendar],
  );
  const [calendarIndex, setCalendarIndex] = useState(defaultIndex);

  useEffect(() => {
    if (user?.profile?.dateCalendar) {
      const index = calendars.indexOf(
        user.profile.dateCalendar as CalendarType,
      );
      if (index !== -1) {
        setCalendarIndex(index);
      }
    }
  }, [user?.profile?.dateCalendar]);

  const switchCalendar = () => {
    setCalendarIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % calendars.length;
      updateProfile({ dateCalendar: calendars[nextIndex] as DateCalendar });
      return nextIndex;
    });
  };

  const getFormattedDate = (calendar: CalendarType) => {
    const locale = getLocaleForCalendar(calendar);

    const formatter = new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      localeMatcher: "lookup",
    });

    const parts = formatter.formatToParts(new Date());

    const day = parts.find((p) => p.type === "day")?.value;
    let monthValue = parts.find((p) => p.type === "month")?.value;
    const year = parts.find((p) => p.type === "year")?.value;

    if (!day || !monthValue || !year) return "Error fetching date";

    // Normalize Hebrew months
    if (locale === "en-u-ca-hebrew") {
      let biblicalMonthNum: number | undefined;

      if (isNaN(Number(monthValue))) {
        // If it's a name like "Nisan"
        biblicalMonthNum = HebrewMonthMap[monthValue];
      } else {
        // If it's a civil number like 7 (Tishrei), convert to biblical
        const civilMonth = Number(monthValue);
        biblicalMonthNum = civilToBiblical(civilMonth);
      }

      if (!biblicalMonthNum) {
        console.warn(`Unexpected Hebrew month: ${monthValue}`);
        return "Invalid Hebrew date";
      }

      monthValue = biblicalMonthNum.toString();
    }

    const monthName = t(`month:${calendar}.${monthValue}`);
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
