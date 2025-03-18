import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Existing tables remain unchanged
export const members = pgTable("members", {
  id: serial("id").primaryKey(),
  fullName: text("full_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  address: text("address").notNull(),
  membershipType: text("membership_type").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const donations = pgTable("donations", {
  id: serial("id").primaryKey(),
  amount: integer("amount").notNull(),
  donorName: text("donor_name").notNull(),
  email: text("email"),
  phone: text("phone"),
  message: text("message"),
  paymentMethod: text("payment_method").notNull(),
  paymentStatus: text("payment_status").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

// Newsletter subscribers table
export const subscribers = pgTable("subscribers", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  subscribed: boolean("subscribed").notNull().default(true),
  createdAt: timestamp("created_at").defaultNow()
});

// Admin table
export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: timestamp("created_at").defaultNow()
});

// Schema definitions
export const insertMemberSchema = createInsertSchema(members).omit({ 
  id: true,
  createdAt: true 
});

export const insertDonationSchema = createInsertSchema(donations).omit({ 
  id: true,
  createdAt: true,
  paymentStatus: true
});

export const insertContactSchema = createInsertSchema(contacts).omit({ 
  id: true,
  createdAt: true 
});

export const insertSubscriberSchema = createInsertSchema(subscribers).omit({
  id: true,
  createdAt: true,
  subscribed: true
}).extend({
  email: z.string().email("Invalid email address"),
  name: z.string().optional()
});

export const insertAdminSchema = createInsertSchema(admins).omit({
  id: true,
  createdAt: true
});

export const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Type definitions
export type InsertMember = z.infer<typeof insertMemberSchema>;
export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
export type InsertSubscriber = z.infer<typeof insertSubscriberSchema>;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;
export type LoginCredentials = z.infer<typeof loginSchema>;

export type Member = typeof members.$inferSelect;
export type Donation = typeof donations.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
export type Subscriber = typeof subscribers.$inferSelect;
export type Admin = typeof admins.$inferSelect;