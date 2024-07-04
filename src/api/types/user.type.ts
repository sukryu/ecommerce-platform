import { UserInfoEntity } from "./userInfo.type";

export interface UserEntity {
    id: string;
    email: string;
    username: string;
    roles: string[];
    userInfo: UserInfoEntity;
    created_At: string;
    updated_At: string;
    deleted_At: string | null;
}