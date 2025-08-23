export interface RequestQuoteRequestBody {
  name: string
  phone: string
  email: string
  company: string | null
  message: string
  product: string[]
}
