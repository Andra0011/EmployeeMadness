import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import { useParams } from "react-router-dom";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeListSearch = () => {
  const {search} = useParams();
  const [loading, setLoading] = useState(true);
  const [searchedEmployees, setSearchedEmployees] = useState([]);

  const handleDelete = (id) => {
    deleteEmployee(id);

    setSearchedEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setSearchedEmployees( employees.filter((employee) => {return employee.name.toLowerCase().includes(search) }));
        setLoading(false);
      })
  }, []);

  if (loading) {
    return <Loading />;
  }

  return <EmployeeTable employees={searchedEmployees} onDelete={handleDelete} />;
};

export default EmployeeListSearch;