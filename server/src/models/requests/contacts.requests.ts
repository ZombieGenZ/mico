export interface ContactRequestBody {
  name: string
  phone: string
  email: string
  company: string | null
  title: string
  content: string
}
