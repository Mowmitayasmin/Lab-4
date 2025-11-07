import * as employeeRepo from "../apis/employeeRepo";
import type { EmployeeDepartment } from "../components/employee-list/EmployeeList";


export async function fetchEmployee() {
  const employee = await employeeRepo.getEmployee();
  return employee;
}

export async function createNewDept(dept: EmployeeDepartment) {
  return await employeeRepo.createNewDept(dept);
}

export async function updateDepartment(dept: EmployeeDepartment) {
  return await employeeRepo.updateDepartment(dept);
}

export async function ValidateDept(dept: EmployeeDepartment) {
  const validationErrors = new Map<string, string>();
  const existingDepartments = await employeeRepo.getEmployee();
  if (dept.department.trim().length < 3) {
    validationErrors.set(
      "department",
      "Department name must be at least 3 characters long"
    );
  }

  if (
    existingDepartments.some(
      (d) =>
        d.department?.toLowerCase() === dept.department?.trim().toLowerCase()
    )
  ) {
    validationErrors.set("department", "This department already exists");
  }

  const employeeNames = new Set<string>();

  dept.employees?.forEach((emp, index) => {
    if (!emp.name || emp.name.trim().length < 3) {
      validationErrors.set(
        `employee`,
        `Employee name must be at least 3 characters long`
      );
    }

    const normalized = emp.name.trim().toLowerCase();
    if (employeeNames.has(normalized)) {
      validationErrors.set(`employee`, `Duplicate employee name "${emp.name}"`);
    }
    employeeNames.add(normalized);
  });

  return validationErrors;
}
