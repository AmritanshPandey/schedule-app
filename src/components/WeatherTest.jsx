// src/components/Weather.jsx
import { useEffect, useState, useRef } from "react";
import "../styling/weather.css";
import { Icon } from "./icons";
import tasksData from "../data/task";
import { weekdayCodeFromDate } from "../lib/scheduleHelpers";

// Fixed location coordinates (change to your preferred default)
const FIXED_COORDS = { lat: 28.4595, lon: 77.0266 };

// refresh interval (ms) - 10 minutes
const REFRESH_INTERVAL_MS = 10 * 60 * 1000;

/* -------------------- Helpers -------------------- */
const buildOpenMeteoURL = (latitude, longitude) => {
  const base = "https://api.open-meteo.com/v1/forecast";
  const params = new URLSearchParams({
    latitude: String(latitude),
    longitude: String(longitude),
    current_weather: "true",
    daily: "temperature_2m_max,temperature_2m_min,sunrise,sunset",
    timezone: "auto",
  });
  return `${base}?${params.toString()}`;
};

function codeToCategory(code) {
  if (code === 0 || code === 1) return "clear";
  if (code === 2) return "partly-cloudy";
  if (code === 3) return "overcast";
  if ([45, 48].includes(code)) return "fog";
  if (code >= 51 && code <= 67) return "drizzle";
  if (code >= 61 && code <= 86) return "rain";
  if (code >= 71 && code <= 77) return "snow";
  if (code >= 95) return "thunder";
  return "unknown";
}

function iconNameForCategory(category, isDay) {
  const map = {
    clear: isDay ? "sun" : "moonStars",
    "partly-cloudy": isDay ? "sunLow" : "moonStars",
    overcast: "cloud",
    fog: "haze",
    drizzle: "cloudRain",
    rain: "cloudRain",
    snow: "cloudSnow",
    thunder: "cloudBolt",
    unknown: "cloud",
  };
  return map[category] || "cloud";
}

const formatTime = (hhmm) => {
  if (!hhmm || hhmm === "--:--") return "--:--";
  const parts = hhmm.split(":").map((p) => p.trim());
  if (parts.length === 0) return "--:--";
  const h = Number(parts[0]);
  const m = parts[1] ? Number(parts[1]) : 0;
  if (!Number.isFinite(h) || !Number.isFinite(m)) return hhmm;
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = ((h + 11) % 12) + 1;
  return `${hour12}:${String(m).padStart(2, "0")} ${ampm}`;
};

/* -------------------- Component -------------------- */
/*
 Props:
  - total: Number (task count for the day, optional)
  - selectedDate: Date (the date selected in WeekPicker, defaults to today)
*/
export default function Weather({ total = 0, selectedDate = new Date() }) {
  const [weather, setWeather] = useState(null);
  const [daily, setDaily] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // store controller and interval refs so we can clean up
  const controllerRef = useRef(null);
  const intervalRef = useRef(null);

  // fetcher extracted so we can call it on mount and on interval
  const fetchWeather = async () => {
    // abort previous controller if any
    if (controllerRef.current) {
      try {
        controllerRef.current.abort();
      } catch (e) {}
    }
    const controller = new AbortController();
    controllerRef.current = controller;

    setLoading(true);
    setError(null);
    try {
      const url = buildOpenMeteoURL(FIXED_COORDS.lat, FIXED_COORDS.lon);
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error(`Weather API error ${res.status}`);
      const json = await res.json();
      setWeather(json.current_weather || null);
      setDaily(json.daily || null);
      setLastUpdated(new Date().toISOString());
    } catch (err) {
      if (err.name !== "AbortError") {
        console.warn("Weather fetch failed:", err);
        setError(err.message || "Failed to load weather");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // initial fetch
    fetchWeather();

    // set up interval to refresh every REFRESH_INTERVAL_MS
    intervalRef.current = setInterval(() => {
      fetchWeather();
    }, REFRESH_INTERVAL_MS);

    return () => {
      // cleanup interval & controller on unmount
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (controllerRef.current) {
        try {
          controllerRef.current.abort();
        } catch (e) {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // run once on mount

  // Helpers
  const isDay = () => {
    if (!daily || !weather || !daily.time) return true;
    // find today's index in daily.time array using weather.time or selectedDate
    const todayDate =
      (weather && weather.time ? weather.time.split("T")[0] : null) ||
      selectedDate.toISOString().slice(0, 10);
    const idx = daily.time ? daily.time.indexOf(todayDate) : -1;
    if (idx === -1) return true;
    const now = weather && weather.time ? new Date(weather.time) : new Date();
    const sunrise = new Date(daily.sunrise[idx]);
    const sunset = new Date(daily.sunset[idx]);
    return now >= sunrise && now < sunset;
  };

  // Look up routine (wakeup/sleep) from tasksData for the selectedDate's weekday
  const weekdayCode = weekdayCodeFromDate(selectedDate);
  const todayEntry = tasksData?.schedule?.find((d) => d.weekday === weekdayCode) || {};
  // allow tasksData entries to include a `routine` object like { wakeup: "05:00", sleep: "21:30" }
  const wakeupTime = todayEntry?.routine?.wakeup || todayEntry?.wakeup || "--:--";
  const sleepTime = todayEntry?.routine?.sleep || todayEntry?.sleep || "--:--";

  const currentTemp = weather ? Math.round(weather.temperature) : "--";
  const code = weather ? weather.weathercode : null;
  const category = code != null ? codeToCategory(code) : "unknown";
  const dayFlag = isDay();
  const iconKey = iconNameForCategory(category, dayFlag);
  const statusLabel = code != null ? category.replace("-", " ") : "";

  const high = daily?.temperature_2m_max?.[0] ? Math.round(daily.temperature_2m_max[0]) : "--";
  const low = daily?.temperature_2m_min?.[0] ? Math.round(daily.temperature_2m_min[0]) : "--";

  return (
    <main>
      <section className="weather-container">
        <div className="left">
          <article className={`weather-card ${category} ${dayFlag ? "day" : "night"}`}>
            <div className="weather-card-left">
              <div>
                <div className="weather-row">
                  <div className="weather-main">
                    <div className="weather-icon" aria-hidden>
                      <Icon name={iconKey} size={28} stroke={1.6} />
                    </div>

                    <div className="temp">
                      <div className="temp-value">{currentTemp}°C</div>
                      <div className="status">{statusLabel}</div>
                    </div>
                  </div>
                </div>

                <div className="weather-details">
                  <span className="weather-text">H: {high}°C &nbsp; L: {low}°C</span>
                </div>
              </div>

              <span className="update-time">
                Last updated: {lastUpdated ? new Date(lastUpdated).toLocaleTimeString() : "—"}
              </span>

              {loading && <div className="weather-loading">Loading…</div>}
              {error && <div className="weather-error">Error: {error}</div>}
            </div>
          </article>
        </div>

        <div className="right">
          <article className="routine-card">
            <div className="weather-card-right">
              <div className="routine-container-main">
                <div className="routine-container">
                  <div className="routine-icon" aria-hidden>
                    <Icon name="moodSmile" size={28} stroke={1.5} />
                  </div>
                  <span>{formatTime(wakeupTime)}</span>
                </div>

                <div className="routine-container">
                  <div className="routine-icon" aria-hidden>
                    <Icon name="zzz" size={28} stroke={1.5} />
                  </div>
                  <span>{formatTime(sleepTime)}</span>
                </div>
              </div>

              <div className="tasks-container">
                <span className="task-title">Tasks</span>
                <div className="task-number">
                  <span>{String(total).padStart(2, "0")}</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
    </main>
  );
}