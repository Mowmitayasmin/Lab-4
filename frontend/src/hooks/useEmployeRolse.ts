import { useEffect, useState } from "react";

import * as EmployeeService from "../services/employee";
import { toast } from "react-toastify";
import type { DepartmentEmployee } from "../components/employee-list/EmployeeForm";
const useEmployeRolse = (dependencies: unknown[]) => {
  const [searchStr, setSearchstr] = useState("");
  const [error, setError] = useState<string | null>();
  const [departmentEmployee, setDepartmentEmployee] = useState<
    DepartmentEmployee[]
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
    .map(({ ...rest }) => rest);

  const fetchDept = async () => {
    try {
      const result = await EmployeeService.fetchEmployee();
      setDepartmentEmployee([...result]);
    } catch (errorObject) {
      setError(`${errorObject}`);
    }
  };
  const handleDeleteEmployee = async (id: number | string | undefined) => {
    if (!id) return;
    setDepartmentEmployee((prev) => prev.filter((e) => e.id !== id));
    await EmployeeService.deleteEmployee(id);
    toast("Successfully deleted Role!", {
      position: "bottom-center",
      theme: "light",
      hideProgressBar: true,
      closeButton: false,
      autoClose: 2500,
    });
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
    handleDeleteEmployee,
  };
};

export default useEmployeRolse;
