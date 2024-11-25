"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactUsEmail = void 0;
var contactUsEmail = function (email, firstname, lastname, message, phoneNo, countrycode) {
    return "<!DOCTYPE html>\n  <html>\n  \n  <head>\n      <meta charset=\"UTF-8\">\n      <title>Contact Form Confirmation</title>\n      <style>\n          body {\n              background-color: #ffffff;\n              font-family: Arial, sans-serif;\n              font-size: 16px;\n              line-height: 1.4;\n              color: #333333;\n              margin: 0;\n              padding: 0;\n          }\n  \n  \n          .container {\n              max-width: 600px;\n              margin: 0 auto;\n              padding: 20px;\n              text-align: center;\n          }\n  \n          .logo {\n              max-width: 200px;\n              margin-bottom: 20px;\n          }\n  \n          .message {\n              font-size: 18px;\n              font-weight: bold;\n              margin-bottom: 20px;\n          }\n  \n          .body {\n              font-size: 16px;\n              margin-bottom: 20px;\n          }\n  \n          .cta {\n              display: inline-block;\n              padding: 10px 20px;\n              background-color: #FFD60A;\n              color: #000000;\n              text-decoration: none;\n              border-radius: 5px;\n              font-size: 16px;\n              font-weight: bold;\n              margin-top: 20px;\n          }\n  \n          .support {\n              font-size: 14px;\n              color: #999999;\n              margin-top: 20px;\n          }\n  \n          .highlight {\n              font-weight: bold;\n          }\n      </style>\n  \n  </head>\n  \n  <body>\n      <div class=\"container\">\n      <a href=\"https://EduNexa-edtech-project.vercel.app\"><img src=\"https://i.ibb.co/tc3g0XP/pzp-logo.png\" alt=\"pzp-logo\" border=\"0\" /></a>\n          <div class=\"message\">Contact Form Confirmation</div>\n          <div class=\"body\">\n              <p>Dear ".concat(firstname, " ").concat(lastname, ",</p>\n              <p>Thank you for contacting us. We have received your message and will respond to you as soon as possible.\n              </p>\n              <p>Here are the details you provided:</p>\n              <p>Name: ").concat(firstname, " ").concat(lastname, "</p>\n              <p>Email: ").concat(email, "</p>\n              <p>Phone Number: ").concat(phoneNo, "</p>\n              <p>Message: ").concat(message, "</p>\n              <p>We appreciate your interest and will get back to you shortly. </p>\n          </div>\n          <div class=\"support\">If you have any further questions or need immediate assistance, please feel free to reach\n              out to us at <a href=\"mailto:info@EduNexa.com\">info@EduNexa.com</a>. We are here to help!</div>\n      </div>\n  </body>\n  \n  </html>");
};
exports.contactUsEmail = contactUsEmail;
