import * as Joi from 'joi';

export default Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  HOST: Joi.string(),
  PORT: Joi.number().port().default(5000),
  ROUNDS: Joi.number(),
  JWT_ACCESS_SECRET: Joi.string(),
  JWT_ACCESS_EXPIRES_IN: Joi.string(),
  JWT_ACCESS_MAX_AGE: Joi.number(),
  JWT_REFRESH_SECRET: Joi.string(),
  JWT_REFRESH_EXPIRES_IN: Joi.string(),
  FRONTEND_URL: Joi.string().uri(),
  FRONTEND_ORIGINS: Joi.string(),
  ADMINSITE_URL: Joi.string(),
  ADMINSITE_ORIGINS: Joi.string(),
  SMTP_PORT: Joi.number().port().default(587),
  SMTP_USER: Joi.string(),
  SMTP_PASS: Joi.string(),
  DB_HOST: Joi.string(),
  DB_PORT: Joi.number().port().default(5432),
  DB_NAME: Joi.string(),
  DB_USERNAME: Joi.string(),
  DB_PASSWORD: Joi.string(),
  GOOGLE_CLIENT_ID: Joi.string(),
  GOOGLE_CLIENT_SECRET: Joi.string(),
  GOOGLE_CALLBACK_URL: Joi.string().uri(),
  FACEBOOK_APP_ID: Joi.string(),
  FACEBOOK_APP_SECRET: Joi.string(),
  FACEBOOK_CALLBACK_URL: Joi.string().uri(),
});
