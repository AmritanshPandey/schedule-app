
import * as TablerIcons from "@tabler/icons-react";

export const Icon = ({
  name,
  size = 24,
  stroke = 1.5,
  strokeWidth, 
  color = "currentColor",
  className,
  title,
  ...rest
}) => {
  if (!name) {
    // nothing provided — render help icon
    const Help = TablerIcons.IconHelpCircle;
    return <Help size={size} strokeWidth={strokeWidth ?? stroke} color={color} className={className} title={title} {...rest} />;
  }

  // canonicalize incoming name: accept "IconBarbell", "barbell", "bar-bell", "bar_bell"
  const normalize = (s) =>
    String(s)
      .trim()
      .replace(/[-_]+/g, " ")
      .replace(/\s+/g, " ")
      .toLowerCase();

  const toPascal = (s) =>
    s
      .split(" ")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("");

  // explicit alias map for dataset keys you actually use
  const aliases = {
    // workouts
    gym: "IconBarbell",
    run: "IconRun",
    bike: "IconBike",
    rest: "IconZzz",
    food: "IconSalad",
    book: "IconNotebook",
    laptop: "IconDeviceLaptop",
    briefcase: "IconBriefcase",
    project: "IconCode",
    gamepad: "IconDeviceGamepad2",
    movie: "IconMovie",
    design: "IconEdit",


    // weather 
    sun: "IconSun",
    cloud: "IconCloud",
    cloudRain: "IconCloudRain",
    cloudSnow: "IconCloudSnow",
    storm: "IconCloudStorm",
    wind: "IconWind",
    snowflake: "IconSnowflake",
    haze: "IconMist",
    moonStars: "IconMoonStars",
  };

  const raw = String(name);
  // 1) if user passed an exact Tabler export name (IconSomething), use it
  if (/^Icon[A-Z]/.test(raw)) {
    const TablerComp = TablerIcons[raw];
    if (TablerComp) {
      return <TablerComp size={size} strokeWidth={strokeWidth ?? stroke} color={color} className={className} title={title} aria-hidden={!title} role={title ? "img" : undefined} {...rest} />;
    }
  }

  // 2) try alias map
  const key = normalize(raw);
  const alias = aliases[raw] || aliases[key];
  if (alias && TablerIcons[alias]) {
    const Comp = TablerIcons[alias];
    return <Comp size={size} strokeWidth={strokeWidth ?? stroke} color={color} className={className} title={title} aria-hidden={!title} role={title ? "img" : undefined} {...rest} />;
  }

  // 3) attempt auto-resolve: "barbell" -> "IconBarbell"
  const candidate = `Icon${toPascal(key)}`; // e.g. IconBarbell, IconDeviceLaptop
  if (TablerIcons[candidate]) {
    const Auto = TablerIcons[candidate];
    return <Auto size={size} strokeWidth={strokeWidth ?? stroke} color={color} className={className} title={title} aria-hidden={!title} role={title ? "img" : undefined} {...rest} />;
  }

  // 4) last fallback - help icon and dev warning
  if (process.env.NODE_ENV !== "production") {
    // eslint-disable-next-line no-console
    console.warn(`[Icon] unknown icon name: "${name}". Tried aliases and auto-resolve -> "${candidate}". Falling back to IconHelpCircle.`);
  }

  const Help = TablerIcons.IconHelpCircle;
  return <Help size={size} strokeWidth={strokeWidth ?? stroke} color={color} className={className} title={title} aria-hidden={!title} role={title ? "img" : undefined} {...rest} />;
};

export default Icon;


