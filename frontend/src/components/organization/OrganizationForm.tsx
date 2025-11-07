import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import * as OrganizationService from "../../services/organizationService";
import { useNavigate } from "react-router-dom";
import { useEntryForm } from "../../hooks/useEntryForm";
interface RoleFormProps {
  formMode: "update" | "create";
  id?: string;
}
const EntryForm = ({ formMode, id }: RoleFormProps) => {
  const { organizationdata } = useEntryForm([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Map<string, string>>(new Map());
  const navigate = useNavigate();

  useEffect(() => {
    if (formMode == "update" && id) {
      const editedRole = organizationdata.find((x) => x.id == id);
      if (editedRole) {
        setTitle(editedRole.title);
        setDescription(editedRole.description);
      }
    }
  }, [organizationdata]);
  const onReset = () => {
    setTitle("");
    setDescription("");
    setErrors(new Map());
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
    const roleErrors = await OrganizationService.ValidateRole({
      id: "0",
      title,
      description,
    });
    setErrors(roleErrors);
    if (roleErrors.size == 0) {
      let toastMessage = `Successfully created new Role ${title}!`;
      if (formMode == "create") {
        await OrganizationService.createNewRole({
          title,
          description,
        });
      } else {
        toastMessage = "Successfully updated Role!";
        await OrganizationService.updateRole({ id: id!, title, description });
      }
      toast(toastMessage, {
        position: "bottom-center",
        theme: "light",
        hideProgressBar: true,
        closeButton: false,
        autoClose: 2500,
      });
      navigate(`/organization`);
      onReset();
    }
  };
  return (
    <form
      onSubmit={onSubmit}
      className="border rounded p-3 bg-white shadow-sm w-full max-w-sm mx-auto text-sm"
    >
      <h2 className="font-medium mb-2 text-center">
        {formMode === "create" ? "Create Entry" : "Update Entry"}
      </h2>

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
        className="w-full border px-2 py-1 rounded mb-2 focus:outline-none focus:ring-1 focus:ring-blue-400"
        required
      />

      {errors.has("title") && (
        <span className="text-red-500 font-semibold">
          {errors.get("title")}
        </span>
      )}

      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
        rows={2}
        className="w-full border px-2 py-1 rounded mb-3 resize-none focus:outline-none focus:ring-1 focus:ring-blue-400"
        required
      />

      {errors.has("description") && (
        <span className="text-red-500 font-semibold">
          {errors.get("description")}
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
  );
};

export default EntryForm;
