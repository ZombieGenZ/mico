import { Vehicle, TechnicalInformationType, Features, ImageType } from "../types/vehicleTypes"
import axios from "axios"

export default class VehicleServices {
    private apiUrl = 'http://localhost:3000/api'

    async getVehicles(): Promise<Vehicle[]> {
        const response = await axios.get(`${this.apiUrl}/products`)
        return response.data.data
    }

    async createVehicle(
        title: string,
        subtitle: string,
        technical_information: TechnicalInformationType[],
        features: Features[],
        category_id: string,
        brand_id: string,
        in_stock: boolean,
        is_new: boolean,
        is_used: boolean,
        preview: ImageType[],
        accessToken: string
    ) {
        const response = await axios.post(
            `${this.apiUrl}/products`,
            {
                title,
                subtitle,
                technical_information,
                features,
                category_id,
                brand_id,
                in_stock,
                is_new,
                is_used,
                preview
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        return response.data
    }

    async updateVehicle(
        id: string,
        title: string,
        subtitle: string,
        technical_information: TechnicalInformationType[],
        features: Features[],
        category_id: string,
        brand_id: string,
        in_stock: boolean,
        is_new: boolean,
        is_used: boolean,
        preview: ImageType[],
        accessToken: string
    ) {
        const response = await axios.put(
            `${this.apiUrl}/products/${id}`,
            {
                title,
                subtitle,
                technical_information,
                features,
                category_id,
                brand_id,
                in_stock,
                is_new,
                is_used,
                preview
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        return response.data
    }

    async deleteVehicle(id: string, accessToken: string): Promise<void> {
        await axios.delete(`${this.apiUrl}/products/${id}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
    }
}