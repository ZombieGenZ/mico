import { Vehicle } from "../types/vehicleTypes"
import axios from "axios"

export default class VehicleServices {
    private apiUrl = 'http://localhost:3000/api'

    async getVehicles(): Promise<Vehicle[]> {
        const response = await axios.get(`${this.apiUrl}/products`)
        return response.data.data
    }

    async getVehicleById(id: string): Promise<Vehicle> {
        const response = await axios.get(`${this.apiUrl}/vehicles/${id}`)
        return response.data
    }

    async createVehicle(vehicle: Vehicle): Promise<Vehicle> {
        const response = await axios.post(`${this.apiUrl}/vehicles`, vehicle)
        return response.data
    }

    async updateVehicle(id: string, vehicle: Vehicle): Promise<Vehicle> {
        const response = await axios.put(`${this.apiUrl}/vehicles/${id}`, vehicle)
        return response.data
    }

    async deleteVehicle(id: string): Promise<void> {
        await axios.delete(`${this.apiUrl}/vehicles/${id}`)
    }
}