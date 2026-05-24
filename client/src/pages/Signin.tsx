import { Fragment } from "react";
import { account } from "../components/appwrite";
import { ID } from "appwrite";
import axios from "axios";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";

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
          <TextField label="Email" variant="outlined" />
          <TextField label="password" variant="outlined" />
        </div>
      </div>
    </Fragment>
  );
}
