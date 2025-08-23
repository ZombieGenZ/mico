import { CompanyCoreInfo } from '~/interfaces/companyCoreInfo.interfaces'
import { CompanyData } from '~/interfaces/companyData.interfaces'
import { ContactInfo } from '~/interfaces/contactInfo.interfaces'
import { SocialInfo } from '~/interfaces/socialInfo.interfaces'
import { readData, writeData } from './generator.utils'

export function updateCompanyInfo(core: CompanyCoreInfo): CompanyData {
  const data = readData()
  data.company.name = core.name
  data.company.slogan = core.slogan
  data.company.description = core.description
  data.company.logo_url = core.logo_url
  data.company.tax_code = core.tax_code
  data.company.business_license = core.business_license
  return writeData(data)
}

export function updateCompanyContact(contact: ContactInfo): CompanyData {
  const data = readData()
  data.company.contact = { ...contact }
  return writeData(data)
}

export function updateCompanySocial(social: SocialInfo): CompanyData {
  const data = readData()
  data.company.social = { ...social }
  return writeData(data)
}
