import path from 'path';

export function isProduction() {
  return process.env.NODE_ENV === 'production';
}

export const PUBLIC_PATH =
  process.env.NODE_ENV === 'production'
    ? path.join(__dirname, '../../public')
    : path.join(__dirname, '../public');
