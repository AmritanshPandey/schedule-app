// src/components/WeekPicker.jsx
import { useEffect, useMemo, useState, useCallback } from "react";
import "../styling/weekpicker.css";

const WEEKDAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getWeekStart(date) {
  const d = new Date(date);
  // (d.getDay() + 6) % 7 maps Sun->6, Mon->0, Tue->1, ... so subtracting that moves to Monday
  const day = (d.getDay() + 6) % 7;
  const monday = new Date(d);
  monday.setHours(0, 0, 0, 0);
  monday.setDate(d.getDate() - day);
  return monday;
}

function buildWeekDates(date) {
  const start = getWeekStart(date);
  const week = [];
  for (let i = 0; i < 7; i++) {
    const dd = new Date(start);
    dd.setDate(start.getDate() + i);
    dd.setHours(0, 0, 0, 0);
    week.push(dd);
  }
  return week;
}

export default function WeekPicker({ value, onChange, showMonthLabel = false }) {
  const [internalDate, setInternalDate] = useState(() => (value ? new Date(value) : new Date()));

  useEffect(() => {
    if (value) setInternalDate(new Date(value));
  }, [value]);

  const weekDates = useMemo(() => buildWeekDates(internalDate), [internalDate]);

  const isSameDay = useCallback((a, b) => {
    return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
  }, []);

const handleSelect = (date) => {
  const normalized = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  console.debug('[WeekPicker] handleSelect', { raw: date, normalized });
  setInternalDate(normalized);
  if (onChange) onChange(normalized);
};

  const dayNumber = (d) => d.getDate();

  return (
    <div className="weekpicker-root" role="region" aria-label="Week picker">
      {showMonthLabel && (
        <div className="weekpicker-header">
          <button
            className="weekpicker-arrow"
            onClick={() => {
              const prevWeek = new Date(internalDate);
              prevWeek.setDate(prevWeek.getDate() - 7);
              handleSelect(prevWeek);
            }}
            aria-label="Previous week"
          >
            ‹
          </button>

          <button
            className="weekpicker-arrow"
            onClick={() => {
              const nextWeek = new Date(internalDate);
              nextWeek.setDate(nextWeek.getDate() + 7);
              handleSelect(nextWeek);
            }}
            aria-label="Next week"
          >
            ›
          </button>
        </div>
      )}

      <div className="weekpicker-row" role="tablist" aria-orientation="horizontal">
        {weekDates.map((d, idx) => {
          const selected = isSameDay(d, internalDate);
          const today = isSameDay(d, new Date());
          return (
            <button
              key={idx}
              role="tab"
              aria-selected={selected}
              className={`weekpicker-day ${selected ? "selected" : ""} ${today ? "today" : ""}`}
              onClick={() => handleSelect(d)}
              title={d.toDateString()}
            >
              <div className="weekday">{WEEKDAY_LABELS[idx]}</div>
              <div className="date-circle">
                <span className="date-number">{dayNumber(d)}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}