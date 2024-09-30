/** Database */
export const DB_CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING ||
  'postgresql://db_user:db_password@postgresql:5432/flight-search-db';
