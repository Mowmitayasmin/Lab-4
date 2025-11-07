import "reflect-metadata";
import { Request, Response } from "express";

import * as EmployeeService from "../services/employeeService";
import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseBefore,
} from "routing-controllers";
import { validateRequest } from "../middleware/validate";
import { employeeSchema } from "../validations/roleValidation";

@Controller()
export class EmployeeController {
  @Get("/employee")
  async getAll(@Req() req: Request, @Res() res: Response) {
    try {
      const employees = await EmployeeService.fetchAllEmployee();
      const parsedRoles = employees.map((employee) => ({
        ...employee,
        employees:
          typeof employee?.employees === "string"
            ? JSON.parse(employee.employees as string)
            : employee?.employees ?? null,
      }));

      return res.status(200).json(parsedRoles);
    } catch (error) {
      throw error;
    }
  }
  @Get("/employee/:id")
  async getById(
    @Param("id") id: number,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const employee = await EmployeeService.getEmploeeById(id);
      if (employee) {
        return res.status(200).json({ employee });
      } else {
        return res.status(404).json({ msg: "Recipe not found" });
      }
    } catch (error) {
      throw error;
    }
  }
  @Post("/employee/create")
  @UseBefore(validateRequest(employeeSchema))
  async createRole(@Req() req: Request, @Res() res: Response) {
    try {
      console.log("🚀 ~ EmployeeController ~ createRole ~ req.body:", req.body);
      const newRole = await EmployeeService.createEmployee(req.body);
      res.status(201);
      return res.status(200).json(newRole);
    } catch (error) {
      throw error;
    }
  }

  @Put("/employee/update/:id")
  @UseBefore(validateRequest(employeeSchema))
  async updateRole(
    @Param("id") id: number,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      const updatedEmployee = await EmployeeService.updateEmployee(
        id,
        req.body
      );
      res.status(201).json({ updatedEmployee });
    } catch (error) {
      throw error;
    }
  }

  @Delete("/employee/delete/:id")
  async deleteRole(
    @Param("id") id: number,
    @Req() req: Request,
    @Res() res: Response
  ) {
    try {
      await EmployeeService.deleteRole(id);
      res.status(200).json({ msg: "Role deleted succesfully" });
    } catch (error) {
      throw error;
    }
  }
}
