import { BrandType } from "../types/brandTypes"
import axios from "axios"

export default class BrandsServices {
    private apiUrl = import.meta.env.VITE_API_URL

    async getBrands(): Promise<BrandType[]> {
        const response = await axios.get(`${this.apiUrl}/brands`)
        return response.data
    }

    async getBrandById(id: string): Promise<BrandType> {
        const response = await axios.get(`${this.apiUrl}/brands/${id}`)
        return response.data
    }

    async createBrand(brand: BrandType): Promise<BrandType> {
        const response = await axios.post(`${this.apiUrl}/brands`, brand)
        return response.data
    }

    async updateBrand(id: string, brand: BrandType): Promise<BrandType> {
        const response = await axios.put(`${this.apiUrl}/brands/${id}`, brand)
        return response.data
    }

    async deleteBrand(id: string): Promise<void> {
        await axios.delete(`${this.apiUrl}/brands/${id}`)
    }
}

