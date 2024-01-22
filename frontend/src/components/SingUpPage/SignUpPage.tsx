import React from "react";
import "./SignUpPage.scss";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    mode: "all",
  });
  const navigate = useNavigate();

  const onSubmit = async (payload: FieldValues) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/register`,
        payload
      );

      const { success, error } = response.data;

      if (!success) {
        return toast.error(error);
      }

      toast.success("Successfully registered");

      navigate("/");
    } catch (error) {
      let msg = "Something went wrong";

      if (error.response && error.response.data.error) {
        msg = error.response.data.error;
      }

      console.error(error);

      toast.error(msg);
    }
  };

  return (
    <div className="page-wrapper">
      <form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-group">
          <input
            placeholder="Full Name"
            type="text"
            {...register("fullName", {
              required: "Full name is required",
              maxLength: 50,
            })}
          />
        </div>
        {errors.fullName && <p>{errors.fullName?.message}</p>}

        <div className="form-group">
          <input
            placeholder="Email"
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
               value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
               message: "Email is invalid",
              },
            })}
          />
        </div>
        {errors.email && <p>{errors.email?.message}</p>}

        <div className="form-group">
          <input
            placeholder="Password"
            type="password"
            {...register("password", {
              required: "Password is required",
              pattern: {
                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$/,
                message:
                  "Password should at least have 6 characters, 1 Uppercase, 1 lowercase and a number",
              },
            })}
          />
        </div>
        {errors.password && <p>{errors.password?.message}</p>}

        <div className="form-group">
          <input
            placeholder="Confirm Password"
            type="password"
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) => value === getValues("password"),
            })}
          />
        </div>
        {errors.confirmPassword && <p>Passwords do not match</p>}

        <div className="checkbox">
          <input
            type="checkbox"
            {...register("agreement", { required: true })}
          />
          <label>
            I agree to these <Link to="#">Terms and Conditions</Link>.
          </label>
        </div>
        {errors.agreement && <p>Please agree to the Terms and Conditions</p>}

        <div className="button">
          <button className="submit-button" type="submit">
            Sign Up
          </button>
        </div>
        <div className="change">
          Already have an account? <Link to="/">Log In</Link>
        </div>
      </form>
    </div>
  );
};

export default SignUpPage;
