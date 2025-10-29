import { fetchWeatherApi } from 'openmeteo';
import UnitsConfModel from '@/models/UnitConfModel';

export default async function getForecast(latitude: number, longitude: number, unitConf: UnitsConfModel) {

const params = {
	"latitude": latitude,
	"longitude": longitude,
	"daily": ["apparent_temperature_max", "apparent_temperature_min", "weather_code"],
	"hourly": ["apparent_temperature", "weather_code", "wind_speed_10m"],
	"current": ["weather_code", "wind_speed_10m", "relative_humidity_2m", "temperature_2m", "apparent_temperature", "precipitation"],
	"temperature_unit": unitConf.temperature,
	"windspeed_unit": unitConf.windSpeed,
	"precipitation_unit": unitConf.precipitation,
};

if(unitConf.temperature !== "celsius"){
	params.temperature_unit = "fahrenheit";
}

if(unitConf.windSpeed !== "kmh"){
	params.windspeed_unit = "mph";
}

if(unitConf.precipitation !== "mm"){
	params.precipitation_unit = "inch";

}

const url = "https://api.open-meteo.com/v1/forecast";
const responses = await fetchWeatherApi(url, params);
// Process first location. Add a for-loop for multiple locations or weather models
const response = responses[0];

// Attributes for timezone and location
const utcOffsetSeconds = response.utcOffsetSeconds();


const current = response.current()!;
const hourly = response.hourly()!;
const daily = response.daily()!;

// Note: The order of weather variables in the URL query and the indices below need to match!
const weatherData = {
	current: {
		time: new Date((Number(current.time()) + utcOffsetSeconds) * 1000),
		weather_code: current.variables(0)!.value(),
		wind_speed_10m: current.variables(1)!.value(),
		relative_humidity_2m: current.variables(2)!.value(),
		temperature_2m: current.variables(3)!.value(),
		apparent_temperature: current.variables(4)!.value(),
		precipitation: current.variables(5)!.value(),
	},
	hourly: {
		time: [...Array((Number(hourly.timeEnd()) - Number(hourly.time())) / hourly.interval())].map(
			(_, i) => new Date((Number(hourly.time()) + i * hourly.interval() + utcOffsetSeconds) * 1000)
		),
		apparent_temperature: hourly.variables(0)!.valuesArray(),
		weather_code: hourly.variables(1)!.valuesArray(),
		wind_speed_10m: hourly.variables(2)!.valuesArray(),
	},
	daily: {
		time: [...Array((Number(daily.timeEnd()) - Number(daily.time())) / daily.interval())].map(
			(_, i) => new Date((Number(daily.time()) + i * daily.interval() + utcOffsetSeconds) * 1000)
		),
		apparent_temperature_max: daily.variables(0)!.valuesArray(),
		apparent_temperature_min: daily.variables(1)!.valuesArray(),
		weather_code: daily.variables(2)!.valuesArray(),
	},
};

return weatherData;


}