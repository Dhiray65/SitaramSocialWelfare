import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

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

export type InsertMember = z.infer<typeof insertMemberSchema>;
export type InsertDonation = z.infer<typeof insertDonationSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;

export type Member = typeof members.$inferSelect;
export type Donation = typeof donations.$inferSelect;
export type Contact = typeof contacts.$inferSelect;
