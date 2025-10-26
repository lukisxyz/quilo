import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  lastLoginAt: integer('last_login_at', { mode: 'timestamp' }).notNull(),
});
export type NewUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

export const wallets = sqliteTable('wallets', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  walletType: text('wallet_type', { enum: ['solana', 'ethereum'] }).notNull(),
  walletAddress: text('wallet_address').notNull().unique(),
  isPrimary: integer('is_primary', { mode: 'boolean' }).notNull().default(false),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});
export type NewWallet = typeof wallets.$inferInsert;
export type Wallet = typeof wallets.$inferSelect;

export const sessions = sqliteTable('sessions', {
  id: text('id').primaryKey(),
  userId: integer('user_id').notNull().references(() => users.id, { onDelete: 'cascade' }),
  walletId: integer('wallet_id').notNull().references(() => wallets.id, { onDelete: 'cascade' }),
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
});
export type NewSession = typeof sessions.$inferInsert;
export type Session = typeof sessions.$inferSelect;
