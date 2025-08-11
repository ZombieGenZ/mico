import React from 'react';
import Hero from '../components/home/Hero';
import FeaturedVehicles from '../components/home/FeaturedVehicles';
import Services from '../components/home/Services';
import Statistics from '../components/home/Statistics';

const Home: React.FC = () => {
  return (
    <div>
      <Hero />
      <Services />
      <FeaturedVehicles />
      <Statistics />
    </div>
  );
};

export default Home;