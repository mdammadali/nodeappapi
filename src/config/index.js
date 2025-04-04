import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config({ path: path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../.env') });

const config = {
    port: process.env.PORT,
    mongodbUri: process.env.mongodbUri,
}
export default config;