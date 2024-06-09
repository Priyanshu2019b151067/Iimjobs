import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaAngleLeft } from "react-icons/fa6";
import "../welcomeNavbar.css";
import axios from "axios";

function ForgetPassword({ setshowPassword }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [mailsent,setmailSent] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmail(value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === "") {
      setError("Please enter the email address");
      return;
    }
    setError("");

    // send email to reset password
    try {
      const data = { email };
      const response = await axios.post(
        "http://localhost:3000/verify/forget-password",
        data
      );
      if (response.status === 200) {
        setmailSent(true);
        setEmail('');
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };
  return (
    <div
      className="container-fluid p-4 m-2 reset__wrapper"
      style={{
        backgroundColor: "white",
      }}
    >
      <div className="back-link-to-login mb-4">
        <Link
          style={{
            textDecoration: "none",
            color: "#149075",
          }}
          onClick={setshowPassword}
        >
          {" "}
          <FaAngleLeft />
          Back to login
        </Link>
      </div>
      <div className="reset-password-text p-3">
        <div class="heading">Reset your password</div>
        <div class="subHeading">
          To obtain a new password, please enter your e-mail address and a link
          will be emailed to you.
        </div>
        {mailsent ? (
          <p
            style={{
              color: "#149075",
              fontWeight: "500",
            }}
            className="mt-3"
          >
            We have sent you a recovery email. Please check your mailbox.
          </p>
        ) : (
          <div className="reset-password-input mt-4">
            <form onSubmit={handleSubmit}>
              <label
                htmlFor="email"
                style={{
                  fontSize: "13px",
                }}
              >
                Enter Email Id
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                placeholder="eg. john.smith@gmail.com"
                className="input-style"
                onChange={handleChange}
              />
              {
                <p
                  style={{
                    color: "red",
                    fontSize: "13px",
                  }}
                >
                  {error}
                </p>
              }
              <button
                type="submit"
                className="sign-up-btn-recruiter mt-4"
                onSubmit={handleSubmit}
              >
                Sent Reset Email
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgetPassword;
