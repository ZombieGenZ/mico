import {
  ChangeCompanyCoreRequestBody,
  ChangeContactRequestBody,
  ChangeSocialRequestBody
} from '~/models/requests/company.requests'
import { getServiceInformation, setServiceInformation } from '~/state/serviceInformation.state'
import { updateCompanyContact, updateCompanyInfo, updateCompanySocial } from '~/utils/updateCompanyInfo.utils'

class CompanyService {
  get() {
    return getServiceInformation()
  }
  companyCore(payload: ChangeCompanyCoreRequestBody) {
    const next = updateCompanyInfo(payload)
    setServiceInformation(next)
  }
  contact(payload: ChangeContactRequestBody) {
    const next = updateCompanyContact(payload)
    setServiceInformation(next)
  }
  social(payload: ChangeSocialRequestBody) {
    const next = updateCompanySocial(payload)
    setServiceInformation(next)
  }
}

const companyService = new CompanyService()
export default companyService
