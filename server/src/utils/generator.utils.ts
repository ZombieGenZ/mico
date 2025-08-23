// src/utils/autoGeneratorDataFile.utils.ts
import fs from 'fs'
import path from 'path'
import { CompanyData } from '~/interfaces/companyData.interfaces'

const filePath = path.join(__dirname, '../../data/data.json')

function ensureDirExists(p: string) {
  const dir = path.dirname(p)
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })
}

function getDefaultData(): CompanyData {
  return {
    company: {
      name: process.env.DATA_DEFAULT_COMPANY_NAME || 'Xe Công Trình',
      slogan: process.env.DATA_DEFAULT_SLOGAN || '',
      description: process.env.DATA_DEFAULT_COMPANY_DESCRIPTION || '',
      logo_url: process.env.DATA_DEFAULT_LOGO_URL || '',
      tax_code: process.env.DATA_DEFAULT_TAX_CODE || '',
      business_license: process.env.DATA_DEFAULT_BUSINESS_LICENSE || '',
      contact: {
        hotline: process.env.DATA_DEFAULT_HOTLINE || '',
        primary_email: process.env.DATA_DEFAULT_PRIMARY_EMAIL || '',
        sales_email: process.env.DATA_DEFAULT_SALES_EMAIL || '',
        support_email: process.env.DATA_DEFAULT_SUPPORT_EMAIL || '',
        head_office_address: process.env.DATA_DEFAULT_HEAD_OFFICE_ADDRESS || '',
        working_hours_on_a_weekday: process.env.DATA_DEFAULT_WORKING_HOURS_ON_A_WEEKDAY || '',
        weekend_working_hours: process.env.DATA_DEFAULT_WEEKEND_WORKING_HOURS || ''
      },
      social: {
        facebook: process.env.DATA_DEFAULT_FACEBOOK || '',
        x: process.env.DATA_DEFAULT_X || '',
        instagram: process.env.DATA_DEFAULT_INSTAGRAM || '',
        linkedin: process.env.DATA_DEFAULT_LINKEDIN || ''
      }
    }
  }
}

export function AutoGeneratorDataFile(): CompanyData {
  const defaultData = getDefaultData()
  ensureDirExists(filePath)

  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8')
    return defaultData
  }

  const content = fs.readFileSync(filePath, 'utf-8').trim()
  if (!content) {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8')
    return defaultData
  }

  try {
    return JSON.parse(content) as CompanyData
  } catch {
    fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf-8')
    return defaultData
  }
}

export function writeData(data: CompanyData): CompanyData {
  ensureDirExists(filePath)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
  return data
}

export function readData(): CompanyData {
  return AutoGeneratorDataFile()
}
