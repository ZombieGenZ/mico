export interface RegisterRequestBody {
  name: string
  email: string
  password: string
  confirm_password: string
}

export interface LoginRequestBody {
  email: string
  password: string
}

export interface AuthRequestBody {
  refresh_token: string
}

export interface ChangePasswordRequestBody {
  password: string
  new_password: string
  confirm_new_password: string
}

export interface Verify2faRequestBody {
  token: string
}
