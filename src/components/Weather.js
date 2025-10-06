import './App.css';

const weatherVariants = [
  { key: 'sunny-day', label: 'Sunny Day' },
  { key: 'clear-night', label: 'Clear Night' },
  { key: 'cloudy-day', label: 'Cloudy Day' },
  { key: 'cloudy-night', label: 'Cloudy Night' },
  { key: 'overcast-day', label: 'Overcast Day' },
  { key: 'overcast-night', label: 'Overcast Night' },
  { key: 'fog-day', label: 'Fog Day' },
  { key: 'fog-night', label: 'Fog Night' },
  { key: 'drizzle-day', label: 'Drizzle Day' },
  { key: 'drizzle-night', label: 'Drizzle Night' },
  { key: 'rain-day', label: 'Rain Day' },
  { key: 'rain-night', label: 'Rain Night' },
  { key: 'snow-day', label: 'Snow Day' },
  { key: 'snow-night', label: 'Snow Night' },
  { key: 'thunderstorm-day', label: 'Thunderstorm Day' },
  { key: 'thunderstorm-night', label: 'Thunderstorm Night' },
];

function LightningSVG() {
  // lightweight inline SVG bolt (animated via CSS)
  return (
    <svg className="bolt" viewBox="0 0 24 36" aria-hidden="true" focusable="false">
      <path d="M6 0 L0 18 L10 18 L4 36 L18 12 L8 12 Z" fill="currentColor"/>
    </svg>
  );
}

function WeatherCard({ variant, label }) {
  const hasRain = variant.includes('rain') || variant.includes('drizzle') || variant.includes('thunderstorm');
  const hasClouds = variant.includes('cloudy') || variant.includes('overcast') || variant.includes('thunderstorm') || variant.includes('drizzle');
  const hasFog = variant.includes('fog');
  const hasLightning = variant.includes('thunderstorm');
  const hasSnow = variant.includes('snow');

  return (
    <article
      className={`weather-card ${variant}`}
      role="region"
      aria-label={label}
      tabIndex="0"
    >
      <div className="card-content">
        <h1>{label}</h1>
      </div>

      {/* Visual effect layers (lightweight, aria-hidden) */}
      {hasClouds && <div className="effect clouds" aria-hidden="true" />}
      {hasFog && <div className="effect fog" aria-hidden="true" />}
      {hasRain && <div className="effect rain" aria-hidden="true" />}
      {hasSnow && <div className="effect snow" aria-hidden="true" />}
      {hasLightning && (
        <div className="effect lightning" aria-hidden="true">
          <LightningSVG />
        </div>
      )}
    </article>
  );
}

function App() {
  return (
    <div className="App">
      <main className="grid">
        {weatherVariants.map((v) => (
          <WeatherCard key={v.key} variant={v.key} label={v.label} />
        ))}
      </main>
    </div>
  );
}

export default App;