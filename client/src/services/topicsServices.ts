import axios, { AxiosError } from "axios"
import { TopicType } from "../types/topicType"

export default class TopicsServices {
    private apiUrl = 'http://localhost:3000/api'

    async getTopics(): Promise<TopicType[]> {
        try {
            const response = await axios.get(`${this.apiUrl}/topics`)
            return response.data.data || []
        } catch (error) {
            console.error('Error fetching topics:', error)
            throw error
        }
    }

    async getTopicById(id: string): Promise<TopicType> {
        try {
            const response = await axios.get(`${this.apiUrl}/topics/${id}`)
            return response.data.data
        } catch (error) {
            console.error(`Error fetching topic with id ${id}:`, error)
            throw error
        }
    }

    async createTopic(topicData: Omit<TopicType, 'id' | 'createdAt' | 'updatedAt'>, accessToken: string): Promise<TopicType> {
        try {
            const response = await axios.post(
                `${this.apiUrl}/topics`,
                topicData,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            return response.data.data
        } catch (error) {
            this.handleError(error, 'create topic')
            throw error
        }
    }

    async updateTopic(id: string, topicData: Partial<TopicType>, accessToken: string): Promise<TopicType> {
        try {
            const response = await axios.put(
                `${this.apiUrl}/topics/${id}`,
                topicData,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
            return response.data.data
        } catch (error) {
            this.handleError(error, 'update topic')
            throw error
        }
    }

    async deleteTopic(id: string, accessToken: string): Promise<void> {
        try {
            await axios.delete(
                `${this.apiUrl}/topics/${id}`,
                {
                    headers: {
                        'Authorization': `Bearer ${accessToken}`,
                        'Content-Type': 'application/json'
                    }
                }
            )
        } catch (error) {
            this.handleError(error, 'delete topic')
            throw error
        }
    }

    private handleError(error: unknown, action: string): void {
        if (axios.isAxiosError(error)) {
            const axiosError = error as AxiosError<{ message?: string }>
            const errorMessage = axiosError.response?.data?.message || `Failed to ${action}`
            throw new Error(errorMessage)
        }
        throw new Error(`An unexpected error occurred while trying to ${action}`)
    }
}
