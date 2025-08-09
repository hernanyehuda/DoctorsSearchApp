export interface Doctor {
  id: number;
  fullName: string;
  mainSpecialty: string;
  address: string;
  phone: string;
  rating: number;
  totalRatings: number;
  promotionLevel: number;
  isActive: boolean;
  languages: string[];
}

export interface FilterOptions {
  showActiveOnly: boolean;
  showPayingOnly: boolean;
  sortBy: number;
}

export const SortOption = {
  RatingDesc: 0,
  Default: 1
} as const;

export type SortOptionType = typeof SortOption[keyof typeof SortOption];

export interface ContactForm {
  fullName: string;
  phone: string;
  email: string;
  doctorId: number;
}