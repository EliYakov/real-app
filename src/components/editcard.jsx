import Input from "./common/input";
import PageHeader from "./common/pageheader";
import { useFormik } from "formik";
import FormikUsingJoi from "./utils/formikusingjoi";
import Joi from "joi";
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { updateCard } from "./service/cardsService";
import { useCard } from "./hooks/usecard";
import { useEffect } from "react";

const EditCard = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const { id } = useParams();
  const card = useCard(id);

  const form = useFormik({
    validateOnMount: true,
    initialValues: {
      bizName: "",
      bizDescription: "",
      bizAddress: "",
      bizPhone: "",
      bizImage: "",
    },
    validate: FormikUsingJoi({
      bizName: Joi.string().min(2).max(255).required().label("Name"),
      bizDescription: Joi.string()
        .min(2)
        .max(1024)
        .required()
        .label("Description"),
      bizAddress: Joi.string().min(2).max(400).required().label("Address"),
      bizPhone: Joi.string()
        .min(9)
        .max(10)
        .required()
        .regex(/^0[2-9]\d{7,8}$/)
        .label("Phone"),
      bizImage: Joi.string().min(11).max(1024).label("Image").allow(""),
    }),
    async onSubmit(values) {
      try {
        const { bizImage, ...body } = values;

        if (bizImage) {
          body.bizImage = bizImage;
        }

        await updateCard(id, body);
        toast("You created a new card, Congrats");
        navigate("/my-cards");
      } catch ({ response }) {
        if (response && response.status === 400) {
          setError(response.data);
        }
      }
    },
  });

  useEffect(() => {
    if (!card) {
      return;
    }
    const { bizName, bizDescription, bizAddress, bizPhone, bizImage } = card;

    form.setValues({
      bizName,
      bizDescription,
      bizAddress,
      bizPhone,
      bizImage,
    });
  }, [card]);

  return (
    <>
      <PageHeader
        title={
          <>
            Edit <i className="bi bi-geo-fill"></i>Card
          </>
        }
        description={<>Edit your card as you want</>}
      />
      <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
        {error && <div className="alert alert-danger">{error}</div>}
        <div>
          <Input
            {...form.getFieldProps("bizName")}
            label="Name"
            type="text"
            required
            error={form.touched.bizName && form.errors.bizName}
          />
        </div>
        <div className="form-group my-1">
          <Input
            {...form.getFieldProps("bizDescription")}
            label="Description"
            type="text"
            required
            error={form.touched.bizDescription && form.errors.bizDescription}
          />
        </div>
        <div className="form-group my-1">
          <Input
            {...form.getFieldProps("bizAddress")}
            label="Address"
            type="text"
            required
            error={form.touched.bizAddress && form.errors.bizAddress}
          />
        </div>
        <div className="form-group my-1">
          <Input
            {...form.getFieldProps("bizPhone")}
            label="Phone"
            type="text"
            required
            error={form.touched.bizPhone && form.errors.bizPhone}
          />
        </div>

        <div className="form-group my-1">
          <Input
            {...form.getFieldProps("bizImage")}
            label="Image"
            type="text"
            error={form.touched.bizImage && form.errors.bizImage}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Edit Card
        </button>
      </form>
    </>
  );
};

export default EditCard;
