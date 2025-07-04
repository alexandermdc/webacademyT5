import { PrismaClient, User } from "@prisma/client";  
import { LoginDto } from "./auth.types";
import { compare } from "bcryptjs"; 
const prisma = new PrismaClient();

const checkCredentials = async (data: LoginDto): Promise<boolean> => {
    const user = await prisma.user.findFirst({where: { email: data.email }});
    if (user) {
        return await compare(data.password, user.password);
    }
    return false;
}

export default {checkCredentials}

