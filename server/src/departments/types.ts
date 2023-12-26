import { Employee } from "../employees/types";

export type Department = {
    id: number;
    name: string;
    employeesCount: number;
    dateOfCreation: Date;
    description?: string | null;
    employees: Employee[];
};
