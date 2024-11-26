import { jest } from "@jest/globals";
import {
    fetchWeatherData,
    kelvinToCelsius,
    transformWeatherData,
    sendData
} from "./weatherService.js";

describe("Weather Service Tests", () => {
  // Test temperature conversion
  test("converts Kelvin to Celsius correctly", () => {
    expect(kelvinToCelsius(273.15)).toBe(0);
    expect(kelvinToCelsius(283.15)).toBe(10);
    expect(kelvinToCelsius(293.15)).toBe(20);
  });

  test("transforms weather data correctly", () => {
    const mockData = {
      name: "London",
      main: {
        temp: 283.15,
        humidity: 70,
      },
      weather: [
        {
          description: "clear sky",
        },
      ],
      wind: {
        speed: 5.1,
      },
    };

    const transformed = transformWeatherData(mockData);

    expect(transformed).toHaveProperty("date");
    expect(transformed.city).toBe("London");
    expect(transformed.temperatureC).toBe(10);
    expect(transformed.weatherDescription).toBe("clear sky");
    expect(transformed.humidity).toBe(70);
    expect(transformed.windSpeed).toBe(5.1);
  });

  test("handles API errors correctly", async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error("API Error")));

    await expect(fetchWeatherData("London")).rejects.toThrow(
      "Failed to fetch weather data"
    );
  });
});
