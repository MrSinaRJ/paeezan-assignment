export interface AppConfig {
  app: {
    name: string;
    version: string;
    port: number;
    env: string;
    corsOrigin: string;
    corsMethods: string;
  };
}

const configuration = (): AppConfig => ({
  app: {
    name: process.env.APP_NAME || 'Numbers to Words API',
    version: process.env.APP_VERSION || '0.0.1',
    port: parseInt(process.env.PORT || '3000', 10),
    env: process.env.NODE_ENV || 'development',
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    corsMethods: process.env.CORS_METHODS || 'GET,POST',
  },
});

export default configuration;
