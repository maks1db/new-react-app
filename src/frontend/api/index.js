import axios from 'axios';
import config from '../../config.json';

let API_PREFIX = '';
if (process.env.DEV || !process.env.BROWSER){
    API_PREFIX = `http://localhost:${config.port}`;
}

API_PREFIX += '/api/v1';
