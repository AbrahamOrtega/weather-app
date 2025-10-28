
export default interface WeatherModel {
  current: {
        time: Date;
        weather_code: number;
        wind_speed_10m: number;
        relative_humidity_2m: number;
        temperature_2m: number;
        apparent_temperature: number;
        precipitation: number;
    };
    hourly: {
        time: Date[];
        apparent_temperature: Float32Array<ArrayBufferLike> | null;
        weather_code: Float32Array<ArrayBufferLike> | null;
        wind_speed_10m: Float32Array<ArrayBufferLike> | null;
    };
    daily: {
        time: Date[];
        apparent_temperature_max: Float32Array<ArrayBufferLike> | null;
        apparent_temperature_min: Float32Array<ArrayBufferLike> | null;
        weather_code: Float32Array<ArrayBufferLike> | null;
    };
}