import {
  ChangeCompanyCoreRequestBody,
  ChangeContactRequestBody,
  ChangeSocialRequestBody
} from '~/models/requests/company.requests'
import { getServiceInformation, setServiceInformation } from '~/state/companyInformation.state'
import { updateCompanyContact, updateCompanyInfo, updateCompanySocial } from '~/utils/updateCompanyInfomation.utils'

class CompanyService {
  get() {
    return getServiceInformation()
  }
  companyCore(payload: ChangeCompanyCoreRequestBody) {
    setServiceInformation(updateCompanyInfo(payload))
  }
  contact(payload: ChangeContactRequestBody) {
    setServiceInformation(updateCompanyContact(payload))
  }
  social(payload: ChangeSocialRequestBody) {
    setServiceInformation(updateCompanySocial(payload))
  }
}

const companyService = new CompanyService()
export default companyService
