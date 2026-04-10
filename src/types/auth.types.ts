export interface AuthCredentials {
  email: string
  password: string
}

export interface AuthRequestBody {
  email?: unknown
  password?: unknown
}

export interface SignupResult {
  success: boolean
  message: string
  user?: {
    id: string
    email: string
  }
}

export interface SigninResult {
  success: boolean
  message: string
  token?: string
}
