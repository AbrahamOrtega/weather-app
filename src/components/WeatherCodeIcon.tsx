import Image from "next/image";

export default function WeatherIcon({
  weatherCode,
  width,
  height,
}: {
  weatherCode: number;
  width: number;
  height: number;
}) {
  switch (weatherCode) {
    case 0:
      return (
        <Image
          src="/assets/icon-sunny.webp"
          alt="Sunny"
          width={width}
          height={height}
        />
      );
    case 1:
    case 2:
      return (
        <Image
          src="/assets/icon-partly-cloudy.webp"
          alt="Partly Cloudy"
          width={width}
          height={height}
        />
      );
    case 3:
      return (
        <Image
          src={"/assets/icon-overcast.webp"}
          alt="Overcast"
          width={width}
          height={height}
        />
      );
    case 45:
    case 48:
      return (
        <Image
          src="/assets/icon-fog.webp"
          alt="Fog"
          width={width}
          height={height}
        />
      );
    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return (
        <Image
          src="/assets/icon-drizzle.webp"
          alt="Drizzle"
          width={width}
          height={height}
        />
      );

    case 61:
    case 63:
    case 65:
    case 66:
    case 67:
    case 80:
    case 81:
    case 82:
      return (
        <Image
          src="/assets/icon-rain.webp"
          alt="Rain"
          width={width}
          height={height}
        />
      );
    case 71:
    case 73:
    case 75:
    case 77:
    case 85:
    case 86:
      return (
        <Image
          src="/assets/icon-snow.webp"
          alt="Snow"
          width={width}
          height={height}
        />
      );
    case 95:
    case 96:
    case 99:
      return (
        <Image
          src="/assets/icon-storm.webp"
          alt="Thunderstorm"
          width={width}
          height={height}
        />
      );
    default:
      return null;
  }
}
