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
  _id?: string;
  phone1?: string;
  phone2?: string;
  email1?: string;
  email2?: string;
  address?: string;
  whatsappNumber?: string;
}