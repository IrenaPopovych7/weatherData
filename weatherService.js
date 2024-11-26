import fetch from "node-fetch";
import dotenv from "dotenv";

dotenv.config();

const endPoint_api = "https://6742ea94b7464b1c2a630b93.mockapi.io/test/weather";
const apiKey = process.env.OPENWEATHER_API_KEY || "c72be1d90e903d5db6bd596f4657c265";

async function fetchWeatherData(city) {
  const api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(api);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching weather data: ${error}`);
    throw error;
  }
}

function kelvinToCelsius(kelvin) {
  return Number((kelvin - 273.15).toFixed(2));
}

function transformWeatherData(data) {
  return {
    date: new Date().toISOString(),
    city: data.name,
    temperatureC: kelvinToCelsius(data.main.temp),
    weatherDescription: data.weather[0].description,
    humidity: data.main.humidity,
    windSpeed: data.wind.speed,
  };
}

async function sendData(data) {
  try {
    const sendDataToMockEndpoint = await fetch(endPoint_api, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!sendDataToMockEndpoint.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    };

    return sendDataToMockEndpoint.json();
  } catch (error) {
    console.error(`Erorr occured on stage of sending data to endpont. ${error}`);   
  }
}

export async function processWeatherData(city) {
  try {

    const rawData = await fetchWeatherData(city);
    console.log("Raw weather data fetched successfully");

    const transformedData = transformWeatherData(rawData);
    console.log("Data transformed successfully");

    const result = await sendData(transformedData);
    console.log("Data sent to mock API successfully");
    console.log("Saved entity ID:", result.id);

    return result;
  } catch (error) {
    console.error("Error in weather data processing:", error);
    throw error;
  }
}

    processWeatherData('London')
        .then(result => {
            console.log('Process completed successfully');
            console.log('Saved entity ID:', result.id);
        })
        .catch(error => {
            console.error('Process failed:', error);
            process.exit(1);
        });