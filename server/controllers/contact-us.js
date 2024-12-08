import { mailSender } from "../utils/mailSender.js";
import { contactUsEmail } from "../mail/templates/contactFormRes.js";

export const contactUsController = async (req, res) => {
  const { email, firstname, lastname, message, phoneNo, countrycode } =
    req.body;
  try {
    const emailRes = await mailSender(
      email,
      "Your Data send successfully",
      contactUsEmail(email, firstname, lastname, message, phoneNo, countrycode)
    );

    return res.status(200).json({
      message: "Email send successfully",
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Something went wrong...",
    });
  }
};
