import { Handler } from "@netlify/functions";
import fetch from 'node-fetch'
const API_KEY = process.env.OPEN_WEATHER_API;

const handler: Handler = async (event, context) => {
  const params = event.queryStringParameters;
  console.log(params);
  const latitude = event.queryStringParameters.latitude;
  const longitude = event.queryStringParameters.longitude;
  const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

  return fetch(API_ENDPOINT, { headers: { Accept: "application/json" } })
    .then((response) => response.json())
    .then((data) => ({
      statusCode: 200,
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }))
    .catch((error) => ({ statusCode: 422, body: String(error) }));
};

export { handler };
