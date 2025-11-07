import * as OrganizationRepo from "../apis/organizationRepo";
import type { Organizationdata } from "../hooks/useEntryForm";

export async function fetchRoles() {
  const roles = await OrganizationRepo.getRoles();
  return roles;
}

export async function createNewRole(role: Organizationdata) {
  return await OrganizationRepo.createNewRole(role);
}

export async function updateRole(role: Organizationdata) {
  return await OrganizationRepo.updateRole(role);
}

export async function deleteRole(id: string | number) {
  return await OrganizationRepo.deleteRole(id);
}

export async function ValidateRole(role: Organizationdata) {
  const validationErrors = new Map<string, string>();
  const roles = await OrganizationRepo.getRoles();
  if (role.title?.trim().length < 3)
    validationErrors.set("title", "Title must be at least 3 characters long");
  if (role.description?.trim().length < 3)
    validationErrors.set(
      "description",
      "Description must be at least 3 characters long"
    );
  if (roles.some((r) => r.title === role.title)) {
    validationErrors.set("title", "Role already exists");
  }
  return validationErrors;
}
