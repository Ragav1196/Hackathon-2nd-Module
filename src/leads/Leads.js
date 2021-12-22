import Button from "@mui/material/Button";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { useState } from "react";
import OutsideClickHandler from "react-outside-click-handler";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export function Leads({ data, leadData }) {
  const history = useHistory();
  // HIDE BUTTONS
  const [show, setShow] = useState(false);

  const userType = localStorage.getItem("userType");

  const deleteLeads = (_id) => {
    fetch(`http://localhost:9000/lead/${_id}`, {
      method: "DELETE",
      body: JSON.stringify(),
    }).then(() => leadData());
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setShow(false);
      }}
    >
      <section className="leads">
        <img src={data.picture} alt={data.name} />
        <section>
          <article>
            <p>{data.name}</p>
            <div>
              <div className="leadsDetail1">
                <p>Phone: {data.Phone}</p>
                <p>Comapany: {data.company}</p>
                <p>Email: {data.email}</p>
              </div>
              <div className="leadsDetail2">
                <p>Title: {data.title}</p>
                <p>Lead Source: {data.leadSource}</p>
              </div>
            </div>
          </article>
          {userType !== "junior-employee" ? (
            <span onClick={() => setShow(!show)}>
              {show ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </span>
          ) : (
            ""
          )}
          {show ? (
            <article className="leadsCrud">
              {userType !== "junior-employee" ? (
                <Button
                  onClick={() => {
                    history.push("/lead/" + data._id);
                  }}
                  variant="outlined"
                  color="secondary"
                >
                  EDIT
                </Button>
              ) : (
                ""
              )}

              {userType === "admin" || userType === "manager" ? (
                <Button
                  onClick={() => deleteLeads(data._id)}
                  variant="outlined"
                  color="error"
                >
                  DELETE
                </Button>
              ) : (
                ""
              )}
            </article>
          ) : (
            ""
          )}
        </section>
      </section>
    </OutsideClickHandler>
  );
}
