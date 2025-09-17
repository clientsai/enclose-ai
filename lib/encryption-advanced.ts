import crypto from 'crypto'

const ALGORITHM = 'aes-256-gcm'
const SALT_LENGTH = 64
const TAG_LENGTH = 16
const TAG_POSITION = SALT_LENGTH + 12 // Salt + IV
const ENCRYPTED_POSITION = TAG_POSITION + TAG_LENGTH

/**
 * Derives a key from password using PBKDF2
 */
function getKey(password: string, salt: Buffer): Buffer {
  return crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256')
}

/**
 * Encrypts sensitive data with AES-256-GCM
 */
export function encryptSensitiveData(text: string, masterKey: string): { encrypted: string; iv: string } {
  try {
    // Generate random salt and IV
    const salt = crypto.randomBytes(SALT_LENGTH)
    const iv = crypto.randomBytes(12)

    // Derive key from master key
    const key = getKey(masterKey, salt)

    // Create cipher
    const cipher = crypto.createCipheriv(ALGORITHM, key, iv)

    // Encrypt the text
    const encrypted = Buffer.concat([
      cipher.update(text, 'utf8'),
      cipher.final(),
    ])

    // Get the auth tag
    const tag = cipher.getAuthTag()

    // Combine salt, iv, tag, and encrypted content
    const combined = Buffer.concat([salt, iv, tag, encrypted])

    return {
      encrypted: combined.toString('base64'),
      iv: iv.toString('base64'),
    }
  } catch (error) {
    console.error('Encryption error:', error)
    throw new Error('Failed to encrypt data')
  }
}

/**
 * Decrypts sensitive data with AES-256-GCM
 */
export function decryptSensitiveData(encryptedData: string, masterKey: string): string {
  try {
    const combined = Buffer.from(encryptedData, 'base64')

    // Extract components
    const salt = combined.slice(0, SALT_LENGTH)
    const iv = combined.slice(SALT_LENGTH, TAG_POSITION)
    const tag = combined.slice(TAG_POSITION, ENCRYPTED_POSITION)
    const encrypted = combined.slice(ENCRYPTED_POSITION)

    // Derive key
    const key = getKey(masterKey, salt)

    // Create decipher
    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv)
    decipher.setAuthTag(tag)

    // Decrypt
    const decrypted = Buffer.concat([
      decipher.update(encrypted),
      decipher.final(),
    ])

    return decrypted.toString('utf8')
  } catch (error) {
    console.error('Decryption error:', error)
    throw new Error('Failed to decrypt data')
  }
}

/**
 * Validates Stripe keys format
 */
export function validateStripeKeys(keys: {
  publishableKey?: string
  secretKey?: string
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = []

  if (keys.publishableKey) {
    if (!keys.publishableKey.startsWith('pk_test_') && !keys.publishableKey.startsWith('pk_live_')) {
      errors.push('Invalid publishable key format')
    }
  }

  if (keys.secretKey) {
    if (!keys.secretKey.startsWith('sk_test_') && !keys.secretKey.startsWith('sk_live_')) {
      errors.push('Invalid secret key format')
    }
  }

  // Check if keys are from same environment
  if (keys.publishableKey && keys.secretKey) {
    const pkEnv = keys.publishableKey.includes('test') ? 'test' : 'live'
    const skEnv = keys.secretKey.includes('test') ? 'test' : 'live'
    if (pkEnv !== skEnv) {
      errors.push('Keys must be from same environment (both test or both live)')
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

/**
 * Masks sensitive data for display
 */
export function maskSensitiveData(value: string, showChars: number = 8): string {
  if (!value || value.length <= showChars) return value

  const visiblePart = value.substring(0, showChars)
  const maskedPart = '*'.repeat(Math.min(value.length - showChars, 20))
  return `${visiblePart}${maskedPart}`
}

/**
 * Generates secure random API key
 */
export function generateSecureApiKey(prefix: string = 'encl'): string {
  const randomBytes = crypto.randomBytes(32)
  const key = randomBytes.toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
  return `${prefix}_${key}`
}

/**
 * Hash API key for storage
 */
export function hashApiKey(apiKey: string): string {
  return crypto
    .createHash('sha256')
    .update(apiKey)
    .digest('hex')
}

/**
 * Verify webhook signature from Stripe
 */
export function verifyWebhookSignature(
  payload: string | Buffer,
  signature: string,
  secret: string
): boolean {
  try {
    const elements = signature.split(',')
    let timestamp: string | undefined
    let signatures: string[] = []

    for (const element of elements) {
      const [key, value] = element.split('=')
      if (key === 't') {
        timestamp = value
      } else if (key === 'v1') {
        signatures.push(value)
      }
    }

    if (!timestamp) {
      throw new Error('No timestamp in signature')
    }

    // Compute expected signature
    const signedPayload = `${timestamp}.${payload}`
    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(signedPayload)
      .digest('hex')

    // Check if any signature matches
    for (const sig of signatures) {
      if (crypto.timingSafeEqual(
        Buffer.from(sig),
        Buffer.from(expectedSignature)
      )) {
        return true
      }
    }

    return false
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return false
  }
}