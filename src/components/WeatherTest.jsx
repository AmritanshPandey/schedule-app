// src/components/WeatherTest.jsx
import React, { useMemo, useState } from "react";
import "../styling/weather.css";
import { Icon } from "./icons";
import WEATHER_CODE_MAP from "../data/weather";

/* --- Helpers copied / aligned with Weather.jsx --- */
function getEntry(code) {
  return WEATHER_CODE_MAP?.[Number(code)] || null;
}

function normalizeIconKey(maybeString) {
  if (!maybeString || typeof maybeString !== "string") return null;
  if (maybeString.startsWith("Icon")) {
    const stripped = maybeString.slice(4); // remove "Icon"
    return stripped.charAt(0).toLowerCase() + stripped.slice(1); // CloudRain -> cloudRain
  }
  return maybeString;
}

function resolveIconKeyFromMap(code, isDay) {
  const entry = getEntry(code);
  if (!entry) return isDay ? "sun" : "moonStars";
  const raw = isDay ? (entry.iconDay ?? entry.icon) : (entry.iconNight ?? entry.icon);
  if (typeof raw === "string") {
    return normalizeIconKey(raw) || (isDay ? "sun" : "moonStars");
  }
  // not a string (component) — return null so RenderIcon falls back to safe option
  return raw;
}

function getLabel(code) {
  return getEntry(code)?.label || "Unknown";
}

function getCategory(code) {
  return getEntry(code)?.category || "unknown";
}

/* small render helper — handles string key OR React component */
function RenderIcon({ spec, isDay, size = 40, stroke = 1.6 }) {
  if (!spec) return <Icon name={isDay ? "sun" : "moonStars"} size={size} stroke={stroke} />;
  if (typeof spec === "string") return <Icon name={spec} size={size} stroke={stroke} />;
  // assume spec is a React component (rare in current map)
  try {
    return React.createElement(spec, { width: size, height: size, stroke, "aria-hidden": true });
  } catch (e) {
    return <Icon name="cloud" size={size} stroke={stroke} />;
  }
}

/* Representative set of test weather codes (Open-Meteo style) */
const TEST_CODES = [
  0, 1, 2, 3, 51, 53, 55, 61, 63, 65, 71, 73, 75, 95
];

export default function WeatherTest() {
  const [isDay, setIsDay] = useState(true);
  const [largeCode, setLargeCode] = useState(TEST_CODES[0]);

  const grid = useMemo(() => {
    return TEST_CODES.map((code) => {
      const category = getCategory(code);
      const label = getLabel(code);
      return { code, category, label };
    });
  }, []);

  return (
    <div style={{ padding: 18 }}>
      <h2 style={{ marginTop: 0 }}>Weather previews — icons & backgrounds</h2>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input
            type="checkbox"
            checked={isDay}
            onChange={() => setIsDay((v) => !v)}
            aria-label="Toggle day mode"
          />
          Day mode
        </label>

        <label htmlFor="large-preview-select" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span>Large preview:</span>
          <select
            id="large-preview-select"
            aria-label="Select weather code for large preview"
            value={largeCode}
            onChange={(e) => setLargeCode(Number(e.target.value))}
            style={{ marginLeft: 8 }}
          >
            {TEST_CODES.map((c) => (
              <option key={c} value={c}>
                {c} — {getLabel(c)}
              </option>
            ))}
          </select>
        </label>

        <button
          onClick={() => {
            const idx = TEST_CODES.findIndex((c) => c === largeCode);
            setLargeCode(TEST_CODES[(idx + 1) % TEST_CODES.length]);
          }}
        >
          Cycle
        </button>
      </div>

      {/* Large preview */}
      <div style={{ marginBottom: 18 }}>
        {(() => {
          const code = largeCode;
          const cat = getCategory(code);
          const label = getLabel(code);
          const iconKey = resolveIconKeyFromMap(code, isDay);

          return (
            <article
              className={`weather-card ${cat} ${isDay ? "day" : "night"}`}
              style={{ width: 420 }}
              aria-live="polite"
            >
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ flex: "0 0 72px" }}>
                  <RenderIcon spec={iconKey} isDay={isDay} size={72} stroke={1.8} />
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "inherit" }}>{label}</div>
                  <div style={{ marginTop: 6, color: "var(--muted)" }}>
                    category: <strong>{cat}</strong> — class:{" "}
                    <code>{`weather-card ${cat} ${isDay ? "day" : "night"}`}</code>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 12, color: "var(--muted)" }}>H: 23°C &nbsp; L: 15°C</div>
            </article>
          );
        })()}
      </div>

      <hr style={{ margin: "18px 0" }} />

      {/* Grid of small cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        {grid.map((g) => {
          const iconDay = resolveIconKeyFromMap(g.code, true);
          const iconNight = resolveIconKeyFromMap(g.code, false);
          return (
            <div key={g.code} style={{ borderRadius: 12, overflow: "hidden" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <article className={`weather-card ${g.category} day`} style={{ flex: 1, padding: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <RenderIcon spec={iconDay} isDay={true} size={40} stroke={1.6} />
                    <div>
                      <div style={{ fontWeight: 700 }}>{g.label}</div>
                      <div style={{ color: "var(--muted)" }}>{g.category} • day</div>
                    </div>
                  </div>
                </article>

                <article className={`weather-card ${g.category} night`} style={{ flex: 1, padding: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <RenderIcon spec={iconNight} isDay={false} size={40} stroke={1.6} />
                    <div>
                      <div style={{ fontWeight: 700, color: "var(--text-light)" }}>{g.label}</div>
                      <div style={{ color: "var(--muted-night)" }}>{g.category} • night</div>
                    </div>
                  </div>
                </article>
              </div>
            </div>
          );
        })}
      </div>

      <p style={{ marginTop: 16, color: "var(--muted)", fontSize: 13 }}>
        Tip: this preview now uses the same mapping as <code>Weather.jsx</code>. If an icon or gradient still looks
        off, update <code>src/data/weather.js</code> (iconDay/iconNight/gradient).
      </p>
    </div>
  );
}