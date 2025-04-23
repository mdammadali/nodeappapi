import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../.env') });

const env = process.env.NODE_ENV || 'development';
const devConfig = {
    mongodbUri: 'mongodb://localhost:27017/mern',
}
const baseConfig = {
    port: process.env.PORT || 3000,
    mongodbUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/mern',
};
const prodConfig = {
    mongodbUri: process.env.MONGODB_URI,
}
console.log(process.env.MONGODB_URI);

const config = {
    ...baseConfig,
    ...(env === 'development' ? devConfig : prodConfig),
}
export default config;