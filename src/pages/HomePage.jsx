
import { useState } from "react";
import Weather from '../components/Weather';
import WeekPicker from '../components/WeekPicker';
import '../styling/home.css';
// import WeatherTest from "../components/WeatherTest";

const HomePage = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <main className="home-container">
      <section className="weather-section">
        <Weather />
      </section>
      <section className="schedule-section">
        <h2>My Schedule</h2>
        <WeekPicker
          value={selectedDate}
          onChange={(d) => setSelectedDate(d)}
          showMonthLabel={false}
        />
        {/* <WeatherTest /> */}
      </section>

    </main>
  )
}



export default HomePage