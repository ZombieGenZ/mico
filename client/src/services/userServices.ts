import axios from "axios"
import { UserType } from "../types/userTypes"

export default class UserServices {
    private apiUrl = 'http://localhost:3000/api'

    async login(email: string, password: string): Promise<UserType> {
        const response = await axios.post(`${this.apiUrl}/users/login`, { email, password })
        return response.data
    }

    async getUserInfo(accessToken: number): Promise<UserType> {
        const response = await axios.get(`${this.apiUrl}/users/infomation`, {
                                        headers: {
                                            "Authorization": accessToken,
                                        }
                                    })
        return response.data
    }
}

