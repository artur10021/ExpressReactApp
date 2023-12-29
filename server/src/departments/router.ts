import { z } from "zod";
import { router, publicProcedure } from "../trpc.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const departmentRouter = router({
    getDepartments: publicProcedure.query(async () => {
        try {
            const departments = await prisma.department.findMany();
            return departments;
        } catch (e: any) {
            console.error(e, 500);
            throw new Error(e);
        }
    }),

    getDepartmentById: publicProcedure.input(z.number()).query(async (opt) => {
        try {
            const department = await prisma.department.findUnique({
                where: { id: opt.input },
            });
            return department;
        } catch (e: any) {
            console.error(e, 500);
            throw new Error(e);
        }
    }),

    getTopFiveDepartmentsByEmployeesCount: publicProcedure.query(async () => {
        try {
            const departments = await prisma.department.findMany({
                take: 5,
                orderBy: {
                    employeesCount: "desc",
                },
            });
            return departments;
        } catch (e: any) {
            console.error(e, 500);
            throw new Error(e);
        }
    }),

    createDepartment: publicProcedure
        .input(
            z.object({
                name: z.string(),
                description: z.string().optional(),
            })
        )
        .query(async (opts) => {
            try {
                if (!opts.input.name || !opts.input.description) {
                    throw new Error(
                        "Name and description field cannot be empty"
                    );
                }
                const department = await prisma.department.create({
                    data: {
                        name: opts.input.name,
                        description: opts.input.description,
                    },
                });
                return department;
            } catch (e: any) {
                console.error(e, 400);
                throw new Error(e);
            }
        }),

    removeDepatrmentById: publicProcedure
        .input(z.number())
        .query(async (opt) => {
            try {
                const department = await prisma.department.delete({
                    where: { id: opt.input },
                });
                return department;
            } catch (e: any) {
                console.error(e);
                throw new Error(e);
            }
        }),
});

export default departmentRouter;
