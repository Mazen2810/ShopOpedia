const firebaseErrorMessages = {
  'Firebase: Error (auth/id-token-expired).': 'Your session has expired. Please sign in again.',
  'Firebase: Password should be at least 6 characters (auth/weak-password).':
    'Password should be at least 6 characters',
  'Firebase: Error (auth/invalid-email).': 'Please enter a valid email address.',
  'Firebase: Error (auth/invalid-email-verified).': 'Invalid value for email verification state.',
  'Firebase: Error (auth/invalid-id-token).': 'Invalid authentication token. Please sign in again.',
  'Firebase: Error (auth/invalid-password).':
    'Invalid password. Please choose a stronger password.',
  'Firebase: Error (auth/email-already-in-use).':
    'This email is already registered. Try logging in instead.',
}

export function getFriendlyFirebaseError(errorMsg) {
  return firebaseErrorMessages[errorMsg]
}
