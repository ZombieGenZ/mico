import axios from "axios"
import { UserType } from "../types/userTypes"
import { TokenResponse } from "../types/tokenResponse"

export default class UserServices {
    private apiUrl = 'http://localhost:3000/api'

    async login(email: string, password: string): Promise<TokenResponse> {
        const response = await axios.post(`${this.apiUrl}/users/login`, { email, password })
        return response.data
    }

    async getUserInfo(accessToken: string): Promise<UserType> {
        const response = await axios.get(`${this.apiUrl}/users/infomation`, {
                                        headers: {
                                            'Authorization': `Bearer ${accessToken}`,
                                            'Content-Type': 'application/json'
                                        }
                                    })
        return response.data.infomation
    }

    async authenticAccessToken(accessToken: string) {
        const response = await axios.post(`${this.apiUrl}/users/verify-token`, accessToken)
        return response.data
    }
}

