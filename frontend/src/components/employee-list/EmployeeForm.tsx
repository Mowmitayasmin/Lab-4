import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import * as EmployeeService from "../../services/employee";
import useEmployeRolse from "../../hooks/useEmployeRolse";
interface Employee {
  id: number;
  name: string;
}

export interface DepartmentEmployee {
  id: number;
  department: string;
  employees: Employee[];
}

interface DepartmentEmployeeFormProps {
  formMode: "create" | "update";
  id?: number;
}

const DepartmentEmployeeForm = ({
  formMode,
  id,
}: DepartmentEmployeeFormProps) => {
  const navigate = useNavigate();
  const { departmentEmployee } = useEmployeRolse([]);
  const [departmentName, setDepartmentName] = useState("");
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [newEmployee, setNewEmployee] = useState("");
  const [errors, setErrors] = useState<Map<string, string>>(new Map());

  useEffect(() => {
    if (formMode === "update" && id) {
      const fetchDepartment = async () => {
        const editedEmployee = departmentEmployee.find((x) => x.id == id);
        if (editedEmployee) {
          setDepartmentName(editedEmployee.department);
          setEmployees(editedEmployee.employees);
        }
      };
      fetchDepartment();
    }
  }, [id, formMode, departmentEmployee]);

  const handleAddEmployee = () => {
    if (newEmployee.trim() === "") return;
    const newEmp = {
      id: Date.now(),
      name: newEmployee.trim(),
    };
    setEmployees((prev) => [...prev, newEmp]);
    setNewEmployee("");
  };

  const handleDeleteEmployee = (id: number) => {
    setEmployees((prev) => prev.filter((e) => e.id !== id));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: DepartmentEmployee = {
      id: id ?? Date.now(),
      department: departmentName.trim(),
      employees,
    };
    const deptError = await EmployeeService.ValidateDept(payload);
    setErrors(deptError);
    if (!deptError.size) {
      if (formMode === "create") {
        await EmployeeService.createNewDept(payload);
        toast.success(`Department "${departmentName}" created successfully!`);
      } else {
        await EmployeeService.updateDepartment(payload);
        toast.success(`Department "${departmentName}" updated successfully!`);
      }
      navigate("/employees");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto mt-6">
      <form
        onSubmit={handleSubmit}
        className="border rounded p-3 bg-white shadow-sm text-sm"
      >
        <h2 className="font-medium mb-3 text-center">
          {formMode === "create" ? "Create Department" : "Update Department"}
        </h2>

        <input
          type="text"
          value={departmentName}
          onChange={(e) => setDepartmentName(e.target.value)}
          placeholder="Department Name"
          className="w-full border px-2 py-1 rounded mb-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
          required
        />

        {errors.has("department") && (
          <span className="text-red-500 font-semibold">
            {errors.get("department")}
          </span>
        )}

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
          >
            {formMode === "create" ? "Create" : "Update"}
          </button>
        </div>
      </form>
      <div className="border rounded p-3 bg-white shadow-sm text-sm">
        <h2 className="font-medium mb-3 text-center">Manage Employees</h2>

        <div className="flex gap-2 mb-3">
          <input
            type="text"
            value={newEmployee}
            onChange={(e) => setNewEmployee(e.target.value)}
            placeholder="Employee Name"
            className="flex-grow border px-2 py-1 rounded focus:outline-none focus:ring-1 focus:ring-blue-400"
          />

          <button
            type="button"
            onClick={handleAddEmployee}
            className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
          >
            Add
          </button>
        </div>
        {errors.has("employee") && (
          <span className="text-red-500 font-semibold">
            {errors.get("employee")}
          </span>
        )}

        <ul className="divide-y">
          {employees.map((emp) => (
            <li
              key={emp.id}
              className="flex justify-between items-center py-1 px-1 hover:bg-gray-50 rounded"
            >
              <span>{emp.name}</span>
              <button
                type="button"
                onClick={() => handleDeleteEmployee(emp.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {employees.length === 0 && (
          <p className="text-gray-500 text-center mt-2">
            No employees added yet.
          </p>
        )}
      </div>
    </div>
  );
};

export default DepartmentEmployeeForm;
