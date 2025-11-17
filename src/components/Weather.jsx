import React, { useEffect, useState } from "react";
import "../styling/weather.css";
import { Icon } from "./icons";
import tasksData from "../data/task";
import WEATHER_CODE_MAP from "../data/weather";
import { weekdayCodeFromDate } from "../lib/scheduleHelpers";
import { IconMoodSmile, IconZzz } from "@tabler/icons-react";

const FIXED_COORDS = { lat: 28.4595, lon: 77.0266 };

function getEntry(code) {
  return WEATHER_CODE_MAP?.[Number(code)] || null;
}


function normalizeIconKey(maybeString) {
  if (!maybeString || typeof maybeString !== "string") return null;
  if (maybeString.startsWith("Icon")) {
    const stripped = maybeString.slice(4); 
    return stripped.charAt(0).toLowerCase() + stripped.slice(1); 
  }
  return maybeString;
}

function resolveIconForRender(code, isDay) {
  const entry = getEntry(code);
  if (!entry) return isDay ? "sun" : "moonStars";

  const raw = isDay ? (entry.iconDay ?? entry.icon) : (entry.iconNight ?? entry.icon);

  if (typeof raw === "string") {
    const key = normalizeIconKey(raw);
    return key || (isDay ? "sun" : "moonStars");
  }

  return raw

}

function getCategory(code) {
  return getEntry(code)?.category || "unknown";
}

function getLabel(code) {
  return getEntry(code)?.label || "Unknown";
}

function getGradient(code) {
  return getEntry(code)?.gradient || "unknown";
}

function formatTime(hhmm) {
  if (!hhmm || hhmm === "--:--") return "--:--";
  const [hStr, mStr] = hhmm.split(":");
  const h = Number(hStr || 0);
  const m = Number(mStr || 0);
  const ampm = h >= 12 ? "PM" : "AM";
  const hour12 = ((h + 11) % 12) + 1;
  return `${hour12}:${String(m).padStart(2, "0")} ${ampm}`;
}


/* Build Open-Meteo URL */
const buildOpenMeteoURL = (lat, lon) => {
  const params = new URLSearchParams({
    latitude: String(lat),
    longitude: String(lon),
    current_weather: "true",
    daily: "temperature_2m_max,temperature_2m_min,sunrise,sunset",
    timezone: "auto",
  });
  return `https://api.open-meteo.com/v1/forecast?${params.toString()}`;
};

/* ---------------------------------------------------------
   Component
--------------------------------------------------------- */
export default function Weather({ total = 0, selectedDate = new Date() }) {
  const [weather, setWeather] = useState(null);
  const [daily, setDaily] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // routines: lookup wake/sleep from tasksData for the selected weekday
  const safeDate = selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
  const weekdayCode = weekdayCodeFromDate(safeDate);
  const todayEntry = tasksData?.schedule?.find((d) => d.weekday === weekdayCode) || {};
  const wakeupTime = todayEntry?.routine?.wakeup || "--:--";
  const sleepTime = todayEntry?.routine?.sleep || "--:--";

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    async function fetchWeather() {
      try {
        setLoading(true);
        setError(null);
        const url = buildOpenMeteoURL(FIXED_COORDS.lat, FIXED_COORDS.lon);
        const res = await fetch(url, { signal: controller.signal });
        if (!res.ok) throw new Error(`Weather API error ${res.status}`);
        const json = await res.json();
        if (cancelled) return;
        setWeather(json.current_weather || null);
        setDaily(json.daily || null);
        setLastUpdated(new Date().toISOString());
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Weather fetch failed:", err);
          if (!cancelled) setError(err.message || "Failed to load weather");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchWeather();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  // determine day/night explicitly using API sunrise/sunset
  const isDay = (() => {
    if (!weather || !daily || !daily.time) return true;
    const apiDate = weather.time ? weather.time.split("T")[0] : null;
    const idx = daily.time ? daily.time.indexOf(apiDate) : -1;
    if (idx === -1) return true;
    const now = weather.time ? new Date(weather.time) : new Date();
    const sunrise = new Date(daily.sunrise[idx]);
    const sunset = new Date(daily.sunset[idx]);
    return now >= sunrise && now < sunset;
  })();

  const code = weather?.weathercode ?? null;
  const gradient = getGradient(code);
  const category = getCategory(code);
  const label = getLabel(code);
  const iconSpec = resolveIconForRender(code, isDay);

  // render resolved icon: either string key for <Icon /> or a React component
  function RenderIcon({ spec, size = 24, stroke = 1.6 }) {
    if (!spec) return <Icon name={isDay ? "sun" : "moonStars"} size={size} stroke={stroke} />;
    if (typeof spec === "string") return <Icon name={spec} size={size} stroke={stroke} />;
    // assume spec is a React component
    try {
      return React.createElement(spec, { width: size, height: size, stroke });
    } catch (e) {
      // fallback
      return <Icon name="cloud" size={size} stroke={stroke} />;
    }
  }

  const temp = weather ? Math.round(weather.temperature) : "--";
  const high =
    daily?.temperature_2m_max?.[0] != null ? Math.round(daily.temperature_2m_max[0]) : "--";
  const low =
    daily?.temperature_2m_min?.[0] != null ? Math.round(daily.temperature_2m_min[0]) : "--";

  return (
    <main>
      <section className="weather-container">
        <div className="left">
          <article className={`weather-card ${gradient} ${isDay ? "day" : "night"}`}>
            <div className="weather-card-left">
              <div className="weather-row">
                <div className="weather-main">
                  <div className="weather-icon" aria-hidden>
                    <RenderIcon spec={iconSpec} size={56} stroke={1.8} />
                  </div>

                  <div className="temp">
                    <div className="temp-value">{temp}°C</div>
                    <div className="status">{label}</div>
                  </div>
                </div>
              </div>

              <div className="weather-details">
                <span className="weather-text">
                  H: {high}°C &nbsp; L: {low}°C
                </span>
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
                    <IconMoodSmile stroke={1.6} />
                  </div>
                  <span>{formatTime(wakeupTime)}</span>
                </div>

                <div className="routine-container">
                  <div className="routine-icon" aria-hidden>
                    <IconZzz stroke={1.6} />
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