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
