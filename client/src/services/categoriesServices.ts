import axios from "axios";
//import { CategoryType } from "../types/categoriesTypes";

export default class CategoriesServices {
    private apiUrl = 'http://localhost:3000/api'

    async getCategories() {
        const response = await axios.get(`${this.apiUrl}/categories`)
        return response.data?.data
    }

    async createCategory(name: string, index: number, accessToken: string) {
        const response = await axios.post(
            `${this.apiUrl}/categories`,
            {
                name: name,
                index: index
            },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        console.log(response.data)
        return response.data
    }
}