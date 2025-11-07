// prisma/seed.ts
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
// -- Table: Department
// CREATE TABLE Department (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     department VARCHAR(255) NOT NULL,
//     employees JSON
// );

// -- Table: Role
// CREATE TABLE Role (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     title VARCHAR(255) NOT NULL,
//     description VARCHAR(255) NOT NULL
// );

async function main() {
  await prisma.role.createMany({
    data: [
      {
        title: "CEO/Chair of Board",
        description:
          "Highest-ranking executive responsible for overall management.",
      },
      {
        title: "COO/VP Operations",
        description:
          "Executes and implements operational directives of the CEO and board.",
      },
    ],
  });

  await prisma.department.createMany({
    data: [
      {
        department: "Administration",
        employees: JSON.stringify([
          { id: 1, name: "Zoë Robins" },
          { id: 2, name: "Madeleine Madden" },
        ]),
      },
      {
        department: "Audit",
        employees: JSON.stringify([
          { id: 1, name: "Josha Sadowski" },
          { id: 2, name: "Kate Fleetwood" },
        ]),
      },
    ],
  });

  console.log("Database seeded successfully!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
