import { Leads } from "./Leads";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import * as yup from "yup";

export function LeadsData() {
  const userType = localStorage.getItem("userType");

  const [leadsData, setLeadsData] = useState([]);

  const leadData = () => {
    fetch("https://hackathonmodule-2.herokuapp.com/lead", {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => setLeadsData(data));
  };

  useEffect(leadData, []);

  return (
    <section className="leadsContainer">
      {userType !== "junior-employee" ? <AddUser leadData={leadData} /> : ""}
      <article className="leadsData">
        {leadsData.map((data, index) => (
          <Leads data={data} leadData={leadData} key={index} />
        ))}
      </article>
    </section>
  );
}

function AddUser({ leadData }) {
  // TO HIDE INPUT FIELD
  const [show, setShow] = useState(false);

  let AddLeadFn = (newLead) => {
    fetch("https://hackathonmodule-2.herokuapp.com/lead", {
      method: "POST",
      body: JSON.stringify([newLead]),
      headers: { "Content-Type": "application/json" },
    }).then(() => leadData());
  };

  const formValidationSchema = yup.object({
    name: yup.string().required("Client name is required"),
    Phone: yup.number().required("Client number is required"),
    company: yup.string().required("Client company name is required"),
    email: yup.string().required("Client Email is required"),
    title: yup.string().required("Client title is required"),
    leadSource: yup.string().required("Client lead source is required"),
    picture: yup
      .string()
      .required("URL for client is required or go with default picture")
      .matches(
        /[(https(s)?):(www)?a-zA-Z0-9@:%._~#=]{2,256}[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)$/,
        "URL pattern doesn't match"
      ),
  });

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: "",
        Phone: "",
        company: "",
        email: "",
        title: "",
        leadSource: "",
        picture:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1h6DPxI_QiEVN9xNst-Z8hn1Yq-eF6ydo-g&usqp=CAU",
      },

      validationSchema: formValidationSchema,

      onSubmit: (newLead) => {
        AddLeadFn(newLead);
      },
    });

  return (
    <section className="AuContainer">
      {show ? (
        <form onSubmit={handleSubmit} className="AuForm">
          <TextField
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="name"
            id="outlined-basic"
            variant="outlined"
            placeholder="Enter name"
            helperText={errors.name && touched.name && errors.name}
            error={errors.name && touched.name}
          />
          <TextField
            value={values.Phone}
            onChange={handleChange}
            onBlur={handleBlur}
            type="number"
            name="Phone"
            id="outlined-basic"
            variant="outlined"
            placeholder="Enter phone number"
            helperText={errors.Phone && touched.Phone && errors.Phone}
            error={errors.Phone && touched.Phone}
          />
          <TextField
            value={values.company}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="company"
            id="outlined-basic"
            variant="outlined"
            placeholder="Enter company"
            helperText={errors.company && touched.company && errors.company}
            error={errors.company && touched.company}
          />
          <TextField
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            type="email"
            name="email"
            id="outlined-basic"
            variant="outlined"
            placeholder="Enter Email"
            helperText={errors.email && touched.email && errors.email}
            error={errors.email && touched.email}
          />
          <TextField
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="title"
            id="outlined-basic"
            variant="outlined"
            placeholder="Enter Title"
            helperText={errors.title && touched.title && errors.title}
            error={errors.title && touched.title}
          />
          <TextField
            value={values.leadSource}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="leadSource"
            id="outlined-basic"
            variant="outlined"
            placeholder="Enter lead source"
            helperText={
              errors.leadSource && touched.leadSource && errors.leadSource
            }
            error={errors.leadSource && touched.leadSource}
          />
          <TextField
            value={values.picture}
            onChange={handleChange}
            onBlur={handleBlur}
            type="text"
            name="picture"
            id="outlined-basic"
            variant="outlined"
            placeholder="Provide URL for the picture"
            helperText={errors.picture && touched.picture && errors.picture}
            error={errors.picture && touched.picture}
          />
          <span className="auHide">
            <VisibilityOffIcon onClick={() => setShow(false)} />
          </span>
          <Button variant="contained" color="success" type="submit">
            SUBMIT
          </Button>
        </form>
      ) : (
        ""
      )}
      <Button onClick={() => setShow(true)} variant="contained" color="success">
        ADD USER
      </Button>
    </section>
  );
}
