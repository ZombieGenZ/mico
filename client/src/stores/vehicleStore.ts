import { create } from 'zustand';
import { Vehicle } from '../types/vehicleTypes';
import VehicleServices from '../services/vehicleServices';

interface VehicleState {
  vehicles: Vehicle[];
  isLoading: boolean;
  searchTerm: string;
  selectedCategory: string;
  selectedBrand: string;
  sortBy: string;
  fetchVehicles: () => Promise<void>;
  setSearchTerm: (term: string) => void;
  setSelectedCategory: (category: string) => void;
  setSelectedBrand: (brand: string) => void;
  setSortBy: (sort: string) => void;
  getFilteredVehicles: () => Vehicle[];
  addVehicle: (vehicle: Vehicle) => void;
  updateVehicle: (id: string, vehicle: Partial<Vehicle>) => void;
  deleteVehicle: (id: string) => void;
  getVehicleById: (id: string) => Vehicle | undefined;
}

const vehicleService = new VehicleServices();

export const useVehicleStore = create<VehicleState>((set, get) => ({
  vehicles: [], // Khởi tạo với array rỗng
  isLoading: false, // Trạng thái loading
  searchTerm: '',
  selectedCategory: '',
  selectedBrand: '',
  sortBy: 'title',
  
  fetchVehicles: async () => {
    set({ isLoading: true });
    try {
      const vehicles = await vehicleService.getVehicles();
      set({ vehicles, isLoading: false });
    } catch (error) {
      console.error('Lỗi khi tải danh sách xe:', error);
      set({ isLoading: false });
    }
  },
  
  setSearchTerm: (term) => set({ searchTerm: term }),
  setSelectedCategory: (category) => set({ selectedCategory: category }),
  setSelectedBrand: (brand) => set({ selectedBrand: brand }),
  setSortBy: (sort) => set({ sortBy: sort }),
  
  getFilteredVehicles: () => {
    const { vehicles, searchTerm, selectedCategory, selectedBrand, sortBy } = get();
    
    const filtered = vehicles.filter(vehicle => {
      const matchesSearch = vehicle.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          vehicle.subtitle.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = !selectedCategory || vehicle.category_id === selectedCategory;
      const matchesBrand = !selectedBrand || vehicle.brand_id === selectedBrand;
      
      return matchesSearch && matchesCategory && matchesBrand;
    });
    
    // Sort
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'title':
        default:
          return a.title.localeCompare(b.title);
      }
    });
    
    return filtered;
  },
  
  addVehicle: (vehicle) => set(state => ({ vehicles: [...state.vehicles, vehicle] })),
  updateVehicle: (id, updatedVehicle) => set(state => ({
    vehicles: state.vehicles.map(v => v._id === id ? { ...v, ...updatedVehicle } : v)
  })),
  deleteVehicle: (id) => set(state => ({ vehicles: state.vehicles.filter(v => v._id !== id) })),
  getVehicleById: (id: string) => get().vehicles.find(v => v._id === id),
}));