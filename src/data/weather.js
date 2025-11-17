
const WEATHER_CODE_MAP = {
    // exact codes
    0: { category: "clear", label: "Clear", iconDay: "IconSun", iconNight: "IconMoonStars", gradient: "clear" },
    1: { category: "mainly-clear", label: "Mainly clear", iconDay: "IconSun", iconNight: "IconMoonStars", gradient: "clear" },
    2: { category: "partly-cloudy", label: "Partly cloudy", iconDay: "IconHaze", iconNight: "IconCloudMoon", gradient: "partly-cloudy" },
    3: { category: "overcast", label: "Overcast", iconDay: "IconCloud", iconNight: "IconCloud", gradient: "overcast" },

    45: { category: "fog", label: "Fog", iconDay: "IconMist", iconNight: "IconMist", gradient: "fog" },

    // drizzle
    51: { category: "drizzle", label: "Light drizzle", iconDay: "IconCloudRain", iconNight: "IconCloudRain", gradient: "drizzle" },
    53: { category: "drizzle", label: "Drizzle", iconDay: "IconCloudRain", iconNight: "IconCloudRain", gradient: "drizzle" },
    55: { category: "drizzle", label: "Heavy drizzle", iconDay: "IconCloudRain", iconNight: "IconCloudRain", gradient: "drizzle" },
    56: { category: "freezing-drizzle", label: "Freezing drizzle", iconDay: "IconCloudSnow", iconNight: "IconCloudSnow", gradient: "drizzle" },
    57: { category: "freezing-drizzle", label: "Freezing drizzle", iconDay: "IconCloudSnow", iconNight: "IconCloudSnow", gradient: "drizzle" },

    // rain
    61: { category: "rain", label: "Slight rain", iconDay: "IconCloudRain", iconNight: "IconCloudRain", gradient: "rain" },
    63: { category: "rain", label: "Moderate rain", iconDay: "IconCloudRain", iconNight: "IconCloudRain", gradient: "rain" },
    65: { category: "rain", label: "Heavy rain", iconDay: "IconCloudRain", iconNight: "IconCloudRain", gradient: "rain" },
    66: { category: "freezing-rain", label: "Freezing rain", iconDay: "IconCloudSnow", iconNight: "IconCloudSnow", gradient: "rain" },
    67: { category: "freezing-rain", label: "Freezing rain", iconDay: "IconCloudSnow", iconNight: "IconCloudSnow", gradient: "rain" },

    // snow
    71: { category: "snow", label: "Slight snow", iconDay: "IconSnowflake", iconNight: "IconSnowflake", gradient: "snow" },
    73: { category: "snow", label: "Moderate snow", iconDay: "IconSnowflake", iconNight: "IconSnowflake", gradient: "snow" },
    75: { category: "snow", label: "Heavy snow", iconDay: "IconSnowflake", iconNight: "IconSnowflake", gradient: "snow" },
   

    // thunder
    95: { category: "thunder", label: "Thunderstorm", iconDay: "IconBolt", iconNight: "IconBolt", gradient: "thunder" },
};

export default WEATHER_CODE_MAP;