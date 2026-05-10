import { createTransport } from "nodemailer";
import "dotenv/config";

// la creation de mail qui envoi le mail de confirmation
const mailTransporter = createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_app,
    pass: process.env.PASSWORD_app,
  },
});

// LE MESSAHE MAIL ET LENVOI DU MAIL DE CONFIRMATION DAANS CETTE FONCTION 
export const sendConfirmationEmail = async (
  userEmail: string,
  verificationCode: string | number,
) => {
  const messagemail = {
    from: process.env.EMAIL_app,
    to: userEmail,
    subject: "Code de vérification - Gestion Events",
    text: `Bonjour, votre code de vérification est le : ${verificationCode}`,
    html: `<p>Bonjour,</p><p>Votre code de vérification est le : <strong>${verificationCode}</strong></p>`,
  };

  try {
    await mailTransporter.sendMail(messagemail);
    console.log(`Mail de confirmation envoyé avec succès à ${userEmail}`);
  } catch (error) {
    console.error("Erreur lors de l'envoi de l'email :", error);
  }
};
