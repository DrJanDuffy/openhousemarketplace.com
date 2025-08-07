import { getToken } from 'firebase/app-check'
import { app, appCheck } from './firebase'

export class SecureMapsClient {
  private static instance: SecureMapsClient
  private appCheckToken: string | null = null
  private tokenExpiry: number = 0

  private constructor() {}

  static getInstance(): SecureMapsClient {
    if (!SecureMapsClient.instance) {
      SecureMapsClient.instance = new SecureMapsClient()
    }
    return SecureMapsClient.instance
  }

  async getAppCheckToken(): Promise<string> {
    // Check if we have a valid token
    if (this.appCheckToken && Date.now() < this.tokenExpiry) {
      return this.appCheckToken
    }

    try {
      if (!appCheck) {
        throw new Error('App Check not initialized')
      }
      
      const { token } = await getToken(appCheck, false)
      
      this.appCheckToken = token
      // Set expiry to 1 hour from now (tokens typically last 1 hour)
      this.tokenExpiry = Date.now() + (60 * 60 * 1000)
      
      return token
    } catch (error) {
      console.error('Failed to get App Check token:', error)
      throw new Error('Failed to authenticate with Firebase App Check')
    }
  }

  async makeSecureRequest(url: string, options: RequestInit = {}): Promise<Response> {
    const token = await this.getAppCheckToken()
    
    const secureOptions: RequestInit = {
      ...options,
      headers: {
        ...options.headers,
        'X-Firebase-AppCheck': token,
        'Content-Type': 'application/json',
      },
    }

    return fetch(url, secureOptions)
  }

  // Helper method for Google Maps API calls
  async callGoogleMapsAPI(endpoint: string, params: Record<string, string> = {}): Promise<any> {
    const url = new URL(endpoint)
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, value)
    })
    
    const response = await this.makeSecureRequest(url.toString())
    
    if (!response.ok) {
      throw new Error(`Google Maps API error: ${response.status} ${response.statusText}`)
    }
    
    return response.json()
  }
}

export default SecureMapsClient.getInstance()
