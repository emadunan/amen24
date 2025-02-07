declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production' | 'test';
    PORT: string;
    HOST: string;
    DB_NAME: string;
    DB_HOST: string;
    DB_PORT: string;
    DB_USERNAME: string;
    DB_PASSWORD: string;
  }
}
