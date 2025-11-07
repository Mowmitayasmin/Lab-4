import Expand from "./Expand";
import { useEntryForm } from "../../hooks/useEntryForm";
import { Link } from "react-router-dom";

import * as OrganizationService from "../../services/organizationService";
import { toast } from "react-toastify";
const Organization = () => {
  const { filteredData, setSearchstr, searchStr, fetchRoles } = useEntryForm(
    []
  );
  const handleDelete = async (id: string | number) => {
    await OrganizationService.deleteRole(id);
    await fetchRoles();
    toast("Successfully deleted Role!", {
      position: "bottom-center",
      theme: "light",
      hideProgressBar: true,
      closeButton: false,
      autoClose: 2500,
    });
  };
  return (
    <div className="border rounded-md p-4 w-full max-w-md mx-auto bg-white shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Search..."
          value={searchStr}
          onChange={(e) => setSearchstr(e.target.value)}
          className="flex-grow border px-3 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Link to="/create-role">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-700 transition">
            + Add Role
          </button>
        </Link>
      </div>

      {filteredData.length > 0 ? (
        filteredData.map((x, i) => (
          <div key={i} className="border-b py-2 last:border-none">
            <Expand x={x} handleDelete={handleDelete} />
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 text-sm">No data found.</p>
      )}
    </div>
  );
};

export default Organization;
