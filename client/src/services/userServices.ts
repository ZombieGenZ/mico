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

    async logout(refresh_token: string) {
        const response = await axios.delete(`${this.apiUrl}/users/logout`, {
            data: {
                refresh_token: refresh_token
            },
            headers: {
                'Content-Type': 'application/json'
            }
        })
        return response.data
    }

    async authenticAccessToken(accessToken: string, refresh_token: string) {
        const response = await axios.post(`${this.apiUrl}/users/verify-token`,
            {
                refresh_token: refresh_token
            },
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                    'Content-Type': 'application/json'
                }
            })
        return response.data
    }
}

