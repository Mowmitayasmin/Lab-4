
import type { Organizationdata } from "../hooks/useEntryForm";

const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/api`;
export async function getRoles() {
  const response = await fetch(`${BASE_URL}/roles`);
  console.log("🚀 ~ getRoles ~ response:", response)
  if (!response.ok) {
    throw new Error("Failed to fetch role");
  }
  const json = await response.json();
  return json;
}
export async function createNewRole(role: Organizationdata) {
  const response = await fetch(`${BASE_URL}/role/create`, {
    method: "POST",
    body: JSON.stringify({ ...role }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch role");
  }
  const json = await response.json();
  return json;
}
export async function deleteRole(id: string | number) {
  const roleResponse: Response = await fetch(
    `${BASE_URL}/role/delete/${id}`,
    {
      method: "DELETE",
    }
  );

  if (!roleResponse.ok) {
    throw new Error(`Failed to fetch role with id ${id}`);
  }
}

export async function updateRole(role: Organizationdata) {
  const updateResponse: Response = await fetch(
    `${BASE_URL}/role/update/${role.id}`,
    {
      method: "PUT",
      body: JSON.stringify({
        title: role.title,
        description: role.description,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!updateResponse.ok) {
    throw new Error(`Failed to update Role with id ${role.id}`);
  }
  const json = await updateResponse.json();
  return json;
}
