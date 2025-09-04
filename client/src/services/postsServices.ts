import axios from "axios"
import { PostType } from "../types/postTypes"
import Cookies from "js-cookie"

export interface CreateUpdatePostData {
    _id?: string
    title: string
    sub_title: string
    content: string
    topic_id: string
    is_featured: boolean
    thumbnail: File
    token: string
}

export default class PostServices {
    private apiUrl = 'http://localhost:3000/api'

    async getPosts(): Promise<PostType[]> {
        const response = await axios.get(`${this.apiUrl}/posts`)
        return response.data.data
    }

    async createPost(postData: CreateUpdatePostData): Promise<PostType> {
        const formData = new FormData()
        
        // Append text fields
        formData.append('title', postData.title)
        formData.append('sub_title', postData.sub_title)
        formData.append('content', postData.content)
        formData.append('topic_id', postData.topic_id)
        formData.append('is_featured', postData.is_featured.toString())
        
        // Append file
        formData.append('thumbnail', postData.thumbnail)

        // Get token from localStorage or wherever it's stored
        
        const response = await axios.post(`${this.apiUrl}/posts`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${postData.token}`
            }
        })
        return response.data.data
    }

    async updatePost(postData: CreateUpdatePostData): Promise<PostType> {
        const formData = new FormData()
        
        // Append text fields
        formData.append('title', postData.title)
        formData.append('sub_title', postData.sub_title)
        formData.append('content', postData.content)
        formData.append('topic_id', postData.topic_id)
        formData.append('is_featured', postData.is_featured.toString())
        
        // Append file if provided
        if (postData.thumbnail) {
            formData.append('thumbnail', postData.thumbnail)
        }
        
        const response = await axios.put(`${this.apiUrl}/posts/${postData._id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${postData.token}`
            }
        })
        return response.data
    }

    async deletePost(idpost: string): Promise<void> {
        const token = Cookies.get('accessToken')!
        const response = await axios.delete(`${this.apiUrl}/posts/${idpost}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        return response.data
    }
}