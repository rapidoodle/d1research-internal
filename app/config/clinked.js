import dotenv from 'dotenv';

dotenv.config();

const config = {
  username: process.env.CLINKED_USERNAME,
  password: process.env.CLINKED_PASSWORD,
  baseURL: 'https://api.clinked.com',
  defaultGroup: 107741,
};

export default config;
