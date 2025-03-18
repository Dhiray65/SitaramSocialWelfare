import { type Member, type Donation, type Contact, type Admin, type InsertMember, type InsertDonation, type InsertContact, type InsertAdmin } from "@shared/schema";
import bcrypt from "bcrypt";

export interface IStorage {
  // Members
  createMember(member: InsertMember): Promise<Member>;
  getMember(id: number): Promise<Member | undefined>;
  getAllMembers(): Promise<Member[]>;

  // Donations
  createDonation(donation: InsertDonation): Promise<Donation>;
  getDonation(id: number): Promise<Donation | undefined>;
  updateDonationStatus(id: number, status: string): Promise<Donation>;
  getAllDonations(): Promise<Donation[]>;

  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;

  // Admin
  createAdmin(admin: InsertAdmin): Promise<Admin>;
  getAdminByUsername(username: string): Promise<Admin | undefined>;
  validateAdminCredentials(username: string, password: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private members: Map<number, Member>;
  private donations: Map<number, Donation>;
  private contacts: Map<number, Contact>;
  private admins: Map<number, Admin>;
  private currentMemberId: number;
  private currentDonationId: number;
  private currentContactId: number;
  private currentAdminId: number;

  constructor() {
    this.members = new Map();
    this.donations = new Map();
    this.contacts = new Map();
    this.admins = new Map();
    this.currentMemberId = 1;
    this.currentDonationId = 1;
    this.currentContactId = 1;
    this.currentAdminId = 1;

    // Create default admin account
    this.createAdmin({
      username: 'admin',
      password: 'admin123'
    }).catch(console.error);
  }

  // Members
  async createMember(member: InsertMember): Promise<Member> {
    const id = this.currentMemberId++;
    const newMember = { 
      ...member, 
      id,
      createdAt: new Date()
    };
    this.members.set(id, newMember);
    return newMember;
  }

  async getMember(id: number): Promise<Member | undefined> {
    return this.members.get(id);
  }

  async getAllMembers(): Promise<Member[]> {
    return Array.from(this.members.values());
  }

  // Donations
  async createDonation(donation: InsertDonation): Promise<Donation> {
    const id = this.currentDonationId++;
    const newDonation = {
      ...donation,
      id,
      paymentStatus: 'pending',
      createdAt: new Date()
    };
    this.donations.set(id, newDonation);
    return newDonation;
  }

  async getDonation(id: number): Promise<Donation | undefined> {
    return this.donations.get(id);
  }

  async getAllDonations(): Promise<Donation[]> {
    return Array.from(this.donations.values());
  }

  async updateDonationStatus(id: number, status: string): Promise<Donation> {
    const donation = this.donations.get(id);
    if (!donation) {
      throw new Error('Donation not found');
    }
    const updatedDonation = { ...donation, paymentStatus: status };
    this.donations.set(id, updatedDonation);
    return updatedDonation;
  }

  // Contacts
  async createContact(contact: InsertContact): Promise<Contact> {
    const id = this.currentContactId++;
    const newContact = {
      ...contact,
      id,
      createdAt: new Date()
    };
    this.contacts.set(id, newContact);
    return newContact;
  }

  async getAllContacts(): Promise<Contact[]> {
    return Array.from(this.contacts.values());
  }

  // Admin
  async createAdmin(admin: InsertAdmin): Promise<Admin> {
    const id = this.currentAdminId++;
    const hashedPassword = await bcrypt.hash(admin.password, 10);
    const newAdmin = {
      ...admin,
      password: hashedPassword,
      id,
      createdAt: new Date()
    };
    this.admins.set(id, newAdmin);
    return newAdmin;
  }

  async getAdminByUsername(username: string): Promise<Admin | undefined> {
    return Array.from(this.admins.values()).find(admin => admin.username === username);
  }

  async validateAdminCredentials(username: string, password: string): Promise<boolean> {
    const admin = await this.getAdminByUsername(username);
    if (!admin) return false;
    return bcrypt.compare(password, admin.password);
  }
}

export const storage = new MemStorage();