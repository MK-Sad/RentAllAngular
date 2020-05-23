import { Rental } from './rental';

export interface Item {
    id: number;
    name: string;
    category: string;
    rentalPeriod: number;
    owner: string;
    description: string;
    available: boolean;
    rented: boolean;
    imageName: string;
    rental?: Rental;
  }