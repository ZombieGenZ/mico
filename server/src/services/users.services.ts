import { TokenType } from '~/enums/jwt.enums'
import { ChangePasswordRequestBody, RegisterRequestBody } from '~/models/requests/users.requests'
import { signToken } from '~/utils/jwt.utils'
import databaseService from './database.services'
import User from '~/models/schemas/users.schemas'
import { HashPassword } from '~/utils/encryption.utils'
import RefreshToken from '~/models/schemas/refreshToken.schemas'
import { ObjectId } from 'mongodb'
import speakeasy from 'speakeasy'
import { getServiceInformation } from '~/state/companyInformation.state'
import QRCode from 'qrcode'

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
    if (user.twoFactorEnabled) {
      const temporary2faToken = await this.signTemporary2faToken(user._id.toString())
      return [temporary2faToken, null]
    }

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
  async changePassword(user: User, payload: ChangePasswordRequestBody) {
    await Promise.all([
      databaseService.users.updateOne(
        {
          _id: user._id
        },
        {
          $set: {
            password: HashPassword(payload.new_password)
          },
          $currentDate: {
            updated_at: true
          }
        }
      ),
      databaseService.refreshToken.deleteMany({
        user_id: user._id
      })
    ])
  }
  async verifyAccess(user: User) {
    return await this.signSecurityAuthenticationToken(user._id.toString())
  }
  async setup2fa(user: User) {
    const secret = speakeasy.generateSecret({
      name: `User ${user._id} (${user.email})`,
      issuer: `Company ${getServiceInformation().company.name}`,
      length: 32
    })

    await databaseService.users.updateOne(
      {
        _id: user._id
      },
      {
        $set: {
          twoFactorSecret: secret.base32
        },
        $currentDate: {
          updated_at: true
        }
      }
    )

    const qrCodeUrl = speakeasy.otpauthURL({
      secret: secret.ascii,
      label: `${getServiceInformation().company.name} - ${user.email}`,
      issuer: `Company ${getServiceInformation().company.name}`,
      encoding: 'ascii'
    })

    const qrCodeImage = await QRCode.toDataURL(qrCodeUrl)

    return {
      secret: secret.base32,
      qr: qrCodeImage,
      manualEntryKey: secret.base32
    }
  }
  async verify2fa(user: User, token: string) {
    if (user.twoFactorEnabled) {
      return false
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret as string,
      encoding: 'base32',
      token: token,
      window: 1 // Cho phép sai lệch 1 time steps (30 giây)
    })

    if (verified) {
      await Promise.all([
        databaseService.users.updateOne(
          {
            _id: user._id
          },
          {
            $set: {
              twoFactorEnabled: true
            },
            $currentDate: {
              updated_at: true
            }
          }
        ),
        databaseService.refreshToken.deleteMany({
          _id: user._id
        })
      ])
    }

    return verified
  }
  async disable2fa(user: User) {
    await databaseService.users.updateOne(
      {
        _id: user._id
      },
      {
        $set: {
          twoFactorEnabled: false,
          twoFactorSecret: null
        },
        $currentDate: {
          updated_at: true
        }
      }
    )
  }
  async validate2fa(user: User, token: string) {
    if (!user.twoFactorEnabled) {
      return {
        verified: false,
        authenticate: null
      }
    }

    const verified = speakeasy.totp.verify({
      secret: user.twoFactorSecret as string,
      encoding: 'base32',
      token: token,
      window: 0 // Không cho phép sai lệch time steps
    })

    if (verified) {
      const authenticate = await this.signAccessTokenAndRefreshToken(user._id.toString())
      await this.insertRefreshToken(user._id.toString(), authenticate[1])

      return {
        verified,
        authenticate
      }
    } else {
      return {
        verified,
        authenticate: null
      }
    }
  }
}

const userService = new UserService()
export default userService
