import {injectable, BindingScope} from '@loopback/core';
import * as jwt from 'jsonwebtoken';

export interface TokenPayload {
  id: number | undefined;  // Allow undefined
  role: string;
}


@injectable({scope: BindingScope.TRANSIENT})
export class TokenService {
  private secretKey = '_secret_key'; 
  private expiresIn = '1h';

  generateToken(payload: TokenPayload): string {
    return jwt.sign(payload, this.secretKey, {expiresIn: this.expiresIn});
  }

  verifyToken(token: string): TokenPayload {
    try {
      const decoded = jwt.verify(token, this.secretKey) as Partial<TokenPayload>;

      // Validate the structure of the decoded token
      if (!decoded.id || !decoded.role) {
        throw new Error('Invalid token structure');
      }

      return decoded as TokenPayload;
    } catch (error) {
      throw new Error('Invalid token');
    }
  }
}
