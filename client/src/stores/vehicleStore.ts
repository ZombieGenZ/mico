import { create } from 'zustand';
import { Vehicle } from '../lib/types';
import { vehicles as mockVehicles } from '../lib/mockData';

interface VehicleState {
  vehicles: Vehicle[];
  searchTerm: string;
  selectedCategory: string;
  selectedBrand: string;
  priceRange: [number, number];
  sortBy: string;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedBrand: (brand: string) => void;
  setPriceRange: (range: [number, number]) => void;
  setSortBy: (sort: string) => void;
  getFilteredVehicles: () => Vehicle[];
  addVehicle: (vehicle: Vehicle) => void;
  updateVehicle: (id: number, vehicle: Partial<Vehicle>) => void;
  deleteVehicle: (id: number) => void;
  getVehicleById: (id: number) => Vehicle | undefined;
}

export const useVehicleStore = create<VehicleState>((set, get) => ({
  vehicles: mockVehicles,
  searchTerm: '',
  selectedCategory: '',
  selectedBrand: '',
  priceRange: [0, 10000000000],
  sortBy: 'name',
  
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedBrand: (brand) => set({ selectedBrand: brand }),
  setPriceRange: (range) => set({ priceRange: range }),
  setSortBy: (sort) => set({ sortBy: sort }),
  
  getFilteredVehicles: () => {
    const { vehicles, searchTerm, selectedCategory, selectedBrand, priceRange, sortBy } = get();
    
    let filtered = vehicles.filter(vehicle => {
      const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || vehicle.category === selectedCategory;
      const matchesBrand = !selectedBrand || vehicle.brand === selectedBrand;
      const matchesPrice = vehicle.price >= priceRange[0] && vehicle.price <= priceRange[1];
      
      return matchesSearch && matchesCategory && matchesBrand && matchesPrice;
    });
    
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'year':
          return b.year - a.year;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });
    
    return filtered;
  },
  
  addVehicle: (vehicle) => set(state => ({ vehicles: [...state.vehicles, vehicle] })),
  updateVehicle: (id, updatedVehicle) => set(state => ({
    vehicles: state.vehicles.map(v => v.id === id ? { ...v, ...updatedVehicle } : v)
  })),
  deleteVehicle: (id) => set(state => ({ vehicles: state.vehicles.filter(v => v.id !== id) })),
  getVehicleById: (id) => get().vehicles.find(v => v.id === id),
}));