import "../components/style.css";
import { useState } from "react";
import { useEffect } from "react";

let obj = { firstName: "", lastName: "", mobileNumber: "", emailID: "" };
const Form = () => {
  const [formValues, setFormValues] = useState(obj);
  const [data, setData] = useState([]);
  const [edited, setEdited] = useState(false);
  const [btnName, setBtnName] = useState("submit");
  const [editId, setEditId] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [deletion, setDeletion] = useState(false);
  let randomId = Math.floor(Math.random() * 100);
  useEffect(() => {
    if (deletion) {
      let updateRecordAfterDelete = data.filter((item, index) => {
        if (index !== deleteId) return item;
      });
      setData(updateRecordAfterDelete);
    }
  }, [deleteId, deletion]);
  let newDATA = [];
  const handleSubmit = (e, item, index) => {
    e.preventDefault();
    if (btnName === "submit") {
      let values = {
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        mobileNumber: formValues.mobileNumber,
        emailID: formValues.emailID,
      };
      if (!edited) {
        newDATA.push(...data, values);
        setData(newDATA);
      }
    } else if (btnName === "update") {
      console.log("update click", formValues);
      const updatedDataTable = data.map((item, index) => {
        if (index === editId) {
          console.log("if");
          return formValues;
        } else {
          console.log("else");
          return data[index];
        }
      });
      setData(updatedDataTable);
    }

    setFormValues(obj);
    setBtnName("submit");
  };

  console.log("data", data);

  const updateData = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };
  const handleEditId = (item, index) => {
    setBtnName("update");
    setFormValues(item);
    setEditId(index);
  };

  const handleDelete = (item, index) => {
    console.log("clicked delete");
    setDeleteId(index);
    setDeletion(true);
  };

  console.log("data", formValues, data);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-wrapper">
          <div className="form-group">
            <label for="exampleInputEmail1">First Name</label>
            <input
              name="firstName"
              type="firstName"
              className="form-control"
              id="examplefirstName"
              aria-describedby="emailHelp"
              placeholder="First Name"
              onChange={updateData}
              value={formValues.firstName}
              required={true}
            />
            {/* <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small> */}
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Last Name</label>
            <input
              name="lastName"
              type="text"
              className="form-control"
              id="examplelastName"
              placeholder="Last Name"
              onChange={updateData}
              value={formValues.lastName}
              required={true}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Mobile Number</label>
            <input
              type="text"
              name="mobileNumber"
              className="form-control"
              id="exampleMobileNumber"
              placeholder="Mobile Number"
              onChange={updateData}
              value={formValues.mobileNumber}
              required={true}
            />
          </div>

          <div className="form-group">
            <label for="exampleInputPassword1">Email Id</label>
            <input
              type="text"
              name="emailID"
              className="form-control"
              id="exampleemailId"
              placeholder="emailId"
              onChange={updateData}
              value={formValues.emailID}
              required={true}
            />
          </div>
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="exampleCheck1" />
          <label className="form-check-label" for="exampleCheck1">
            Check me out
          </label>
        </div>
        <button type="submit" className="btn btn-primary">
          {btnName}
        </button>
      </form>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">Serial Number</th>
            <th scope="col">FirstName</th>
            <th scope="col">LastName</th>
            <th scope="col">Mobile Number</th>
            <th scope="col">Email Id </th>
            <th>Delete</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {/* <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            
          </tr> */}
          {data.map((item, index) => {
            return (
              <tr>
                <th scope="row" id="serialNo">
                  {Math.floor(Math.random() * 100)}
                </th>
                <td>{item.firstName}</td>
                <td>{item.lastName}</td>
                <td>{item.mobileNumber}</td>
                <td>{item.emailID}</td>
                <td>
                  {" "}
                  <button
                    className="btn btn-primary"
                    onClick={() => handleDelete(item, index)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  {" "}
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      handleEditId(item, index);
                      // handleSubmit(item,index,e)
                    }}
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
export { Form };
