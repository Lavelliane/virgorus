export default interface Package {
  id?: number;
  name?: string;
  description?: string;
  type?: string;
  location?: string;
  duration?: string;
  cancellation?: string;
  availability?: string;
  language?: string;
  notice?: string;
  photos?: string[];
  inclusions?: string[];
  exclusions?: string[];
  rates?: Rates[];
}

interface Rates {
  id?: number;
  numberOfPax?: string;
  ratePerPax?: string;
  packageId?: number;
}

export type CatalogPackage = {
  id: number;
  name: string;
  description: string;
  type: string;
  rate: string;
  photos: string[]
};
