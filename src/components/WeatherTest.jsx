import React, { useMemo, useState } from "react";
import "../styling/weather.css";
import { Icon } from "./icons";

/*
 Reuse same mapping logic as Weather.jsx
*/
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

/* Representative set of test weather codes (from Open-Meteo docs) */
const TEST_CODES = [
  { code: 0, label: "Clear (0)" },
  { code: 1, label: "Mainly clear (1)" },
  { code: 2, label: "Partly cloudy (2)" },
  { code: 3, label: "Overcast (3)" },
  { code: 45, label: "Fog (45)" },
  { code: 48, label: "Rime Fog (48)" },
  { code: 51, label: "Light drizzle (51)" },
  { code: 53, label: "Moderate drizzle (53)" },
  { code: 55, label: "Dense drizzle (55)" },
  { code: 61, label: "Slight rain (61)" },
  { code: 63, label: "Moderate rain (63)" },
  { code: 65, label: "Heavy rain (65)" },
  { code: 71, label: "Slight snow (71)" },
  { code: 73, label: "Moderate snow (73)" },
  { code: 75, label: "Heavy snow (75)" },
  { code: 95, label: "Thunderstorm (95)" },
  { code: 99, label: "Thunder + hail (99)" },
];

export default function WeatherTest() {
  const [isDay, setIsDay] = useState(true);
  const [largeCode, setLargeCode] = useState(TEST_CODES[0].code);

  const grid = useMemo(() => {
    return TEST_CODES.map((t) => {
      const category = codeToCategory(t.code);
      return { ...t, category };
    });
  }, []);

  return (
    <div style={{ padding: 18 }}>
      <h2 style={{ marginTop: 0 }}>Weather previews — icons & backgrounds</h2>

      <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12 }}>
        <label style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <input type="checkbox" checked={isDay} onChange={() => setIsDay((v) => !v)} />
          Day mode
        </label>

        <label>
          Large preview:
          <select
            value={largeCode}
            onChange={(e) => setLargeCode(Number(e.target.value))}
            style={{ marginLeft: 8 }}
          >
            {TEST_CODES.map((t) => (
              <option key={t.code} value={t.code}>{t.label}</option>
            ))}
          </select>
        </label>

        <button
          onClick={() => {
            // cycle large preview
            const idx = TEST_CODES.findIndex((c) => c.code === largeCode);
            const next = TEST_CODES[(idx + 1) % TEST_CODES.length].code;
            setLargeCode(next);
          }}
        >
          Cycle
        </button>
      </div>

      {/* Large preview card */}
      <div style={{ marginBottom: 18 }}>
        {(() => {
          const t = TEST_CODES.find((x) => x.code === largeCode);
          const cat = codeToCategory(largeCode);
          const iconKey = iconNameForCategory(cat, isDay);
          return (
            <article className={`weather-card ${cat} ${isDay ? "day" : "night"}`} style={{ width: 420 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ flex: "0 0 72px" }}>
                  <Icon name={iconKey} size={72} stroke={1.8} />
                </div>
                <div>
                  <div style={{ fontSize: 22, fontWeight: 700, color: "inherit" }}>{t.label}</div>
                  <div style={{ marginTop: 6, color: "var(--muted)" }}>
                    category: <strong>{cat}</strong> — class: <code>{`weather-card ${cat} ${isDay ? "day" : "night"}`}</code>
                  </div>
                </div>
              </div>
              <div style={{ marginTop: 12, color: "var(--muted)" }}>
                H: 23°C &nbsp; L: 15°C
              </div>
            </article>
          );
        })()}
      </div>

      <hr style={{ margin: "18px 0" }} />

      {/* Grid of small cards (day + night columns) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        {grid.map((g) => {
          const iconDay = iconNameForCategory(g.category, true);
          const iconNight = iconNameForCategory(g.category, false);
          return (
            <div key={g.code} style={{ borderRadius: 12, overflow: "hidden" }}>
              <div style={{ display: "flex", gap: 8 }}>
                {/* Day card */}
                <article className={`weather-card ${g.category} day`} style={{ flex: 1, padding: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Icon name={iconDay} size={40} stroke={1.6} />
                    <div>
                      <div style={{ fontWeight: 700 }}>{g.label}</div>
                      <div style={{ color: "var(--muted)" }}>{g.category} • day</div>
                    </div>
                  </div>
                </article>

                {/* Night card */}
                <article className={`weather-card ${g.category} night`} style={{ flex: 1, padding: 12 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <Icon name={iconNight} size={40} stroke={1.6} />
                    <div>
                      <div style={{ fontWeight: 700, color: "var(--text-invert)" }}>{g.label}</div>
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
        Tip: click the dropdown to preview a single code large, toggle Day mode, or cycle through codes.
        If an icon or gradient doesn't match what you expect, update <code>iconNameForCategory</code> or the
        CSS gradient for that <code>.{`weather-card.<category>`}</code>.
      </p>
    </div>
  );
}