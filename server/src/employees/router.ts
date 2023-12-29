import { z } from "zod";
import { router, publicProcedure } from "../trpc.js";
// import { employees } from "./db.js";
import type { Employee } from "./types";
import { TRPCError } from "@trpc/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const employeeRouter = router({
    getEmployees: publicProcedure.query(async () => {
        const employees = await prisma.employee.findMany();
        return employees;
    }),

    getEmployeeById: publicProcedure.input(z.number()).query(async (opt) => {
        const employee = await prisma.employee.findUnique({
            where: { id: opt.input },
        });
        return employee;
    }),

    getEmployeesByDepartment: publicProcedure
        .input(z.number())
        .query(async (opt) => {
            const employees = await prisma.employee.findMany({
                where: { departmentsId: opt.input },
            });
            return employees;
        }),

    getFiveLastAddedEmployees: publicProcedure.query(async () => {
        const employees = await prisma.employee.findMany({
            take: 5,
            orderBy: {
                createdAt: "desc",
            },
        });
        return employees;
    }),

    removeEmployeeById: publicProcedure.input(z.number()).query(async (opt) => {
        const employees = await prisma.employee.delete({
            where: { id: opt.input },
        });
        return employees;
    }),

    createEmployee: publicProcedure
        .input(
            z.object({
                email: z.string(),
                fullName: z.string().optional(),
                departmentsId: z.number(),
                jobTitle: z.string(),
                isHead: z.boolean(),
            })
        )
        .query(async (opts) => {
            try {
                const employee = await prisma.employee.create({
                    data: {
                        email: opts.input.email,
                        fullName: opts.input.fullName,
                        departmentsId: opts.input.departmentsId,
                        jobTitle: opts.input.jobTitle,
                        isHead: opts.input.isHead,
                    },
                });

                await prisma.department.update({
                    where: { id: opts.input.departmentsId },
                    data: {
                        employeesCount: {
                            increment: 2,
                        },
                    },
                });
                return employee;
            } catch (e) {
                throw e;
            }
        }),
});

export default employeeRouter;
