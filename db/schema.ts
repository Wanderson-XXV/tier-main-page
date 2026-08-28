import { index, integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const lessonFeedback = sqliteTable("lesson_feedback", {
  id: text("id").primaryKey(),
  lessonId: text("lesson_id").notNull(),
  grade: text("grade").notNull(),
  moduleId: integer("module_id").notNull(),
  teacherEmail: text("teacher_email").notNull(),
  teacherName: text("teacher_name").notNull(),
  className: text("class_name").notNull(),
  taughtAt: text("taught_at").notNull(),
  completion: integer("completion").notNull(),
  engagement: integer("engagement").notNull(),
  timing: text("timing").notNull(),
  notes: text("notes").notNull(),
  strengths: text("strengths").notNull(),
  challenges: text("challenges").notNull(),
  adjustments: text("adjustments").notNull(),
  nextSteps: text("next_steps").notNull(),
  createdAt: text("created_at").notNull(),
});

export const tierUsers = sqliteTable("tier_users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  role: text("role").notNull().default("teacher"),
  active: integer("active").notNull().default(1),
  createdAt: text("created_at").notNull(),
});

export const tierSessions = sqliteTable("tier_sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => tierUsers.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull().unique(),
  expiresAt: text("expires_at").notNull(),
  createdAt: text("created_at").notNull(),
}, table => [
  index("idx_tier_sessions_expires_at").on(table.expiresAt),
  index("idx_tier_sessions_user_id").on(table.userId),
]);
