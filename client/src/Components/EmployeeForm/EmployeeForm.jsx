import { useEffect, useState } from "react";

const EmployeeForm = ({ onSave, disabled, employee, brand, onCancel }) => {
  const [equipment, setEquipment] = useState([]);
  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});
 console.log(employee)
    return onSave(employee);
  };
  const fetchEquipment = () => {
    return fetch(`/api/equipment`).then((res) => res.json());
  };
  
  useEffect(() => {
    fetchEquipment()
    .then((equipment) => {
      setEquipment(equipment);
      console.log(equipment);
    });
  },[]);

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      {employee && (
        <input type="hidden" name="_id" defaultValue={employee._id} />
      )}

      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          defaultValue={employee ? employee.name : null}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          defaultValue={employee ? employee.level : null}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          defaultValue={employee ? employee.position : null}
          name="position"
          id="position"
        />
      </div>
      <div className="control">
        <label htmlFor="equipment">Equipment:</label>
          <select name="equipment" id="equipment">
            {equipment.map((equipment,index)=> <option key={index}>{equipment.name}</option>)}
          </select>

      </div>
      <div className="control">
        <label htmlFor="brand">Brand:</label>
          <select id="selectBrand">
            {brand?.map((brands,index)=>
             <option key={index}>{brands.name}</option>)}
          </select>

      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
