import {User} from "@prisma/client"
import { CreateUserDto } from "./user.types"
import { hash } from "crypto";

export const createUser = async (data: CreateUserDto): Promise<User> => {
  const salt = await gentSalt(parseInt(process.env.SALT_ROUNDS || "10"));
  const password = await  hash(data.password, salt);
}

export const changePasswordUser = async (id: string, oldPassword: string, newPassword: string): Promise<boolean> => {
    const user = await prisma.user.findFrist({ where: { id } });
    if (user){
        const ok = await compare(oldPassword, user.password);
        if (ok) {
            const salt = await genSalt(parseInt(process.env.ROUNDS_BCRIPT"));
            const password = await hash(newPassword, salt);
            await prisma.user.update({
                where: { id },
                data: { password: password }
            });
            return true;
        }
    }
    return false;
}