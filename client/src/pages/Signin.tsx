import { Fragment } from "react";
import { account } from "../components/appwrite";
import { ID } from "appwrite";
import axios from "axios";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { Link } from "react-router-dom";
import VisibilityIcon from "@mui/icons-material/Visibility";
import googleIcon from "../icons/google.png";
export default function Signin(): React.ReactNode {
  const handelLoginWithgoogle = async () => {
    try {
      const emailInput = "";
      const passwordInput = "";
      const nameInput = "";

      const userLoginMail = await account.create(
        ID.unique(),
        emailInput,
        passwordInput,
        nameInput,
      );
      //todo api link pour le login et le register et faire le truc de garger les infos de user dans le token
      console.log("Utilisateur créé avec succès:", userLoginMail);
      axios.post("", {
        email: emailInput,
        password: passwordInput,
        name: nameInput,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const styling = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "20px",
    marginTop: "100px",
  };
  const type: boolean = false;
  return (
    <Fragment>
      <div style={styling} className="container_form_signin">
        <img
          src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLXRpY2tldC1pY29uIGx1Y2lkZS10aWNrZXQiPjxwYXRoIGQ9Ik0yIDlhMyAzIDAgMCAxIDAgNnYyYTIgMiAwIDAgMCAyIDJoMTZhMiAyIDAgMCAwIDItMnYtMmEzIDMgMCAwIDEgMC02VjdhMiAyIDAgMCAwLTItMkg0YTIgMiAwIDAgMC0yIDJaIi8+PHBhdGggZD0iTTEzIDV2MiIvPjxwYXRoIGQ9Ik0xMyAxN3YyIi8+PHBhdGggZD0iTTEzIDExdjIiLz48L3N2Zz4="
          alt="icon ticket"
        />
        <h2>Gestion des événements</h2>
        <div className="form_signin">
          <h2>welcome back</h2>
          <p>log in to manage your premium events and attendes.</p>
          {/* <TextField
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            label="Email"
            variant="outlined"
          />
          <TextField label="password" variant="outlined" /> */}
          <label htmlFor="">Address e-mail</label>
          <div>
            <span>
              <EmailIcon />
            </span>
            <input type="email" placeholder="Votre email"></input>
          </div>
          <div>
            <label>Password</label>
            <Link to="/forgot-password" className="forgot_password">
              Forgot password?
            </Link>{" "}
            //todo link to forgot password page
          </div>

          <div className="">
            <span>
              <LockIcon />
            </span>
            <input
              type={type ? "password" : "text"}
              placeholder="Votre mot de passe"
            ></input>
            <span>
              <VisibilityIcon />
            </span>
          </div>
          <button>Sign in</button>

        </div>
        <hr />
        <p>or continue with</p>
        <button onClick={handelLoginWithgoogle} className="btn_google"> <img src={googleIcon} alt="google icon" style={{
          width: "20px",
          height: "20px",
          marginRight: "10px",
          display: "inline-block"
        }} /> Google</button>
      </div>
    </Fragment>
  );
}
