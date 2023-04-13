import dotenv from 'dotenv';
import path from 'path';

export default function setup() {
  const envPath = path.join(__dirname, '../.env.test');

  console.log(`jest global setup:load env(${envPath})`);

  dotenv.config({
    path: envPath,
    override: true,
  });
}
