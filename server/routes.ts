import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMemberSchema, insertDonationSchema, insertContactSchema, loginSchema, insertSubscriberSchema } from "@shared/schema";
import { z } from "zod";
import session from "express-session";
import MemoryStore from "memorystore";

const SessionStore = MemoryStore(session);

declare module "express-session" {
  interface SessionData {
    adminId?: number;
  }
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Session middleware
  app.use(
    session({
      cookie: { maxAge: 86400000 },
      store: new SessionStore({
        checkPeriod: 86400000 // prune expired entries every 24h
      }),
      resave: false,
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET || 'your-secret-key'
    })
  );

  // Admin authentication middleware
  const requireAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.session.adminId) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    next();
  };

  // Admin authentication routes
  app.post("/api/admin/login", async (req, res) => {
    try {
      const credentials = loginSchema.parse(req.body);
      const isValid = await storage.validateAdminCredentials(
        credentials.username,
        credentials.password
      );

      if (!isValid) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const admin = await storage.getAdminByUsername(credentials.username);
      req.session.adminId = admin!.id;
      res.json({ message: "Logged in successfully" });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid credentials format", errors: error.errors });
      } else {
        res.status(500).json({ message: "Login failed" });
      }
    }
  });

  app.post("/api/admin/logout", (req, res) => {
    req.session.destroy(() => {
      res.json({ message: "Logged out successfully" });
    });
  });

  // Protected admin routes
  app.get("/api/admin/members", requireAdmin, async (_req, res) => {
    try {
      const members = await storage.getAllMembers();
      res.json(members);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch members" });
    }
  });

  app.get("/api/admin/donations", requireAdmin, async (_req, res) => {
    try {
      const donations = await storage.getAllDonations();
      res.json(donations);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch donations" });
    }
  });

  app.get("/api/admin/contacts", requireAdmin, async (_req, res) => {
    try {
      const contacts = await storage.getAllContacts();
      res.json(contacts);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch contacts" });
    }
  });

  // Newsletter subscriber admin routes
  app.get("/api/admin/subscribers", requireAdmin, async (_req, res) => {
    try {
      const subscribers = await storage.getAllSubscribers();
      res.json(subscribers);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch subscribers" });
    }
  });

  // Newsletter subscription routes
  app.post("/api/subscribe", async (req, res) => {
    try {
      const subscriberData = insertSubscriberSchema.parse(req.body);

      // Check if already subscribed
      const existing = await storage.getSubscriberByEmail(subscriberData.email);
      if (existing) {
        if (existing.subscribed) {
          return res.status(400).json({ message: "Email already subscribed" });
        }
        // If previously unsubscribed, resubscribe them
        await storage.createSubscriber(subscriberData);
        return res.status(200).json({ message: "Successfully resubscribed" });
      }

      const subscriber = await storage.createSubscriber(subscriberData);
      res.status(201).json(subscriber);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid subscriber data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create subscriber" });
      }
    }
  });

  app.post("/api/unsubscribe", async (req, res) => {
    try {
      const { email } = req.body;
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      await storage.unsubscribe(email);
      res.json({ message: "Successfully unsubscribed" });
    } catch (error) {
      res.status(500).json({ message: "Failed to unsubscribe" });
    }
  });

  // Existing public routes
  app.post("/api/members", async (req, res) => {
    try {
      const memberData = insertMemberSchema.parse(req.body);
      const member = await storage.createMember(memberData);
      res.status(201).json(member);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid member data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create member" });
      }
    }
  });

  app.post("/api/donations", async (req, res) => {
    try {
      const donationData = insertDonationSchema.parse(req.body);
      const donation = await storage.createDonation(donationData);
      res.status(201).json(donation);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid donation data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create donation" });
      }
    }
  });

  app.patch("/api/donations/:id/status", requireAdmin, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status } = req.body;

      if (!['pending', 'completed', 'failed'].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
      }

      const donation = await storage.updateDonationStatus(id, status);
      res.json(donation);
    } catch (error) {
      res.status(500).json({ message: "Failed to update donation status" });
    }
  });

  app.post("/api/contacts", async (req, res) => {
    try {
      const contactData = insertContactSchema.parse(req.body);
      const contact = await storage.createContact(contactData);
      res.status(201).json(contact);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid contact data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create contact" });
      }
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}