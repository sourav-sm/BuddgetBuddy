import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema'
// const sql = neon(process.env.DATABASE_URL);
// const sql = neon("postgresql://developersourav135:GDWbeuk6ZPv0@ep-royal-bread-48297123.us-east-2.aws.neon.tech/Expense-Tracker?sslmode=require");
const sql = neon(process.env.NEXT_PUBLIC_DATABASE_URL);
export const db = drizzle(sql,{schema});   

// import { neon } from '@neondatabase/serverless';
// import { drizzle } from 'drizzle-orm/neon-http';
// import * as schema from './schema';
// import * as dotenv from 'dotenv';

// // Load environment variables from .env.local
// dotenv.config({ path: '.env.local' });

// if (!process.env.DATABASE_URL) {
//   throw new Error("DATABASE_URL is not defined in the environment variables.");
// }

// const sql = neon(process.env.DATABASE_URL);
// export const db = drizzle(sql, { schema });
