import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Gallery from '@/components/Gallery';
import Programme from '@/components/Programme';
import Costs from '@/components/Costs';
import Accommodation from '@/components/Accommodation';
import Register from '@/components/Register';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import { BookingProvider } from '@/context/BookingContext';

export default function Home() {
  return (
    <BookingProvider>
      <Navbar />
      <Hero />
      <Gallery />
      <Programme />
      <Costs />
      <Accommodation />
      <Register />
      <FAQ />
      <Footer />
    </BookingProvider>
  );
}
