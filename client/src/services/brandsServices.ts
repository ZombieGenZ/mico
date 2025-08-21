import { BrandType } from "../types/brandTypes"
import axios from "axios"

export default class BrandsServices {
    private apiUrl = 'http://localhost:3000/api'

    async getBrands(): Promise<BrandType[]> {
        const response = await axios.get(`${this.apiUrl}/brands`)
        return response.data.data
    }

    async getBrandById(id: string): Promise<BrandType> {
        const response = await axios.get(`${this.apiUrl}/brands/${id}`)
        return response.data.data

    }

    async createBrand(brand: BrandType): Promise<BrandType> {
        const response = await axios.post(`${this.apiUrl}/brands`, brand)
        return response.data.data

    }

    async updateBrand(id: string, brand: BrandType): Promise<BrandType> {
        const response = await axios.put(`${this.apiUrl}/brands/${id}`, brand)
        return response.data.data
    }

    async deleteBrand(id: string): Promise<void> {
        await axios.delete(`${this.apiUrl}/brands/${id}`)
    }
}

