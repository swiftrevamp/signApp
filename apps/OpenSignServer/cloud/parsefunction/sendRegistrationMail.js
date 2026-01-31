//     async (request) => {
//   try {
//     let email = request.params.email; // User's email
//     let password = request.params.password; // User's password
//     let name = request.params.name; // User's name (optional)
//     let TenantId = request.params.TenantId ? request.params.TenantId : undefined; // Tenant ID
//     let Link = 'https://unisign.othersys.com'; // Your login link

//     const AppName = 'UniSign'; // Your app's name

//     // The logo HTML snippet
//     const logo = `<div style='padding:10px'><img src='https://unidesign-jewel.com/images/logo.png' height='50' /></div>`;

//     // Email adapter configuration, adjust if not using process.env
//     const mailsender = process.env.SMTP_USER_EMAIL || process.env.MAILGUN_SENDER;

//     if (!mailsender) {
//       console.error("Email sender not configured. Please set SMTP_USER_EMAIL or MAILGUN_SENDER environment variable.");
//       throw new Error("Email service not configured.");
//     }

//     if (email && password) { // Both email and password must be provided
//       const recipient = email;

//       try {
//         await Parse.Cloud.sendEmail({
//           sender: AppName + ' <' + mailsender + '>',
//           recipient: recipient,
//           subject: `Welcome to ${AppName}! Your Account Details`,
//           text: `Hi ${name || 'User'},\n\nWelcome to ${AppName}! Your account has been successfully created.\n\nHere are your login details:\nEmail: ${email}\nPassword: ${password}\n\nYou can log in here: ${Link}\n\nPlease keep these details safe.\n\nRegards,\n${AppName} Team`,
//           html:
//             `<html>
//                 <head>
//                     <meta http-equiv='Content-Type' content='text/html;charset=UTF-8' />
//                 </head>
//                 <body>
//                     <div style='background-color:#f5f5f5;padding:20px'>
//                         <div style='background-color:white; border-radius: 8px; overflow: hidden;'>
//                             ${logo}
//                             <div style='background-color:#47a3ad;padding:2px;font-family:system-ui;'>
//                                 <p style='font-size:20px;font-weight:400;color:white;padding-left:20px;'>Welcome to ${AppName}!</p>
//                             </div>
//                             <div style='padding:20px;'>
//                                 <p style='font-family:system-ui;font-size:14px;'>Hi ${name || 'User'},</p>
//                                 <p style='font-family:system-ui;font-size:14px;'>Your ${AppName} account has been successfully created.</p>
//                                 <p style='font-family:system-ui;font-size:14px;'>Your login details are provided below:</p>
//                                 <p style='font-family:system-ui;font-size:16px;font-weight:bolder;'>Email: <span style='color:blue;'>${email}</span></p>
//                                 <p style='font-family:system-ui;font-size:16px;font-weight:bolder;'>Password: <span style='color:blue;'>${password}</span></p>
                                
//                                 <p style='font-family:system-ui;font-size:14px; margin-top: 15px;'>You can log in to your account here:</p>
//                                 <a href="${Link}" style='display: inline-block; padding: 10px 20px; background-color: #47a3ad; color: white; text-decoration: none; border-radius: 5px; font-family: system-ui; font-size: 16px; font-weight: bolder;'>
//                                     Go to UniSign
//                                 </a>
                                
//                                 <p style='font-family:system-ui;font-size:14px; margin-top: 15px;'>Please keep these details safe.</p>
//                                 <p style='font-family:system-ui;font-size:14px;'>Thank you,<br/>${AppName} Team</p>
//                             </div>
//                         </div>
//                     </div>
//                 </body>
//             </html>`,
//         });
//         console.log('Registration email sent to', email);
//         return 'Registration email sent successfully';
//       } catch (err) {
//         console.error('Error in sending registration mail:', err);
//         throw new Error(`Failed to send registration email: ${err.message}`);
//       }
//     } else {
//       throw new Error('Please provide valid email and password.');
//     }
//   } catch (err) {
//     console.error('Error in sendRegistrationMail Cloud Function:', err);
//     throw err;
//   }
// }