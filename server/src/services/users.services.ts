import { TokenType } from '~/enums/jwt.enums'
import { RegisterRequestBody } from '~/models/requests/users.requests'
import { signToken } from '~/utils/jwt.utils'
import databaseService from './database.services'
import User from '~/models/schemas/users.schemas'
import { HashPassword } from '~/utils/encryption.utils'
import RefreshToken from '~/models/schemas/refreshToken.schemas'
import { ObjectId } from 'mongodb'

class UserService {
  async checkEmailExits(email: string) {
    const user = await databaseService.users.findOne({ email })
    return Boolean(user)
  }
  register(payload: RegisterRequestBody) {
    databaseService.users.insertOne(
      new User({
        name: payload.name,
        email: payload.email,
        password: HashPassword(payload.password)
      })
    )
  }
  async login(user: User, ip?: string, device?: string, os?: string) {
    const authenticate = await this.signAccessTokenAndRefreshToken(user._id.toString())
    await this.insertRefreshToken(user._id.toString(), authenticate[1], ip, device, os)

    return authenticate
  }
  async logout(id: ObjectId) {
    await databaseService.refreshToken.deleteOne({
      _id: id
    })
  }
  private signAccessToken(user_id: string) {
    return signToken({
      payload: {
        user_id: user_id,
        token_type: TokenType.AccessToken,
        development_team: process.env.DEVELOPMENT_TEAM as string,
        company_domain: process.env.COMPANY_DOMAIN as string
      },
      privateKey: process.env.SECURITY_JWT_SECRET_ACCESS_TOKEN as string,
      options: {
        expiresIn: process.env.SECURITY_ACCESS_TOKEN_EXPIRES_IN as any
      }
    })
  }
  private signRefreshToken(user_id: string) {
    return signToken({
      payload: {
        user_id: user_id,
        token_type: TokenType.RefreshToken,
        development_team: process.env.DEVELOPMENT_TEAM as string,
        company_domain: process.env.COMPANY_DOMAIN as string
      },
      privateKey: process.env.SECURITY_JWT_SECRET_REFRESH_TOKEN as string,
      options: {
        expiresIn: process.env.SECURITY_REFRESH_TOKEN_EXPIRES_IN as any
      }
    })
  }
  private signSecurityAuthenticationToken(user_id: string) {
    return signToken({
      payload: {
        user_id: user_id,
        token_type: TokenType.SecurityAuthenticationToken,
        development_team: process.env.DEVELOPMENT_TEAM as string,
        company_domain: process.env.COMPANY_DOMAIN as string
      },
      privateKey: process.env.SECURITY_JWT_SECRET_SECURITY_AUTHENTICATION_TOKEN as string,
      options: {
        expiresIn: process.env.SECURITY_SECURITY_AUTHENTICATION_TOKEN_EXPIRES_IN as any
      }
    })
  }
  private signTemporary2faToken(user_id: string) {
    return signToken({
      payload: {
        user_id: user_id,
        token_type: TokenType.Temporary2faToken,
        development_team: process.env.DEVELOPMENT_TEAM as string,
        company_domain: process.env.COMPANY_DOMAIN as string
      },
      privateKey: process.env.SECURITY_JWT_SECRET_TEMPORARY_2FA_TOKEN as string,
      options: {
        expiresIn: process.env.SECURITY_TEMPORARY_2FA_EXPIRES_IN as any
      }
    })
  }
  signAccessTokenAndRefreshToken(user_id: string) {
    return Promise.all([this.signAccessToken(user_id), this.signRefreshToken(user_id)])
  }
  private async insertRefreshToken(user_id: string, token: string, ip?: string, device?: string, os?: string) {
    await databaseService.refreshToken.insertOne(
      new RefreshToken({
        token,
        user_id: new ObjectId(user_id),
        ip,
        device,
        os
      })
    )
  }
  async updateRefreshToken(old_token: string, new_token: string) {
    await databaseService.refreshToken.updateOne(
      {
        token: old_token
      },
      {
        $set: {
          token: new_token
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
  }
}

const userService = new UserService()
export default userService
