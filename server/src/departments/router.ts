import { z } from "zod";
import { router, publicProcedure } from "../trpc.js";
import { TRPCError } from "@trpc/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const departmentRouter = router({
    getDepartments: publicProcedure.query(async () => {
        const departments = await prisma.department.findMany();
        return departments;
    }),
    createDepartment: publicProcedure
        .input(
            z.object({
                name: z.string(),
                employeesCount: z.number(),
                description: z.string().optional(),
            })
        )
        .query(async (opts) => {
            const department = await prisma.department.create({
                data: {
                    name: opts.input.name,
                    employeesCount: opts.input.employeesCount,
                    description: opts.input.description,
                },
            });
            return department;
        }),
});

export default departmentRouter;
