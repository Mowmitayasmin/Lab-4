
import EntryForm from "./OrganizationForm";
import { useParams } from "react-router-dom";

const UpdateRole = () => {
  const { id } = useParams();
  return (
    <>
      <div>Update Role</div>
      <EntryForm formMode={"update"} id={id} />
    </>
  );
};

export default UpdateRole;
