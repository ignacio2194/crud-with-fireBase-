import React, { useEffect, useState } from "react";
import LinkForm from "./LinkForm";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import "../index.css";
import { toast } from "react-toastify";

const Links = () => {
  const [links, setLinks] = useState([]);
  const [currentId,setCurrentId] = useState('')
  const colRef = collection(db, "Links");

  const docs = [];
  const addOrEdit = async (linkObject) => {
    try {
      await addDoc(collection(db, "Links"), { linkObject });
      toast.success(" new task added!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } catch (error) {
      console.log(error);
    }
  };
  const getLinks = async () => {
    onSnapshot(colRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        docs.push({ ...doc.data().linkObject, id: doc.id });
      });
      setLinks([...docs]);
    });
  };
  const deleteLink = async (id) => {
    try {
      if (window.confirm("are you sure  you want  to delete this  link? ")) {
        let dataId = doc(colRef, id);
        await deleteDoc(dataId);
        toast.error(" link was deleted!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
        getLinks();
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getLinks();
  }, []);

  return (
    <div>
      <div className="col-md-4 p-2">
        <LinkForm addOrEdit={{addOrEdit,currentId,links}} />
      </div>

      <div className="col-md-8 p-2">
        {links.map((link, index) => (
          <div key={index} className="card mt-2">
            <div className="card-body warning ">
              <div className="d-flex justify-content-between">
                <h4>{link.name}</h4>
                <div className="icons">
                  <i
                    onClick={() => deleteLink(link.id)}
                    className="material-icons mx-2"
                  >
                    delete
                  </i>
                  <i className="material-icons" onClick={()=>setCurrentId(link.id)}>edit</i>
                </div>
              </div>
              <p>{link.description}</p>
              <a
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="btn btn-warning"
              >
                {" "}
                Go to webSite{" "}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Links;
