
export interface Case {
  id: string;
  name: string;
  clientName: string;
  status: "active" | "pending" | "closed";
}

export interface Client {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface EnhancedSampleDocument {
  id: string;
  name: string;
  originalFileName: string;
  type: string;
  content: string;
  uploadDate: string;
  caseId?: string;
  clientId?: string;
  caseName?: string;
  clientName?: string;
}
