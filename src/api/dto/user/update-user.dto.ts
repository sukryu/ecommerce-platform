import { UpdateUserInfoDto } from "../userInfo/update-userInfo.dto";

export class UpdateUserDto {
    email?: string;
    username?: string;
    password?: string;
    userInfo?: UpdateUserInfoDto;
    roles?: string[];
}