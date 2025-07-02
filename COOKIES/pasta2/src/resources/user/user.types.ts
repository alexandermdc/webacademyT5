import {User} from "@prisma/client"

export type CreateUserDto = Pick<User, "name" | "email" | "password" | "userTypeId">;
export type changePasswordDto = {
    oldPassword: string;
    newPassword: string;
}