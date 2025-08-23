export interface ChangeCompanyCoreRequestBody {
  name: string
  slogan: string
  description: string
  logo_url: string
  tax_code: string
  business_license: string
}

export interface ChangeContactRequestBody {
  hotline: string
  primary_email: string
  sales_email: string
  support_email: string
  head_office_address: string
  working_hours_on_a_weekday: string
  weekend_working_hours: string
}

export interface ChangeSocialRequestBody {
  facebook: string
  x: string
  instagram: string
  linkedin: string
}
