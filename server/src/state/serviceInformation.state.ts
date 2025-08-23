import { CompanyData } from '~/interfaces/companyData.interfaces'
import { AutoGeneratorDataFile } from '~/utils/generator.utils'

let service_information: CompanyData | null = null

export function initServiceInformation(): void {
  service_information = AutoGeneratorDataFile()
}

export function getServiceInformation(): CompanyData {
  if (!service_information) {
    service_information = AutoGeneratorDataFile()
  }
  return service_information
}

export function setServiceInformation(next: CompanyData): void {
  service_information = next
}
