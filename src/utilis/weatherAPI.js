import axios from 'axios';

const API_KEY = "07570fa7635ca4b4abeec99c38732153";
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export async function fetchWeather(city) {
  if (!city) {
    throw new Error('City name is required');
  }
  const response = await axios.get(`${BASE_URL}/weather`, {
    params: {
      q: city,
      units: 'metric',
      appid: API_KEY,
    },
  });
    console.log("⚙️ [weatherAPI] response:", response.data);

  return response.data;
}