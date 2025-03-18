import { type Member, type Donation, type Contact, type InsertMember, type InsertDonation, type InsertContact } from "@shared/schema";

export interface IStorage {
  // Members
  createMember(member: InsertMember): Promise<Member>;
  getMember(id: number): Promise<Member | undefined>;
  getAllMembers(): Promise<Member[]>;

  // Donations
  createDonation(donation: InsertDonation): Promise<Donation>;
  getDonation(id: number): Promise<Donation | undefined>;
  updateDonationStatus(id: number, status: string): Promise<Donation>;

  // Contacts
  createContact(contact: InsertContact): Promise<Contact>;
  getAllContacts(): Promise<Contact[]>;
}

export class MemStorage implements IStorage {
  private members: Map<number, Member>;
  private donations: Map<number, Donation>;
  private contacts: Map<number, Contact>;
  private currentMemberId: number;
  private currentDonationId: number;
  private currentContactId: number;

  constructor() {
    this.members = new Map();
    this.donations = new Map();
    this.contacts = new Map();
    this.currentMemberId = 1;
    this.currentDonationId = 1;
    this.currentContactId = 1;
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
}

export const storage = new MemStorage();
