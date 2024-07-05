export interface UpdateUserDto {
    email?: string;
    username?: string;
    password?: string;
    lastPasswordChange?: Date;
    currentLoginIp?: string;
    lastLoginIp?: string;
    lastLoginDate?: Date;
    loginAttempts?: number;
    lockedAt?: Date;
    timezone?: string;
    language?: string;
    notificationPreferences?: object;
    twoFactorEnabled?: boolean;
    recoveryEmail?: string;
    phoneNumber?: string;
    roles?: string[];
}