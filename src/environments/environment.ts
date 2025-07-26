export const environment = {
  production: false,
  apiKey: process.env['NG_APP_CHAVE_DE_API'] || '',
  weatherApiUrl: 'https://api.weatherapi.com/v1'
};