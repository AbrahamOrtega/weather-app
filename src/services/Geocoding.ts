
export default async function getGeocoding(search: string) {
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${search}&count=4&language=en&format=json`;
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}