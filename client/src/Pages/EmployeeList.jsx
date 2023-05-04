import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [filteredEmployees, setFilteredEmployees] = useState([]);

  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  const handleInput = (event) => {
    setFilteredEmployees(employees.filter((employee) => employee.position.toLowerCase().includes(event.target.value) || employee.level.toLowerCase().includes(event.target.value)));
  };

  const handleSortFN = () => {
    let sortFN = [...filteredEmployees].sort((a,b) => a.name > b.name ? 1 : -1 )
    setFilteredEmployees(sortFN);
  };

  const handleSortP = () => {
    let sortP = [...filteredEmployees].sort((a,b) => a.position > b.position ? 1 : -1 )
    setFilteredEmployees(sortP);
  };

  const handleSortLN = () => {
    let sortFN = [...filteredEmployees].sort((a,b) => a.name.split(" ")[a.name.split(" ").length-1] > b.name.split(" ")[b.name.split(" ").length-1] ? 1 : -1 )
    setFilteredEmployees(sortFN);
  };
 const handleSortL = () => {
  let sortL = [...filteredEmployees].sort((a,b) => a.level > b.level ? 1 : -1 )
  setFilteredEmployees(sortL);
 };

  const handleSortMN = () => {
    let sortMN = [...filteredEmployees]
    sortMN = sortMN.sort((a,b) => {
    if(a.name.split(" ").length == 3 ){
      if(b.name.split(" ").length == 3){
        if(a.name.split(" ")[1] > b.name.split(" ")[1]){
          return 1
        } else return -1
      } else return -1
    } else return 1
    })
    setFilteredEmployees(sortMN);
  };  

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {console.log(employees)
        setLoading(false);
        setFilteredEmployees(employees);
        setEmployees(employees);
      })
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (<>
    <input type="text" onChange={handleInput} placeholder="search position or level" />
    <button onClick={handleSortFN}>Sort by First Name</button>
    <button onClick={handleSortMN}>Sort by Middle Name</button>
    <button onClick={handleSortLN}>Sort by Last Name</button>
    <button onClick={handleSortP}>Sort by Position</button>
    <button onClick={handleSortL}>Sort by Level</button>
    <EmployeeTable employees={filteredEmployees} onDelete={handleDelete} />;
  </>

  )
};

export default EmployeeList;
