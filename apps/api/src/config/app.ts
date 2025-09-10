import { config } from '../config';

export const getApplicationUrl = () => {
    return `http://${config.HOST}:${config.PORT}`;
};