import { z } from "zod";
import { router, publicProcedure } from "../trpc.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const departmentRouter = router({
    getDepartments: publicProcedure.query(async () => {
        const departments = await prisma.department.findMany();
        return departments;
    }),

    getDepartmentById: publicProcedure.input(z.number()).query(async (opt) => {
        const department = await prisma.department.findUnique({
            where: { id: opt.input },
        });
        return department;
    }),

    getTopFiveDepartmentsByEmployeesCount: publicProcedure.query(async () => {
        const departments = await prisma.department.findMany({
            take: 5,
            orderBy: {
                employeesCount: "desc",
            },
        });
        return departments;
    }),

    createDepartment: publicProcedure
        .input(
            z.object({
                name: z.string(),
                description: z.string().optional(),
            })
        )
        .query(async (opts) => {
            const department = await prisma.department.create({
                data: {
                    name: opts.input.name,
                    description: opts.input.description,
                },
            });
            return department;
        }),
});

export default departmentRouter;
