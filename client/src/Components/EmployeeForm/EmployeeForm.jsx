import { useEffect, useState } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [equipment, setEquipment] = useState([]);
  const [brand, setBrand] = useState([]);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const entries = [...formData.entries()];

    const employee = entries.reduce((acc, entry) => {
      const [k, v] = entry;
      acc[k] = v;
      return acc;
    }, {});
    //replace brand name with brand id
    for (let b of brand){
      if(b.name == employee.brand){
        employee.brand = b._id
      }
    }
 console.log(employee)
    return onSave(employee);
  };
  const fetchEquipment = () => {
    return fetch(`/api/equipment`).then((res) => res.json());
  };
  
  const fetchBrand = () => {
    return fetch(`/api/brand`).then((res) => res.json());
  };

  useEffect(() => {
    fetchEquipment()
    .then((equipment) => {
      setEquipment(equipment);
      console.log(equipment);
    });
  },[]);

  useEffect(() => {
    fetchBrand()
    .then((brand) => {
      setBrand(brand);
      console.log(brand);
    });
  },[]);
console.log(employee)
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
          <select name="equipment" id="equipment" value={employee ? employee.equipment : null}>
            {equipment.map((equipment,index)=> <option key={index}>{equipment.name}</option>)}
          </select>

      </div>
      <div className="control">
        <label htmlFor="brand">Brand:</label>
          <select id="selectBrand" name= "brand" value={employee ? employee.brand.name : null}>
            {brand.map((brands,index)=>
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
