import React, { useState, useEffect } from "react";
import { login } from "../../store/session";
import * as ratingActions from "../../store/rating";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { GoogleLogin } from "react-google-login";
import "./LoginForm.css";

const clientId = '689349869162-9k0cu2evj319324dp3bnk5j7dolt5gei.apps.googleusercontent.com'

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
    dispatch(ratingActions.setRatingsThunk());
    if (data) {
      setErrors(data);
    } else {
        closeModal()
    }

  };

  const loginDemoUser = async () => {
    const demoEmail = "demo@aa.io";
    const demoPassword = "password";

    const data = await dispatch(login(demoEmail, demoPassword));
    if (data) {
      setErrors(data);
    } else {
      closeModal();
    }
  };

  // const onSuccess = (res) => {
  //   console.log("login success", res.ProfileObj);
  // }

  // const onFailure = (res) => {
  //   console.log("login failure", res);
  // }
  
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
      <button onClick={loginDemoUser}>Log In as Demo User</button>
        {/* <div class="g-signin2" data-onsuccess="handleGoogleSignIn"><button onClick={handleGoogleSignIn}>Sign In with Google</button></div>
        <div>
          <GoogleLogin
            clientId={clientId}
            buttonText="Log In with Google"
            onSuccess={onSuccess}
            onFailure={onFailure}
            cookiePolicy={'single_host_origin'}
            isSignedIn={true}
          />
        </div> */}
    </ div>
  );
}

export default LoginFormModal;
