import nacl from 'tweetnacl';

export function verifySignature(
  publicKeyBase64: string,
  message: string,
  signatureBase64: string
): boolean {
  try {
    const publicKey = Buffer.from(publicKeyBase64, 'base64');
    const signature = Buffer.from(signatureBase64, 'base64');
    const messageBytes = Buffer.from(message, 'utf8');

    return nacl.sign.detached.verify(messageBytes, signature, publicKey);
  } catch (err) {
    return false;
  }
}
