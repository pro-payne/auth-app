import React from "react";
import { toast } from "react-toastify";
import { FieldValues, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LogInPage.scss";

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
  });

  const navigate = useNavigate();

  const onSubmit = async (payload: FieldValues) => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BACKEND_URL}/login`, payload);

      const { success, data, error } = response.data;

      if (!success) {
        return toast.error(error);
      }

      localStorage.setItem("user", JSON.stringify(data));

      toast.success("Successfully logged in");

      navigate("/home");
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
      <div>
        <form className="form-wrapper" onSubmit={handleSubmit(onSubmit)}>
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

          <div className="buttons">
            <button className="submit-button" type="submit">
              Log In
            </button>
          </div>

          <div className="change">
            Don't have an account? <Link to="/signup">Sign Up </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
