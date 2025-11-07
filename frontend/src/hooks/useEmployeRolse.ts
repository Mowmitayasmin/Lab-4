import { useEffect, useState } from "react";

import * as EmployeeService from "../services/employee";
import type { EmployeeDepartment } from "../components/employee-list/EmployeeList";
const useEmployeRolse = (dependencies: unknown[]) => {
  const [searchStr, setSearchstr] = useState("");
  const [error, setError] = useState<string | null>();
  const [departmentEmployee, setDepartmentEmployee] = useState<
    EmployeeDepartment[]
  >([]);
  const filteredDepartments = departmentEmployee
    .map((dept) => {
      const matchesDepartment = dept.department
        .toLowerCase()
        .includes(searchStr.toLowerCase());

      const filteredEmployees = dept.employees.filter((item) =>
        item.name.toLowerCase().includes(searchStr.toLowerCase())
      );

      return {
        id: dept.id,
        department: dept.department,
        employees: filteredEmployees,
        matchesDepartment,
      };
    })
    .filter((dept) => dept.matchesDepartment || dept.employees.length > 0)
    .map(({ matchesDepartment, ...rest }) => rest);

  const fetchDept = async () => {
    try {
      const result = await EmployeeService.fetchEmployee();
      setDepartmentEmployee([...result]);
    } catch (errorObject) {
      setError(`${errorObject}`);
    }
  };
  useEffect(() => {
    fetchDept();
  }, [...dependencies]);
  return {
    error,
    departmentEmployee,
    filteredDepartments,
    setSearchstr,
    searchStr,
    setDepartmentEmployee,
    fetchDept,
  };
};

export default useEmployeRolse;
