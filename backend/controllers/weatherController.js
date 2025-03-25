import axios from "axios";

export const getWeather = async (req, res) => {
    try { 
      const cityName = req.params.cityName;
      const geo_response = await axios.get(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.WEATHER_API_KEY}`);
  
      const geo_coding =  geo_response.data[0];
  
      if(geo_coding.length === 0) {
          alert("City not found");
          return;
      }
      const { lat , lon } = geo_coding; 
  
      const weather_response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat.toFixed(2)}&lon=${lon.toFixed(2)}&appid=${process.env.WEATHER_API_KEY}`);
  
      const weather_data = await weather_response.data;

      const iconCode = weather_data.weather[0].icon;
      const iconURL = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      const Temp  = (weather_data.main.temp - 273).toFixed(1); 
      const humidity  = weather_data.weather[0].description; 
      const weather  = weather_data.weather[0].main;
      const feelsLike  = "Feels like " + (weather_data.main.feels_like - 273).toFixed(1) + " °C";
      const weatherIcon = iconURL;

      const weatherResponse = {
        temperature : Temp,
        humidity : humidity,
        weather : weather,
        feelsLike : feelsLike,
        weatherIcon : weatherIcon
      }
  
      res.status(200).json(weatherResponse);
  
    } catch (error) {
        res.status(400).send("error : "+ error.message);
    }
};
