import { config } from 'dotenv';
import { resolve } from 'path';
import { DataSource, type DataSourceOptions } from 'typeorm';

const currentEnv = process.env.NODE_ENV;
const path = resolve(__dirname, '..', '..', `.env.${currentEnv}`);

config({ path });

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  migrations: ['**/_migrations/*.ts'],
  entities: ['**/*.entity.ts'],
  subscribers: ['**/*.subscriber.ts'],
  synchronize: false,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
