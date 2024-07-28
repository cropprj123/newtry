import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import ApiLoading from "../ApiLoading";
import SnackBar from "../SnackBar";

function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);

  const navigate = useNavigate();
  const params = useParams();

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.patch(
        `http://localhost:5173/api/v1/users/resetPassword/${params.resetToken}`,
        { password, passwordConfirm } // Corrected: Remove passwordConfirm from the request body
      );
      setMessage("Password Reset Successfully");
      setSuccessMessage(true);
      setTimeout(() => setSuccessMessage(false), 2000);

      setTimeout(() => {
        navigate("/login"); // Redirect to homepage
        // Reload the page
      }, 2000);
    } catch (error) {
      setMessage("Error resetting password");
      setErrorMessage(true);
      setTimeout(() => setErrorMessage(false), 2000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <ApiLoading />
      ) : (
        <div className="flex m-20 items-center justify-center h-full">
          <div className="max-w-xs">
            <form
              className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
              onSubmit={handleFormSubmit}
            >
              <p className="text-center  font-bold mb-4">Reset Password </p>
              <p className="text-center mb-4">
                Please Enter Passowrd To Reset Your Password{" "}
              </p>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="passwordConfirm"
                >
                  Confirm Password:
                </label>
                <input
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  type="password"
                  id="passwordConfirm"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </div>
              <div className="flex items-center justify-between m-3">
                <button
                  className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                  type="submit"
                >
                  Reset Password
                </button>
              </div>
            </form>
            {message && <p>{message}</p>}
            {errorMessage && (
              <SnackBar
                isOpen={true}
                message="Password reset failed. Try again later."
                type="error"
              />
            )}
            {successMessage && (
              <SnackBar isOpen={true} message={message} type="success" />
            )}
          </div>
        </div>
      )}
      <div className="h-screen"></div>
    </>
  );
}

export default ResetPasswordForm;
