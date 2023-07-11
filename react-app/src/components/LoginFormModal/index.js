import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const { closeModal } = useModal();

  // useEffect(() => {
  //   initializeGoogleSignIn();
  // }, []);

  // const initializeGoogleSignIn = () => {
  //   window.gapi.load("auth2", () => {
  //     window.gapi.auth2.init({
  //       client_id: "848629788977-t77doramjd5a2u3pfq80kbsvr659m1j9.apps.googleusercontent.com",
  //     });
  //   });
  // }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(email, password));
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }
  };
  
  // const handleGoogleSignIn = () => {
  //   window.gapi.auth2
  //     .getAuthInstance()
  //     .signIn()
  //     .then((googleUser) => {
  //       const profile = googleUser.getBasicProfile();
  //       const idToken = googleUser.getAuthResponse().id_token;
  //       const email = profile.getEmail();

  //       const data = dispatch(login(idToken));
  //       if (data) {
  //         setErrors(data);
  //       } else {
  //         closeModal();
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error signing in with Google:", error);
  //     });
  // };

  return (
    <div className="login-form">
      <h1>Log In</h1>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button type="submit">Log In</button>
      </form>
        {/* <div class="g-signin2" data-onsuccess="handleGoogleSignIn"><button onClick={handleGoogleSignIn}>Sign In with Google</button></div> */}
    </ div>
  );
}

export default LoginFormModal;
