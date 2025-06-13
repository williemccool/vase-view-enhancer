
import { Case, Client } from "@/types/documentTypes";

export const mockCases: Case[] = [
  {
    id: "case-1",
    name: "Property Dispute - ABC vs XYZ",
    clientName: "ABC Corporation",
    status: "active"
  },
  {
    id: "case-2", 
    name: "Employment Contract Review",
    clientName: "John Smith",
    status: "pending"
  },
  {
    id: "case-3",
    name: "Trademark Registration",
    clientName: "Tech Innovations Ltd",
    status: "active"
  },
  {
    id: "case-4",
    name: "Divorce Settlement",
    clientName: "Jane Doe",
    status: "closed"
  }
];

export const mockClients: Client[] = [
  {
    id: "client-1",
    name: "ABC Corporation",
    email: "contact@abc-corp.com",
    phone: "+1-555-0101"
  },
  {
    id: "client-2",
    name: "John Smith", 
    email: "john.smith@email.com",
    phone: "+1-555-0102"
  },
  {
    id: "client-3",
    name: "Tech Innovations Ltd",
    email: "info@techinnovations.com",
    phone: "+1-555-0103"
  },
  {
    id: "client-4",
    name: "Jane Doe",
    email: "jane.doe@email.com",
    phone: "+1-555-0104"
  },
  {
    id: "client-5",
    name: "Global Solutions Inc",
    email: "contact@globalsolutions.com",
    phone: "+1-555-0105"
  }
];
