export interface CreateUserDto {
    email: string;
    username: string;
    password: string;
    phoneNumber: string;
    isEmailVerified?: boolean;
    roles?: string[];
}