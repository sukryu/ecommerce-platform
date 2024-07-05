export interface UserEntity {
    id: string;
    email: string;
    username: string;
    password: string;
    lastPasswordChange?: Date | null;
    previousPasswords?: string[];
    currentLoginIp?: string;
    lastLoginIp?: string | null;
    lastLoginDate?: Date | null;
    loginAttempts?: number;
    locked_At?: Date;
    timezone?: string;
    language?: string;
    notificationPreferences?: object;
    twoFactorEnabled?: boolean;
    recoveryEmail?: string;
    isEmailVerified: boolean;
    emailVerificationToken?: string;
    emailVerificationTokenExpires?: Date;
    phoneNumber: string;
    roles: string[];
    created_At: Date;
    updated_At: Date;
    deleted_At?: Date;
}