import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import * as yup from "yup";

export function EditLeadFn() {
  const { id } = useParams();

  const [lead, setLead] = useState(null);

  useEffect(() => {
    fetch(`http://hackathonmodule-2.herokuapp.com/lead/${id}`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => setLead(data));
  }, [id]);

  return lead ? <EditLead lead={lead} id={id} /> : "";
}

export function EditLead({ lead, id }) {
  const history = useHistory();

  const formValidationSchema = yup.object({
    name: yup.string().required("Client name is required"),
    Phone: yup.number().required("Client number is required"),
    company: yup.string().required("Client company name is required"),
    email: yup
      .string()
      .required("Client Email is required")
      .matches(
        /^(([^<>()[\];:\s@"]+([^<>()[\];:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}[0-9]{1,3}[0-9]{1,3}[0-9]{1,3}\])|(([a-zA-Z\-0-9]+)+[a-zA-Z]{2,}))$/,
        "Email pattern doesn't match"
      ),
    title: yup.string().required("Client title is required"),
    leadSource: yup.string().required("Client lead source is required"),
    picture: yup
      .string()
      .required("URL for client is required or go with default picture")
      .matches(
        /[(http(s)?):(www)?a-zA-Z0-9@:%._~#=]{2,256}[a-z]{2,6}\b([-a-zA-Z0-9@:%_.~#?&//=]*)$/,
        "URL pattern doesn't match"
      ),
  });

  let dataFrmDB = (updatedLead) => {
    fetch(`http://hackathonmodule-2.herokuapp.com/lead/${id}`, {
      method: "PUT",
      body: JSON.stringify(updatedLead),
      headers: { "Content-Type": "application/json" },
    }).then(() => history.push("/lead"));
  };

  const { handleSubmit, values, handleChange, handleBlur, touched, errors } =
    useFormik({
      initialValues: {
        name: lead.name,
        Phone: lead.Phone,
        company: lead.company,
        email: lead.email,
        title: lead.title,
        leadSource: lead.leadSource,
        picture: lead.picture,
      },

      validationSchema: formValidationSchema,

      onSubmit: (updatedLead) => {
        dataFrmDB(updatedLead);
      },
    });
  return (
    <section>
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
        <Button
          type="submit"
          className="leadsSaveBtn"
          variant="outlined"
          color="success"
        >
          SAVE
        </Button>
      </form>
    </section>
  );
}
