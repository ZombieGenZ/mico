import { ImageType } from "./vehicleTypes"

export interface PostType {
    _id?: string
    path: string
    title: string
    sub_title: string
    content: string
    topic_id: string
    user_id: string
    read_time: string
    is_featured: boolean
    thumbnail: ImageType
    is_deleted?: boolean
    created_at?: Date
    updated_at?: Date
    deleted_at?: Date
  }