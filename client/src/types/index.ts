// src/types/index.ts

export interface Product {
  _id?: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

export interface PortfolioImage {
  _id?: string;
  title: string;
  description: string;
  src: string;
}

export interface PortfolioVideo {
  _id?: string;
  title: string;
  description: string;
  embedUrl: string;
}

export interface ContactInfo {
  phone1?: string;
  phone2?: string;
  email1?: string;
  email2?: string;
  address?: string;
  whatsappNumber?: string;
}

export type FormDataType = Product | PortfolioImage | PortfolioVideo | Partial<ContactInfo>;

export interface CurrentFormState {
  type: string | null;
  data: FormDataType;
  isEditing: boolean;
}