import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async ({ subject, html }) => {
  try {
    const data = await resend.emails.send({
      from: "Ankayz Fashion Bookings <onboarding@resend.dev>", // sender shown in inbox
      to: "elizabethbarden18@gmail.com", // ✅ your real admin inbox
      subject,
      html,
    });

    console.log("✅ Email sent to admin:", "elizabethbarden18@gmail.com");
    console.log("Resend response:", data);
  } catch (error) {
    console.error("Error sending booking email:", error);
  }
};
