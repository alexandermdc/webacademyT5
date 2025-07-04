
import {User, PrismaClient} from "@prisma/client"
import { CreateUserDto } from "./user.types"
import {hash, genSalt, compare } from "bcryptjs";


const prisma = new PrismaClient();
export const getUserByEmail = async (email: string): Promise<User | null> => {
  return await prisma.user.findFirst({ where: { email } });
}

export const createUser = async (data: CreateUserDto): Promise<User> => {
  const salt = await genSalt(parseInt(process.env.SALT_ROUNDS || "10"));
  const password = await hash(data.password, salt);
  const user = await prisma.user.create({
    data: {
      ...data,
      password: password,
    },
  });
  return user;
}

export const changePasswordUser = async (id: string, oldPassword: string, newPassword: string): Promise<boolean> => {
    const user = await prisma.user.findFirst({ where: { id } });
    if (user){
        const ok = await compare(oldPassword, user.password);
        if (ok) {
            const salt = await genSalt(parseInt(process.env.SALT_ROUNDS || "10"));
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