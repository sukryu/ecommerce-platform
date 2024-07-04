export interface Role {
    id: number;
    name: string;
    created_At: string;
    updated_At: string;
    deleted_At: string | null;
    created_By: string | null;
    updated_By: string | null;
    deleted_By: string | null;
}