import { UserEntity } from "./user.type";

export interface PaginatedUsers {
    users: UserEntity[];
    nextCursor: string | null;
}