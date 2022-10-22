import React, { useEffect, useState } from "react";
import LinkForm from "./LinkForm";
import { collection, addDoc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const Links = () => {
  const [links, setLinks] = useState([]);
  const colRef = collection(db, "Links");
  
  const docs = [];
  const addOrEdit = async (linkObject) => {
    try {
      await addDoc(collection(db, "Links"), { linkObject });
      console.log(" new task added");
    } catch (error) {
      console.log(error);
    }
  };
  const getLinks = async () => {
    onSnapshot(colRef, (snapshot) => {
      snapshot.docs.forEach((doc) => {
        docs.push({ ...doc.data().linkObject, id: doc.id });
      });
      setLinks(docs);
      console.log(docs);
    });
  };
  useEffect(()=>{
    getLinks()
  },[])

  return (
    <div>
      <div className="col-md-4 p-2">
        <LinkForm addOrEdit={addOrEdit} />
      </div>

      <div className="col-md-8 p-2">
        {links.map((link, index) => (
          <div key={index} className="card mt-2">
            <div className="card-body warning ">
              <h4>{link.name}</h4>
              <p>{link.description}</p>
              <a href={link.url} target="_blanket" className="btn btn-warning">
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
