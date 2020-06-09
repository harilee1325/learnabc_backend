"use strict";
const nodemailer = require("nodemailer");


module.exports = {


    // async..await is not allowed in global scope, must use a wrapper
  send_email : async function (email, otp) {
    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    let testAccount = await nodemailer.createTestAccount();
  
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "keenan59@ethereal.email" , // generated ethereal user
        pass: "PqdeR5eUzgSayBQFxb", // generated ethereal password
      },
    });
  
    // send mail with defined transport object
    let info = await transporter.sendMail({
      from: 'hari.auctionsoftware@gmail.com', // sender address
      to: email, // list of receivers
      subject: "Verification Mail ✔", // Subject line
      text: "Your registration was successfull please enter the code to login "+otp+" . Happy learning.", // plain text body
    //  html: "<b>Hello world?</b>", // html body
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
  }

}