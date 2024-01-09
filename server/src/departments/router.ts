import { z } from "zod";
import { router, publicProcedure } from "../trpc.js";
import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";

const prisma = new PrismaClient();

const departmentRouter = router({
    getDepartments: publicProcedure.query(async () => {
        try {
            const departments = await prisma.department.findMany();

            if (departments.length === 0) {
                const error = new TRPCError({
                    code: "NOT_FOUND",
                    message: "Departments not found",
                });
                throw error;
            }

            return departments;
        } catch (error) {
            throw error;
        }
    }),

    getDepartmentById: publicProcedure.input(z.number()).query(async (opt) => {
        try {
            const department = await prisma.department.findUnique({
                where: { id: opt.input },
            });

            if (!department) {
                const error = new TRPCError({
                    code: "NOT_FOUND",
                    message: "Department not found",
                });
                throw error;
            }

            return department;
        } catch (error) {
            throw error;
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

            if (departments.length === 0) {
                const error = new TRPCError({
                    code: "NOT_FOUND",
                    message: "Departments not found",
                });
                throw error;
            }

            return departments;
        } catch (error) {
            throw error;
        }
    }),

    createDepartment: publicProcedure
        .input(
            z.object({
                name: z.string(),
                description: z.string().optional(),
            })
        )
        .mutation(async (opts) => {
            try {
                if (!opts.input.name || !opts.input.description) {
                    const error = new TRPCError({
                        message: "Name and description field cannot be empty",
                        code: "BAD_REQUEST",
                    });
                    throw error;
                }
                const department = await prisma.department.create({
                    data: {
                        name: opts.input.name,
                        description: opts.input.description,
                    },
                });
                return department;
            } catch (error) {
                throw error;
            }
        }),

    removeDepatrmentById: publicProcedure
        .input(z.number())
        .mutation(async (opt) => {
            try {
                await prisma.employee.deleteMany({
                    where: {
                        departmentsId: opt.input,
                    },
                });
                const department = await prisma.department.delete({
                    where: { id: opt.input },
                });
                return department;
            } catch (error) {
                throw error;
            }
        }),
});

export default departmentRouter;
