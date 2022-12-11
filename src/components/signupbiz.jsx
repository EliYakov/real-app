import Input from "./common/input";
import PageHeader from "./common/pageheader";
import { useFormik } from "formik";
import FormikUsingJoi from "./utils/formikusingjoi";
import Joi from "joi";
import { useAuth } from "./context/auth.context";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { Navigate } from "react-router-dom";

const SignUpBiz = () => {
  const navigate = useNavigate();

  const { createUser, login, user } = useAuth();
  const { error, setError } = useState("");
  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      email: "",
      password: "",
      name: "",
    },
    validate: FormikUsingJoi({
      name: Joi.string().min(2).max(255).required(),
      email: Joi.string()
        .min(6)
        .max(255)
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().min(6).max(255).required(),
    }),
    async onSubmit(values) {
      try {
        await createUser({ ...values, biz: true });
        await login({ email: values.email, password: values.password });
        toast("Your account is ready for action");
        navigate("/create-cards");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  if (user) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <PageHeader
        title={
          <>
            Sign Up for business Real <i className="bi bi-geo-fill"></i>App
          </>
        }
        description={<>You wont regret it, it'll upgrade your account</>}
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
        <div className="form-group my-1">
          <Input
            {...form.getFieldProps("name")}
            label="name"
            type="name"
            name="name"
            required
            error={form.touched.name && form.errors.name}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Sign-Up
        </button>
      </form>
    </>
  );
};

export default SignUpBiz;
