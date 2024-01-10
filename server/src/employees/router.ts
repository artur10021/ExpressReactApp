import { z } from "zod";
import { router, publicProcedure } from "../trpc.js";
import { TRPCError } from "@trpc/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const employeeRouter = router({
    getEmployeesWithNameFilter: publicProcedure
        .input(z.string().optional())
        .query(async (opt) => {
            try {
                if (opt.input) {
                    const employeesByName = await prisma.employee.findMany({
                        where: {
                            fullName: { contains: opt.input },
                        },
                    });
                    return employeesByName;
                }

                const employees = await prisma.employee.findMany();

                if (employees.length === 0) {
                    const error: TRPCError = new TRPCError({
                        code: "NOT_FOUND",
                        message: "Employees not found",
                    });
                    throw error;
                }

                return employees;
            } catch (error) {
                throw error;
            }
        }),

    getEmployeeById: publicProcedure.input(z.number()).query(async (opt) => {
        try {
            const employee = await prisma.employee.findUnique({
                where: { id: opt.input },
            });

            if (!employee) {
                const error: TRPCError = new TRPCError({
                    code: "NOT_FOUND",
                    message: "Employee not found",
                });
                throw error;
            }

            return employee;
        } catch (error) {
            throw error;
        }
    }),

    getEmployeesByDepartment: publicProcedure
        .input(z.number())
        .query(async (opt) => {
            try {
                const employees = await prisma.employee.findMany({
                    where: { departmentsId: opt.input },
                });

                if (employees.length === 0) {
                    const error: TRPCError = new TRPCError({
                        code: "NOT_FOUND",
                        message: "Employees not found",
                    });
                    throw error;
                }

                return employees;
            } catch (error) {
                throw error;
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

            if (employees.length === 0) {
                const error: TRPCError = new TRPCError({
                    code: "NOT_FOUND",
                    message: "Employees not found",
                });
                throw error;
            }

            return employees;
        } catch (error) {
            throw error;
        }
    }),

    removeEmployeeById: publicProcedure
        .input(z.number())
        .mutation(async (opt) => {
            try {
                const employee = await prisma.employee.delete({
                    where: { id: opt.input },
                });

                await prisma.department.update({
                    where: { id: employee.departmentsId },
                    data: {
                        employeesCount: {
                            increment: -1,
                        },
                    },
                });
                return employee;
            } catch (error) {
                throw error;
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
        .mutation(async (opts) => {
            try {
                const department = await prisma.department.findUnique({
                    where: {
                        id: opts.input.departmentsId,
                    },
                });
                if (!department) {
                    const error: TRPCError = new TRPCError({
                        code: "BAD_REQUEST",
                        message: "Department with such ID not exist",
                    });
                    throw error;
                }

                if (
                    !opts.input.email ||
                    !opts.input.jobTitle ||
                    !opts.input.fullName
                ) {
                    const error = new TRPCError({
                        message:
                            "email/jobTitle/fullName fields can not be empty",
                        code: "BAD_REQUEST",
                    });
                    throw error;
                }

                if (opts.input.isHead) {
                    const head = await prisma.employee.findFirst({
                        where: {
                            departmentsId: opts.input.departmentsId,
                            isHead: true,
                        },
                    });
                    if (head) {
                        const error = new TRPCError({
                            message:
                                "The head of this department already exists!",
                            code: "CONFLICT",
                        });
                        throw error;
                    }
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
            } catch (error) {
                throw error;
            }
        }),
});

export default employeeRouter;
