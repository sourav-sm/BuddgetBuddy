import { serial, varchar,pgTable,integer} from "drizzle-orm/pg-core";

export const Budget=pgTable('budgets',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:integer('amount').notNull(),
    icon:varchar('icon'),
    createdBy:varchar('createdBy').notNull()
});

export const Expense=pgTable('expenses',{
    id:serial('id').primaryKey(),
    name:varchar('name').notNull(),
    amount:integer('amount',10,2).notNull().default(0),//(10,2) is the precision and scale
    budgetId:integer('budgetId').references(()=>Budget.id).notNull(),
    createdAt:varchar('createdAt').notNull(),
});
