import config from '../config/Index';

export default {
  log: (stringToShow: string) => `${new Date().toLocaleString('fr-FR', { timeZone: 'UTC' })}: ${stringToShow}`,
  newDate: () => `${new Date().toLocaleString('fr-FR', { timeZone: 'UTC' })}`,
  getApiUrl: () => process.env.apiUrl as string || config.api_url,
  getPort: () => process.env.PORT as string || config.port,
  getAuthorizedTokens: () => process.env?.APP_TOKEN?.split(';') || config.secret,
  app: null,
};