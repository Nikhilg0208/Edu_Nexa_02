"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseEnrollmentEmail = void 0;
var courseEnrollmentEmail = function (courseName, name) {
    return "<!DOCTYPE html>\n  <html>\n  \n  <head>\n      <meta charset=\"UTF-8\">\n      <title>Course Registration Confirmation</title>\n      <style>\n          body {\n              background-color: #ffffff;\n              font-family: Arial, sans-serif;\n              font-size: 16px;\n              line-height: 1.4;\n              color: #333333;\n              margin: 0;\n              padding: 0;\n          }\n  \n  \n          .container {\n              max-width: 600px;\n              margin: 0 auto;\n              padding: 20px;\n              text-align: center;\n          }\n  \n          .logo {\n              max-width: 200px;\n              margin-bottom: 20px;\n          }\n  \n          .message {\n              font-size: 18px;\n              font-weight: bold;\n              margin-bottom: 20px;\n          }\n  \n          .body {\n              font-size: 16px;\n              margin-bottom: 20px;\n          }\n  \n          .cta {\n              display: inline-block;\n              padding: 10px 20px;\n              background-color: #FFD60A;\n              color: #000000;\n              text-decoration: none;\n              border-radius: 5px;\n              font-size: 16px;\n              font-weight: bold;\n              margin-top: 20px;\n          }\n  \n          .support {\n              font-size: 14px;\n              color: #999999;\n              margin-top: 20px;\n          }\n  \n          .highlight {\n              font-weight: bold;\n          }\n      </style>\n  \n  </head>\n  \n  <body>\n      <div class=\"container\">\n                  <a href=\"https://EduNexa-edtech-project.vercel.app\"><img src=\"https://i.ibb.co/tc3g0XP/pzp-logo.png\" alt=\"pzp-logo\" border=\"0\" /></a>\n          <div class=\"message\">Course Registration Confirmation</div>\n          <div class=\"body\">\n              <p>Dear ".concat(name, ",</p>\n              <p>You have successfully registered for the course <span class=\"highlight\">\"").concat(courseName, "\"</span>. We\n                  are excited to have you as a participant!</p>\n              <p>Please log in to your learning dashboard to access the course materials and start your learning journey.\n              </p>\n              <a class=\"cta\" href=\"https://EduNexa-edtech-project.vercel.app/dashboard\">Go to Dashboard</a>\n          </div>\n          <div class=\"support\">If you have any questions or need assistance, please feel free to reach out to us at <a\n                  href=\"mailto:info@EduNexa.com\">info@EduNexa.com</a>. We are here to help!</div>\n      </div>\n  </body>\n  \n  </html>");
};
exports.courseEnrollmentEmail = courseEnrollmentEmail;