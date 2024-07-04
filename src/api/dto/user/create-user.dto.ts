import { CreateUserInfoDto } from "../userInfo/create-userInfo.dto";

export class CreateUserDto {
    email?: string;
    username?: string;
    password?: string;
    userInfo?: CreateUserInfoDto;
    roles?: string[];
}