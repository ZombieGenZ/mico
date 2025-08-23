import { ContactInfo } from './contactInfo.interfaces'
import { SocialInfo } from './socialInfo.interfaces'

export interface CompanyData {
  company: {
    name: string
    slogan: string
    description: string
    logo_url: string
    tax_code: string
    business_license: string
    contact: ContactInfo
    social: SocialInfo
  }
}
