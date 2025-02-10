"use client";
import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.scss";

export interface DateValue {
  month: string;
  day: string;
  year: string;
}

export interface DateInputProps {
  dateValue: DateValue;
  onDateChange: (date: DateValue) => void;
}

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const DateInput: React.FC<DateInputProps> = ({ dateValue, onDateChange }) => {
  const [showCalendar, setShowCalendar] = useState<boolean>(false);
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date());
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (dateValue.month && dateValue.day && dateValue.year) {
      setCurrentMonth(new Date(
        parseInt(dateValue.year),
        parseInt(dateValue.month) - 1
      ));
    }
  }, [dateValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "");
    let month = "";
    let day = "";
    let year = "";

    if (value.length > 0) {
      month = value.slice(0, 2);
      if (parseInt(month) > 12) month = "12";
      if (value.length > 2) {
        day = value.slice(2, 4);
        if (parseInt(day) > 31) day = "31";
        if (value.length > 4) {
          year = value.slice(4, 8);
        }
      }
    }

    onDateChange({ month, day, year });
  };

  const formatDisplay = (): string => {
    const { month, day, year } = dateValue;
    let display = "";
    if (month) display += month.padStart(2, "0");
    if (day) display += "/" + day.padStart(2, "0");
    if (year) display += "/" + year;
    return display;
  };

  const getDaysInMonth = (date: Date): (number | null)[] => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    const days: (number | null)[] = [];
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const handleDateSelect = (day: number | null) => {
    if (day) {
      const month = (currentMonth.getMonth() + 1).toString().padStart(2, "0");
      const year = currentMonth.getFullYear().toString();
      const dayStr = day.toString().padStart(2, "0");
      onDateChange({ month, day: dayStr, year });
      setShowCalendar(false);
    }
  };

  const navigateMonth = (direction: number) => {
    setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + direction)));
  };

  const isSelectedDate = (day: number | null): boolean => {
    if (!day) return false;
    return day === parseInt(dateValue.day) &&
      (currentMonth.getMonth() + 1).toString().padStart(2, "0") === dateValue.month &&
      currentMonth.getFullYear().toString() === dateValue.year;
  };

  return (
    <div className={styles.dateInputWrapper}>
      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.input}
          placeholder="MM / DD / YYYY"
          value={formatDisplay()}  // Ensure this is a string
          onChange={handleInputChange}
          onClick={() => setShowCalendar(!showCalendar)}
          maxLength={10}
        />
        <button 
          className={styles.calendarButton}
          onClick={() => setShowCalendar(!showCalendar)}
        >
          <svg 
            className={styles.calendarIcon}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" 
            />
          </svg>
        </button>
      </div>

      {showCalendar && (
        <div ref={calendarRef} className={styles.calendar}>
          <div className={styles.calendarHeader}>
            <button
              onClick={() => navigateMonth(-1)}
              className={styles.navigationButton}
            >
              ←
            </button>
            <div className={styles.monthYear}>
              {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </div>
            <button
              onClick={() => navigateMonth(1)}
              className={styles.navigationButton}
            >
              →
            </button>
          </div>

          <div className={styles.calendarGrid}>
            {dayNames.map(day => (
              <div key={day} className={styles.dayName}>
                {day}
              </div>
            ))}
            {getDaysInMonth(currentMonth).map((day, index) => (
              <button
                key={index}
                onClick={() => handleDateSelect(day)}
                className={`
                  ${styles.dayButton}
                  ${!day ? styles.invisible : ''}
                  ${isSelectedDate(day) ? styles.selected : ''}
                `}
              >
                {day}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
