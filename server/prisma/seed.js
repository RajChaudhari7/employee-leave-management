import "dotenv/config";
import bcrypt from "bcrypt";
import prisma from "../src/config/prisma.js";

async function main() {
  const existingManager = await prisma.user.findUnique({
    where: {
      username: "manager@gcu.in",
    },
  });

  if (existingManager) {
    console.log("Manager already exists");
    return;
  }

  const hashedPassword = await bcrypt.hash("manager123", 10);

  await prisma.user.create({
    data: {
      username: "manager@gcu.in",
      password: hashedPassword,
      role: "MANAGER",
    },
  });
  console.log("Manager account created");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
