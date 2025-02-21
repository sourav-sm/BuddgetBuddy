
/**@type {import("drizzle-kit").Config} */
export default {
    schema:"./utils/schema.js",
    dialect:'postgresql',
    dbCredentials:{
        // url:process.env.DATABASE_URL,
        url:"postgresql://developersourav135:GDWbeuk6ZPv0@ep-royal-bread-48297123.us-east-2.aws.neon.tech/Expense-Tracker?sslmode=require"
    },
};
