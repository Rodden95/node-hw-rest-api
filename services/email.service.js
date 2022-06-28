const sgMail = require("@sendgrid/mail");
const PORT = process.env.port;
const KEY = process.env.SENDGRID_API_KEY;
const BASE_URL = `http://localhost:${PORT}/api`;

const sendEmail = async (userEmail, code) => {
  const link = `${BASE_URL}/users/verify/${code}`;
  sgMail.setApiKey(KEY);
  const msg = {
    to: userEmail, 
    from: "sciroccozbs@gmail.com",
    subject: "Confirm your email",
    text: "and easy to do anywhere, even with Node.js",
    html: `<h4>Click to confirm <a>${link}</a></h4>`,
  };
  try {
    const result = await sgMail.send(msg);
    console.log(result);
  } catch (error) {
    console.log("error:", error);
    throw error;
  }
  
};
module.exports = { sendEmail };
