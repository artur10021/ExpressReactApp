import { z } from "zod";
import { router, publicProcedure } from "../trpc.js";
// import { employees } from "./db.js";
import type { Employee } from "./types";
import { TRPCError } from "@trpc/server";
import { PrismaClient } from "@prisma/client";
import { PrismaClientValidationError } from "@prisma/client/runtime/library.js";

const prisma = new PrismaClient();

const employeeRouter = router({
    getEmployees: publicProcedure.query(async () => {
        try {
            const employees = await prisma.employee.findMany();
            return employees;
        } catch (e: any) {
            console.error(e, 500);
            throw new Error(e);
        }
    }),

    getEmployeeById: publicProcedure.input(z.number()).query(async (opt) => {
        try {
            const employee = await prisma.employee.findUnique({
                where: { id: opt.input },
            });
            return employee;
        } catch (e: any) {
            console.error(e, 500);
            throw new Error(e);
        }
    }),

    getEmployeesByDepartment: publicProcedure
        .input(z.number())
        .query(async (opt) => {
            try {
                const employees = await prisma.employee.findMany({
                    where: { departmentsId: opt.input },
                });
                return employees;
            } catch (e: any) {
                console.error(e, 500);
                throw new Error(e);
            }
        }),

    getFiveLastAddedEmployees: publicProcedure.query(async () => {
        try {
            const employees = await prisma.employee.findMany({
                take: 5,
                orderBy: {
                    createdAt: "desc",
                },
            });
            return employees;
        } catch (e: any) {
            console.error(e, 500);
            throw new Error(e);
        }
    }),

    getFilteredByNameEmployees: publicProcedure
        .input(z.string())
        .query(async (opt) => {
            try {
                const employees = await prisma.employee.findMany({
                    where: {
                        fullName: { contains: opt.input },
                    },
                });
                return employees;
            } catch (e: any) {
                console.error(e, 500);
                throw new Error(e);
            }
        }),

    removeEmployeeById: publicProcedure.input(z.number()).query(async (opt) => {
        try {
            const employees = await prisma.employee.delete({
                where: { id: opt.input },
            });

            await prisma.department.update({
                where: { id: employees.departmentsId },
                data: {
                    employeesCount: {
                        increment: -1,
                    },
                },
            });
            return employees;
        } catch (e: any) {
            console.error(e, 500);
            throw new Error(e);
        }
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
                if (
                    !opts.input.email ||
                    opts.input.jobTitle ||
                    opts.input.fullName
                ) {
                    throw Error(
                        "email/jobTitle/fullName fields can not be empty"
                    );
                }

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
                            increment: 1,
                        },
                    },
                });
                return employee;
            } catch (e: any) {
                console.error(e, 400);
                throw new Error(e);
            }
        }),
});

export default employeeRouter;
