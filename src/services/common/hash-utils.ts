import crypto from "crypto";
import dotenv from 'dotenv';
dotenv.config();

const SALT = process.env.SALT!;

export default class HashUtils {
  static SHA256 = "sha256";

  static hmac(data: any, key: any, algorithm: any) {
    return crypto.createHmac(algorithm, key).update(data).digest("hex");
  }

  static sha(data: any, algorithm: any) {
    return crypto.createHash(algorithm).update(data).digest("hex");
  }

  static hashPassword(password: string) {
    return crypto
      .pbkdf2Sync(password, SALT, 1000, 64, `sha512`)
      .toString(`hex`);
  }
}
