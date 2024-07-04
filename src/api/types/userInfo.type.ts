import { UserEntity } from "./user.type";

export interface UserInfoEntity {
    id: string;
    user?: UserEntity;
    currentLoginIp?: string;
    lastLoginIp?: string;
    lastLoginDate?: Date;
    loginAttempts?: number;
    lastPasswordChange?: Date;
    previousPasswords?: string;
    timezone?: string;
    language?: string;
    notificationPreferences?: object;
    twoFactorEnabled?: boolean;
    recoveryEmail?: string;
    phoneNumber?: string;
}