import { doc, getDoc  } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase";

const LinkForm = ({ addOrEdit,currentId,Links }) => {
  console.log(currentId)

  const initialState = {
    url: "",
    name: "",
    description: "",
  };
  const [values, setValues] = useState(initialState);
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    addOrEdit(values);
    setValues({ ...initialState });
  
  };



  return (
    <div>
      <form className="card card-body" onSubmit={handleSubmit}>
        <div className="form-group input-group">
          <div className="input-group-text bg-light">
            <i className="material-icons">insert_link</i>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="https://someurl.com"
            name="url"
            onChange={handleInputChange}
            value={values.url}
          />
        </div>
        <div className="form-group input-group mt-2">
          <div className="input-group-text bg-light">
            <i className="material-icons">create</i>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder="Webside name "
            name="name"
            onChange={handleInputChange}
            value={values.name}
          />
        </div>
        <div className="form-group mt-2">
          <textarea
            name="description"
            rows="3"
            className="form-control"
            placeholder="write a description"
            onChange={handleInputChange}
            value={values.description}
          ></textarea>
        </div>
        <button className="btn btn-primary btn-block mt-3">Save</button>
      </form>
    </div>
  );
};

export default LinkForm;
