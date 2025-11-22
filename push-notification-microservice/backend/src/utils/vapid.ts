import webpush from 'web-push';

export function generateVAPIDKeys() {
  return webpush.generateVAPIDKeys();
}

export function setVAPIDDetails(email: string, publicKey: string, privateKey: string) {
  webpush.setVAPIDDetails(email, publicKey, privateKey);
}
