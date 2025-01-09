
import { AES, enc } from 'crypto-js';

const secretKey = 'SteemXSteemX9696%@76543456ghdfs%%%';

export const encryptData = (data: string) => {
  // return CryptoJS.AES.encrypt(data, secretKey).toString();
  return AES.encrypt(data, secretKey).toString();
};

// Decrypt function (use it when retrieving data)
export const decryptData = (encryptedData: string): string => {
  const bytes = AES.decrypt(encryptedData, secretKey);
  return bytes.toString(enc.Utf8); // Returns the decrypted string
};
