import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
    async hashPassword(password: string): Promise<string> {
        const saltRounds = 10;
        return await bcrypt.hash(password, saltRounds);
    }

    async validatePassword(plainTextPassword: string, hashedPassword: string): Promise<boolean> {
        return await bcrypt.compare(plainTextPassword, hashedPassword);
    }

    generateToken(userId: number): string {
        const payload = { sub: userId };
        const secretKey = process.env.JWT_KEY;
        return jwt.sign(payload, secretKey, { expiresIn: process.env.JWT_EXPIRES });
    }

    decodeToken(token: string): string {
        const secretKey = process.env.JWT_KEY;
        const decode = jwt.verify(token, secretKey);
        return decode;
    }
}
