import { Request } from 'express'
import { IWithStageVariables } from '../../types'
import Integration from '../../functions/integration'

export interface IAuthContext {
  localAuth: boolean
  clientId: string
  connectParams: any
  buid?: string
  setupId: string
  aliasBuid?: string
  environmentIdentifier: string
  organizationIdentifier: string
  internalCorrelationId?: string
  userCorrelationId?: string
  isCallback?: boolean
}

interface IContextSessionData {
  session: {
    context: any
  }
}

export enum EDashboardApiErrorCodes {
  ENVIRONMENT_NOT_FOUND = 'ENVIRONMENT_NOT_FOUND',
  INTEGRATION_NOT_FOUND = 'INTEGRATION_NOT_FOUND'
}

export interface IDashboardApiResponse {
  errors: [
    {
      code: EDashboardApiErrorCodes
      message: string
    }
  ]
  data: {
    viewer: {
      canInvoke: boolean
      hasAccessTo: boolean
      clientId: string
      setupId: string
      buid: string
    }
  }
}

export type TConnectContextRequest = Request &
  IContextSessionData &
  IAuthContext & {
    params: {
      buid: string
    }
    query: {
      clientId: string
      setupId: string
    }
    integration?: Integration
    fullLogs?: boolean
  }

export type TCallbackContextRequest = Request & IContextSessionData & IAuthContext

export enum ELocalRedirectMethod {
  Inline = 'inline',
  Localhost = 'localhost'
}

type TNameValues = Record<string, any>

export type TIntegrationConfig = TNameValues & {
  authType: EAuthType
  config?: {
    scope?: string[]
    state?: any
  }
}

export interface IAuthConfig {
  integrationConfig: TIntegrationConfig
  setupDetails: TNameValues
}

export enum EAuthType {
  NoAuth = 'NO_AUTH',
  OAuth1 = 'OAUTH1',
  OAuth2 = 'OAUTH2'
}

interface IAuthConfigSessionData {
  session: {
    authConfig: IAuthConfig
  }
}

export type TConnectConfigRequest = Request &
  IAuthContext &
  IWithStageVariables &
  IAuthConfig &
  IAuthConfigSessionData & {
    query: {
      devConfig: string
      localHostRedirectSupported?: string
    }
  }

export type TCallbackConfigRequest = Request & IAuthConfig & IAuthConfigSessionData

export interface IAuthId {
  authId: string
}

export type TAuthIdRequest = Request &
  IAuthContext &
  IAuthId & {
    session: {
      authId: string
      context: {
        setupId: string
      }
    }
  }

export interface IOAuth1Credentials {
  accessToken: string
  tokenSecret: string
  consumerKey: string
  consumerSecret: string
  expiresIn: number
}

export interface IOAuth2Credentials {
  accessToken: string
  refreshToken: string
  idToken: string
  idTokenJwt?: any
  expiresIn: number
}

export interface IWithAuthCredentials {
  credentials: IOAuth1Credentials | IOAuth2Credentials
  tokenResponse?: OAuthTokenResponse
}

export type TAuthenticateRequest = Request & IAuthContext & IAuthConfig & IWithAuthCredentials

export type TLocalAuthSuccessRequest = Request & IAuthContext & IAuthConfig & IWithAuthCredentials

export type AuthSuccessRequest = Request &
  IWithStageVariables &
  IAuthContext &
  IAuthId &
  IWithAuthCredentials & { aliasBuid: string; integrationConfig?: TIntegrationConfig }

export type TRevokeRequest = Request & IWithStageVariables & { buid: string }

export type TErrorHandlerRequest = Request & Partial<IAuthContext> & Partial<IAuthId>

export interface IFetchAuthDetailsParams {
  aliasBuid: string
  scopedUserDataTableName: string
  servicesTableName: string
  integration: Integration
  environmentIdentifier: string
  authId?: string
  setupId?: string
  setupIdFromRequest?: boolean
}

export interface BasicAuthDetails {
  username: string
  password: string
}

export interface ApiKeyAuthDetails {
  apiKey: string
}

export enum OAuth1SignatureMethod {
  HmacSha1 = 'HMAC-SHA1',
  RsaSha1 = 'RSA-SHA1',
  PlainText = 'PLAINTEXT'
}

interface OAuthAuthDetails {
  callbackParams: Record<string, string>
  tokenResponse?: OAuthTokenResponse
  updatedAt: number
}

export interface OAuth1AuthDetails extends OAuthAuthDetails {
  accessToken: string
  expiresIn: number
  tokenSecret: string
  consumerKey: string
  consumerSecret: string
  signatureMethod: OAuth1SignatureMethod
}

export interface OAuth2AuthDetails extends OAuthAuthDetails {
  accessToken: string
  callbackParams: Record<string, string>
  clientID: string
  clientSecret: string
  expiresIn: number
  idToken?: string
  idTokenJwt?: any
  refreshToken?: string
}

export interface OAuthTokenResponse {
  body: any
  headers: Record<string, string>
}

export type AuthDetails = BasicAuthDetails | ApiKeyAuthDetails | OAuth1AuthDetails | OAuth2AuthDetails | undefined