import { z } from "zod";
import { router, publicProcedure } from "../trpc.js";
// import { employees } from "./db.js";
import type { Employee } from "./types";
import { TRPCError } from "@trpc/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const employeeRouter = router({
  getEmployee: publicProcedure.query(async () => {
    const employees = await prisma.employee.findMany();
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
          employees: {
            connect: {
              id: employee.id,
            },
          },
        },
      });
      return employee;
    }),
});

export default employeeRouter;
