import { Fragment } from "react";
import { account } from "../components/appwrite";
import { ID } from "appwrite";
import axios from "axios";
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
  return <Fragment></Fragment>;
}
