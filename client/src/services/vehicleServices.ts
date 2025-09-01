import { Vehicle, TechnicalInformationType, Features } from "../types/vehicleTypes"
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
        preview: File[],
        accessToken: string
    ) {
        const formData = new FormData()
        
        formData.append('title', title)
        formData.append('subtitle', subtitle)
        
        // Append technical_informations as individual array items
        technical_information.forEach((tech, index) => {
            formData.append(`technical_informations[${index}][code]`, tech.code)
            formData.append(`technical_informations[${index}][name]`, tech.name)
            formData.append(`technical_informations[${index}][value]`, tech.value)
            formData.append(`technical_informations[${index}][index]`, tech.index.toString())
        })
        
        // Append features as individual array items
        features.forEach((feature, index) => {
            formData.append(`features[${index}][value]`, feature.value)
            formData.append(`features[${index}][index]`, feature.index.toString())
        })
        
        formData.append('category_id', category_id)
        formData.append('brand_id', brand_id)
        formData.append('in_stock', in_stock.toString())
        formData.append('is_new', is_new.toString())
        formData.append('is_used', is_used.toString())
        
        // Append files
        preview.forEach((file) => {
            formData.append('preview', file)
        })

        const response = await axios.post(
            `${this.apiUrl}/products`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
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
        accessToken: string,
        preview?: File[]
    ) {
        const formData = new FormData()
        
        formData.append('title', title)
        formData.append('subtitle', subtitle)
        
        // Append technical_informations as individual array items
        technical_information.forEach((tech, index) => {
            formData.append(`technical_informations[${index}][code]`, tech.code)
            formData.append(`technical_informations[${index}][name]`, tech.name)
            formData.append(`technical_informations[${index}][value]`, tech.value)
            formData.append(`technical_informations[${index}][index]`, tech.index.toString())
        })
        
        // Append features as individual array items
        features.forEach((feature, index) => {
            formData.append(`features[${index}][value]`, feature.value)
            formData.append(`features[${index}][index]`, feature.index.toString())
        })
        
        formData.append('category_id', category_id)
        formData.append('brand_id', brand_id)
        formData.append('in_stock', in_stock.toString())
        formData.append('is_new', is_new.toString())
        formData.append('is_used', is_used.toString())
        
        // Append files if provided (optional for update)
        if (preview && preview.length > 0) {
            preview.forEach((file) => {
                formData.append('preview', file)
            })
        }

        const response = await axios.put(
            `${this.apiUrl}/products/${id}`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data'
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