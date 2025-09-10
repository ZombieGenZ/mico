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

    async createBrand(accessToken: string, brand: BrandType): Promise<BrandType> {
        const response = await axios.post(`${this.apiUrl}/brands`, brand, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
        return response.data.data

    }

    async updateBrand(id: string, brand: BrandType, accessToken: string): Promise<BrandType> {
        const response = await axios.put(`${this.apiUrl}/brands/${id}`, brand, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
        return response.data.data
    }

    async deleteBrand(id: string, accessToken: string): Promise<void> {
        await axios.delete(`${this.apiUrl}/brands/${id}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
    }
}

