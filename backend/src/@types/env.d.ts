export {};

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    HOST: string;
    PORT: string;
    ROUNDS: string;
    JWT_ACCESS_SECRET: string;
    JWT_REFRESH_SECRET: string;
    FRONTEND_URL: string;
    FRONTEND_ORIGINS: string;
    SMTP_PORT: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_NAME: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
    GOOGLE_CLIENT_ID: string;
    GOOGLE_CLIENT_SECRET: string;
    GOOGLE_CALLBACK_URL: string;
    FACEBOOK_APP_ID: string;
    FACEBOOK_APP_SECRET: string;
    FACEBOOK_CALLBACK_URL: string;
  }
}
