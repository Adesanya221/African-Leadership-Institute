'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

export type AccommodationOption =
  | ''
  | 'Victoria Falls Estates (Self-Catering Apartments)'
  | 'Zambezi Boutique Lodge'
  | 'Victoria Falls Safari Lodge (Conference Venue)'
  | '5-Star Partner Hotels (Enquire)';

interface BookingContextType {
  selectedAccommodation: AccommodationOption;
  setSelectedAccommodation: (option: AccommodationOption) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [selectedAccommodation, setSelectedAccommodation] = useState<AccommodationOption>('');

  return (
    <BookingContext.Provider value={{ selectedAccommodation, setSelectedAccommodation }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
