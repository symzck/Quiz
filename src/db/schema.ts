import { relations } from 'drizzle-orm';
import { integer, pgTable, serial, text, timestamp, jsonb } from 'drizzle-orm/pg-core';

// Define the 'users' table.
export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  uid: text('uid').notNull().unique(), // Firebase Auth UID
  email: text('email').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// Bank Soal
export const questions = pgTable('questions', {
  id: serial('id').primaryKey(),
  soalId: text('soal_id').notNull().unique(), // Custom ID
  jenjang: text('jenjang'),
  mapel: text('mapel'),
  tingkat: text('tingkat'),
  tipe: text('tipe'), // PG, PGK, BS
  soal: text('soal').notNull(),
  stimulus: text('stimulus'),
  pilihan: jsonb('pilihan'),
  jawaban: jsonb('jawaban'), // Array for PGK, Number for PG/BS
  pembahasan: text('pembahasan'),
  topik: text('topik'),
  creatorUid: text('creator_uid').references(() => users.uid),
  createdAt: timestamp('created_at').defaultNow(),
});

// User Stats / Progress
export const userStats = pgTable('user_stats', {
  id: serial('id').primaryKey(),
  userId: integer('user_id')
    .references(() => users.id)
    .notNull(),
  quizAttempts: integer('quiz_attempts').default(0),
  lastActive: timestamp('last_active').defaultNow(),
});

// Relationships
export const usersRelations = relations(users, ({ many, one }) => ({
  createdQuestions: many(questions),
  stats: one(userStats, {
    fields: [users.id],
    references: [userStats.userId],
  }),
}));

export const questionsRelations = relations(questions, ({ one }) => ({
  author: one(users, {
    fields: [questions.creatorUid],
    references: [users.uid],
  }),
}));
