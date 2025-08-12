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

export interface LogoutRequestBody {
  refresh_token: string
}

export interface VerifyTokenRequestBody {
  refresh_token: string
}
