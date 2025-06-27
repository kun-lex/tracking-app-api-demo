import { config } from 'dotenv';
import { envValidation } from '../validations';
import logger from './logging';
config();

const { value: envVars, error } = envValidation.validate(process.env);
if (error) {
  logger.error(error);
}
export const DB_CONNECTION: string = envVars.DB_CONNECTION ;
export const PORT: number = parseInt(envVars.PORT );
export const NODE_ENV: string = envVars.NODE_ENV ;
export const SERVER_CALLBACK_URL = process.env.SERVER_CALLBACK_URL
export const REDIS_URI = process.env.REDIS_URI;
export const  HOST = process.env.HOST || 'localhost';


export const cspOptions = {
  directives: {
    defaultSrc: ["'self'"],
    styleSrc: ["'self'", "'unsafe-inline'"],
    scriptSrc: ["'self'", "'unsafe-inline'"],
    fontSrc: ["'self'", 'fonts.gstatic.com'],
  },
};