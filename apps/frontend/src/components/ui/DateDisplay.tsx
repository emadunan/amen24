import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import styles from "./DateDisplay.module.css";
import { DateCalendar, formatNumber, Lang } from "@amen24/shared";
import { useUpdateProfileMutation } from "@/store/apis/userApi";
import { useGetMeQuery } from "@/store/apis/authApi";

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

const HebrewMonthMap: Record<string, number> = {
  tishrei: 1,
  cheshvan: 2,
  kislev: 3,
  tevet: 4,
  shevat: 5,
  adar: 6,
  "adar ii": 7,
  nisan: 8,
  iyar: 9,
  sivan: 10,
  tammuz: 11,
  av: 12,
  elul: 13,
};

const DateDisplay: React.FC = () => {
  const { t, i18n } = useTranslation(["month"]);
  const { data: user } = useGetMeQuery();
  const [updateProfile] = useUpdateProfileMutation();
  const today = useMemo(() => new Date(), []);

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

    const parts = formatter.formatToParts(today);

    const day = parts.find((p) => p.type === "day")?.value;
    let monthValue = parts.find((p) => p.type === "month")?.value;
    const year = parts.find((p) => p.type === "year")?.value;

    if (!day || !monthValue || !year) return "Error fetching date";

    // Normalize Hebrew months
    if (locale === "en-u-ca-hebrew") {
      let civilMonthNum: number | undefined;

      if (isNaN(Number(monthValue))) {
        const normalized = monthValue.trim().toLowerCase();
        civilMonthNum = HebrewMonthMap[normalized];
      } else {
        civilMonthNum = Number(monthValue);
      }

      if (civilMonthNum === undefined) {
        console.warn(`Unexpected Hebrew month: ${monthValue}`);
        return "Invalid Hebrew date";
      }

      monthValue = civilMonthNum.toString();
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
