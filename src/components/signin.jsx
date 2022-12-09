import Input from "./common/input";
import PageHeader from "./common/pageheader";
import { useFormik } from "formik";
import FormikUsingJoi from "./utils/formikusingjoi";
import Joi from "joi";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./service/userService";
import { useState } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const { error, setError } = useState();
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
    },
    validate: FormikUsingJoi({
      email: Joi.string()
        .min(6)
        .max(255)
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().min(6).max(255).required(),
    }),
    async onSubmit(values) {
      try {
        await loginUser(values);
        navigate("/");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });
  return (
    <>
      <PageHeader
        title={
          <>
            Sign In Real <i className="bi bi-geo-fill"></i>App
          </>
        }
        description={<>You wont regret it</>}
      />
      <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
        {error && <div className="alert alert-danger">{error}</div>}
        <div>
          <Input
            {...form.getFieldProps("email")}
            label="Email"
            type="email"
            name="email"
            required
            error={form.touched.email && form.errors.email}
          />
        </div>
        <div className="form-group my-1">
          <Input
            {...form.getFieldProps("password")}
            label="password"
            type="password"
            name="password"
            required
            error={form.touched.password && form.errors.password}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Sign-In
        </button>
      </form>
    </>
  );
};

export default SignIn;
