import EmployeeForm from "./EmployeeForm";
import { useParams } from "react-router-dom";

const UpdateEmployee = () => {
  const { id } = useParams();
  return (
    <>
      <div>Update Employee</div>
      <EmployeeForm formMode={"update"} id={id} />
    </>
  );
};

export default UpdateEmployee;
