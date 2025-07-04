import { PrismaClient} from "@prisma/client"
import {UserTypes} from "../src/resources//userTypes/userType.constants"

const prisma = new PrismaClient();

async function main() {
    return await prisma.userType.createMany({
        data: [
            { id: UserTypes.ADMIM, label: "admin" },
            { id: UserTypes.CLIENT, label: "client" },
        ],
        skipDuplicates: true,
    });
}
main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
    });