import { UserEntity } from "../../types/user.type";

export class CreateUserInfoDto {
    user?: UserEntity;
    previousPasswords?: string;
    timezone?: string;
    language?: string;
    recoveryEmail?: string;
    phoneNumber?: string;
}