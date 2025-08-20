export interface Vehicle {
    _id?: string
    path: string
    title: string
    subtitle: string
    technical_information: TechnicalInformationType[]
    features: Features[]
    image: ImageType[]
    category_id: string
    brand_id: string
    in_stock: boolean
    is_new: boolean
    is_used: boolean
    is_deleted?: boolean
    created_at?: Date
    updated_at?: Date
    deleted_at?: Date
}

export interface TechnicalInformationType {
    code: string
    name: string
    value: string
    index: number
}

export interface ImageType {
    name: string
    url: string
    path: string
}

export interface Features {
    value: string
    index: number
}  