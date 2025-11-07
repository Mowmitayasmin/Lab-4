import type { DepartmentEmployee } from "../components/employee-list/EmployeeForm";
import { departments } from "../data/employees.json";

export function getEmployee() {
  return departments;
}

export async function createNewDept(employee: DepartmentEmployee) {
  const normalizedEmployee = {
    ...employee,
    id: typeof employee.id === "string" ? Number(employee.id) : employee.id,
  };
  departments.push(normalizedEmployee);
  return normalizedEmployee;
}
export async function updateDepartment(dept: DepartmentEmployee) {
  const foundRoleIndex = departments.findIndex((t) => t.id == dept.id);

  if (foundRoleIndex === -1) {
    throw new Error(`Failed to update role with ${dept.id}`);
  }

  departments[foundRoleIndex] = {
    ...dept,
    id: typeof dept.id === "string" ? Number(dept.id) : dept.id,
  };
  return departments[foundRoleIndex];
}
