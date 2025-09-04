import axios from "axios"
import { TopicType } from "../types/topicType"


export default class TopicsServices {
    private apiUrl = 'http://localhost:3000/api'

    async getTopics(): Promise<TopicType[]> {
        const response = await axios.get(`${this.apiUrl}/topics`)
        return response.data.data
    }
}
