import PDF from './parsefunction/pdf/PDF.js';
import sendmailv3 from './parsefunction/sendMailv3.js';
import usersignup from './parsefunction/usersignup.js';
import DocumentAftersave from './parsefunction/DocumentAftersave.js';
import ContactbookAftersave from './parsefunction/ContactBookAftersave.js';
import sendMailOTPv1 from './parsefunction/SendMailOTPv1.js';
import AuthLoginAsMail from './parsefunction/AuthLoginAsMail.js';
import getUserId from './parsefunction/getUserId.js';
import getUserDetails from './parsefunction/getUserDetails.js';
import getDocument from './parsefunction/getDocument.js';
import getDrive from './parsefunction/getDrive.js';
import getReport from './parsefunction/getReport.js';
import TemplateAfterSave from './parsefunction/TemplateAfterSave.js';
import GetTemplate from './parsefunction/GetTemplate.js';
import DocumentBeforesave from './parsefunction/DocumentBeforesave.js';
import TemplateBeforeSave from './parsefunction/TemplateBeforesave.js';
import DocumentBeforeFind from './parsefunction/DocumentAfterFind.js';
import TemplateAfterFind from './parsefunction/TemplateAfterFind.js';
import UserAfterFind from './parsefunction/UserAfterFInd.js';
import SignatureAfterFind from './parsefunction/SignatureAfterFind.js';
import TenantAterFind from './parsefunction/TenantAfterFind.js';
import VerifyEmail from './parsefunction/VerifyEmail.js';
import { getSignedUrl } from './parsefunction/getSignedUrl.js';
import createBatchDocs from './parsefunction/createBatchDocs.js';
import linkContactToDoc from './parsefunction/linkContactToDoc.js';
import isextenduser from './parsefunction/isextenduser.js';
import TeamsAftersave from './parsefunction/TeamsAftersave.js';
import GetLogoByDomain from './parsefunction/GetLogoByDomain.js';
import AddAdmin from './parsefunction/AddAdmin.js';
// ... baaki saare imports ke saath
// import sendRegistrationMail from './parsefunction/sendRegistrationMail.js';
import CheckAdminExist from './parsefunction/CheckAdminExist.js';
import UpdateExistUserAsAdmin from './parsefunction/UpdateExistUserAsAdmin.js';
import Newsletter from './parsefunction/Newsletter.js';
import getTeams from './parsefunction/getTeams.js';
import getContact from './parsefunction/getContact.js';
import updateContactTour from './parsefunction/updateContactTour.js';
import declinedocument from './parsefunction/declinedocument.js';
import getTenant from './parsefunction/getTenant.js';
import getSigners from './parsefunction/getSigners.js';
import saveFile from './parsefunction/saveFile.js';
import savecontact from './parsefunction/savecontact.js';
import isUserInContactBook from './parsefunction/isUserInContactBook.js';
import updateTourStatus from './parsefunction/updateTourStatus.js';
import updateSignatureType from './parsefunction/updatesignaturetype.js';
import updatePreferences from './parsefunction/updatePreferences.js';
import createDuplicate from './parsefunction/createDuplicate.js';
import createBatchContact from './parsefunction/createBatchContact.js';
import generateCertificatebydocId from './parsefunction/generateCertificatebydocId.js';
import fileUpload from './parsefunction/fileUpload.js';
import getUserListByOrg from './parsefunction/getUserListByOrg.js';
import editContact from './parsefunction/editContact.js';
import forwardDoc from './parsefunction/ForwardDoc.js';
import saveAsTemplate from './parsefunction/saveAsTemplate.js';
import updateTenant from './parsefunction/updateTenant.js';
import recreateDocument from './parsefunction/recreateDocument.js';
import loginUser from './parsefunction/loginUser.js';
import addUser from './parsefunction/addUser.js';
import filterDocs from './parsefunction/filterDocs.js';
import sendDeleteUserMail from './parsefunction/sendDeleteUserMail.js';
import resetPassword from './parsefunction/resetPassword.js';
import saveSignature from './parsefunction/saveSignature.js';
import manageSign from './parsefunction/manageSign.js';
import getSignature from './parsefunction/getSignature.js';
import updateEmailTemplates from './parsefunction/updateEmailTemplates.js';
import triggerEvent from './parsefunction/triggerEvent.js';

// This afterSave function triggers after an object is added or updated in the specified class, allowing for post-processing logic.
Parse.Cloud.afterSave('contracts_Document', DocumentAftersave);
Parse.Cloud.afterSave('contracts_Contactbook', ContactbookAftersave);
Parse.Cloud.afterSave('contracts_Template', TemplateAfterSave);
Parse.Cloud.afterSave('contracts_Teams', TeamsAftersave);

// This beforeSave function triggers before an object is added or updated in the specified class, allowing for validation or modification.
Parse.Cloud.beforeSave('contracts_Document', DocumentBeforesave);
Parse.Cloud.beforeSave('contracts_Template', TemplateBeforeSave);

// This afterFind function triggers after a query retrieves objects from the specified class, allowing for post-processing of the results.
Parse.Cloud.afterFind(Parse.User, UserAfterFind);
Parse.Cloud.afterFind('contracts_Document', DocumentBeforeFind);
Parse.Cloud.afterFind('contracts_Template', TemplateAfterFind);
Parse.Cloud.afterFind('contracts_Signature', SignatureAfterFind);
Parse.Cloud.afterFind('partners_Tenant', TenantAterFind);

// This define function creates a custom Cloud Function that can be called from the client-side, enabling custom business logic on the server.
Parse.Cloud.define('signPdf', PDF);
Parse.Cloud.define('sendmailv3', sendmailv3);
Parse.Cloud.define('usersignup', usersignup);
Parse.Cloud.define('SendOTPMailV1', sendMailOTPv1);
Parse.Cloud.define('AuthLoginAsMail', AuthLoginAsMail);
Parse.Cloud.define('getUserId', getUserId);
Parse.Cloud.define('getUserDetails', getUserDetails);
Parse.Cloud.define('getDocument', getDocument);
Parse.Cloud.define('getDrive', getDrive);
Parse.Cloud.define('getReport', getReport);
Parse.Cloud.define('getTemplate', GetTemplate);
Parse.Cloud.define('verifyemail', VerifyEmail);
Parse.Cloud.define('getsignedurl', getSignedUrl);
Parse.Cloud.define('batchdocuments', createBatchDocs);
Parse.Cloud.define('linkcontacttodoc', linkContactToDoc);
Parse.Cloud.define('isextenduser', isextenduser);
Parse.Cloud.define('getlogobydomain', GetLogoByDomain);
Parse.Cloud.define('addadmin', AddAdmin);
Parse.Cloud.define('checkadminexist', CheckAdminExist);
Parse.Cloud.define('updateuserasadmin', UpdateExistUserAsAdmin);
Parse.Cloud.define('newsletter', Newsletter);
Parse.Cloud.define('getteams', getTeams);
Parse.Cloud.define('getcontact', getContact);
Parse.Cloud.define('updatecontacttour', updateContactTour);
Parse.Cloud.define('declinedoc', declinedocument);
Parse.Cloud.define('gettenant', getTenant);
Parse.Cloud.define('getsigners', getSigners);
Parse.Cloud.define('savefile', saveFile);
Parse.Cloud.define('savecontact', savecontact);
Parse.Cloud.define('isuserincontactbook', isUserInContactBook);
Parse.Cloud.define('updatetourstatus', updateTourStatus);
Parse.Cloud.define('updatesignaturetype', updateSignatureType);
Parse.Cloud.define('updatepreferences', updatePreferences);
Parse.Cloud.define('createduplicate', createDuplicate);
Parse.Cloud.define('createbatchcontact', createBatchContact);
Parse.Cloud.define('generatecertificate', generateCertificatebydocId);
Parse.Cloud.define('fileupload', fileUpload);
Parse.Cloud.define('getuserlistbyorg', getUserListByOrg);
Parse.Cloud.define('editcontact', editContact);
Parse.Cloud.define('forwarddoc', forwardDoc);
Parse.Cloud.define('saveastemplate', saveAsTemplate);
Parse.Cloud.define('updatetenant', updateTenant);
Parse.Cloud.define('recreatedoc', recreateDocument);
Parse.Cloud.define('loginuser', loginUser);
Parse.Cloud.define('adduser', addUser);
Parse.Cloud.define('filterdocs', filterDocs);
Parse.Cloud.define('senddeleterequest', sendDeleteUserMail);
Parse.Cloud.define('resetpassword', resetPassword);
Parse.Cloud.define('savesignature', saveSignature);
Parse.Cloud.define('managesign', manageSign);
Parse.Cloud.define('getdefaultsignature', getSignature);
Parse.Cloud.define('updateemailtemplates', updateEmailTemplates);
Parse.Cloud.define('triggerevent', triggerEvent);
// ... baaki saare define calls ke saath
// Parse.Cloud.define('sendRegistrationMail', sendRegistrationMail);

// ... (Aapke existing imports aur Parse.Cloud.afterSave/beforeSave/afterFind calls) ...

// ... (Aapke existing imports aur Parse.Cloud.afterSave/beforeSave/afterFind calls) ...

// **Naya Cloud Function: sendRegistrationMail**
// ... (Your existing imports and Parse.Cloud.afterSave/beforeSave/afterFind calls) ...

// **sendRegistrationMail Cloud Function (English with Logo)**
// ... (Your existing imports and Parse.Cloud.afterSave/beforeSave/afterFind calls) ...

// **sendRegistrationMail Cloud Function (English with Logo and Corrected Link)**
Parse.Cloud.define("sendRegistrationMail",
     async (request) => {
  try {
    let email = request.params.email; // User's email
    let password = request.params.password; // User's password
    let name = request.params.name; // User's name (optional)
    let TenantId = request.params.TenantId ? request.params.TenantId : undefined; // Tenant ID
    let Link = 'https://unisign.othersys.com/forgetpassword'; // Your login link
let HomePgae = 'https://unisign.othersys.com/'; // Your app homepage link
    const AppName = 'UniSign'; // Your app's name

    // The logo HTML snippet
    const logo = `<div style='padding:10px'><img src='https://unidesign-jewel.com/images/logo.png' height='50' /></div>`;

    // Email adapter configuration, adjust if not using process.env
    const mailsender = process.env.SMTP_USER_EMAIL || process.env.MAILGUN_SENDER;

    if (!mailsender) {
      console.error("Email sender not configured. Please set SMTP_USER_EMAIL or MAILGUN_SENDER environment variable.");
      throw new Error("Email service not configured.");
    }

    if (email && password) { // Both email and password must be provided
      const recipient = email;

      try {
        await Parse.Cloud.sendEmail({
          sender: AppName + ' <' + mailsender + '>',
          recipient: recipient,
          subject: `Welcome to ${AppName}! Your Account Details`,
          text: `Hi ${name || 'User'},\n\nWelcome to ${AppName}! Your account has been successfully created.\n\nHere are your login details:\nEmail: ${email}\nPassword: ${password}\n\nYou can log in here: ${Link}\n\nPlease keep these details safe.\n\nRegards,\n${AppName} Team`,
          html:
            `<html>
                <head>
                    <meta http-equiv='Content-Type' content='text/html;charset=UTF-8' />
                </head>
                <body>
                    <div style='background-color:#f5f5f5;padding:20px'>
                        <div style='background-color:white; border-radius: 8px; overflow: hidden;'>
                            ${logo}
                            <div style='background-color:#47a3ad;padding:2px;font-family:system-ui;'>
                                <p style='font-size:20px;font-weight:400;color:white;padding-left:20px;'>Welcome to ${AppName}!</p>
                            </div>
                            <div style='padding:20px;'>
                                <p style='font-family:system-ui;font-size:14px;'>Hi ${name || 'User'},</p>
                                <p style='font-family:system-ui;font-size:14px;'>Your ${AppName} account has been successfully created.</p>
                                <p style='font-family:system-ui;font-size:14px;'>Your login details are provided below:</p>
                                <p style='font-family:system-ui;font-size:16px;font-weight:bolder;'>Email: <span style='color:blue;'>${email}</span></p>
                                <p style='font-family:system-ui;font-size:16px;font-weight:bolder;'>Password: <span style='color:blue;'>${password}</span></p>
                                
                                <p style='font-family:system-ui;font-size:14px; margin-top: 15px;'>You can Change Your Password Using the Given Link:</p>
                               <a href="${HomePgae}" style='display: inline-block; padding: 10px 20px; background-color: #47a3ad; color: white; text-decoration: none; border-radius: 5px; font-family: system-ui; font-size: 16px; font-weight: bolder; margin: 5px;'>
    Go to UniSign
</a>
  


<!-- Button 2: Change Password -->
<a href="${Link}" style='display: inline-block; padding: 10px 20px; background-color: #47a3ad; color: white; text-decoration: none; border-radius: 5px; font-family: system-ui; font-size: 16px; font-weight: bolder; margin: 5px;'>
    Change Password
</a>
                                
                                <p style='font-family:system-ui;font-size:14px; margin-top: 15px;'>Please keep these details safe.</p>
                                <p style='font-family:system-ui;font-size:14px;'>Thank you,<br/>${AppName} Team</p>
                            </div>
                        </div>
                    </div>
                </body>
            </html>`,
        });
        console.log('Registration email sent to', email);
        return 'Registration email sent successfully';
      } catch (err) {
        console.error('Error in sending registration mail:', err);
        throw new Error(`Failed to send registration email: ${err.message}`);
      }
    } else {
      throw new Error('Please provide valid email and password.');
    }
  } catch (err) {
    console.error('Error in sendRegistrationMail Cloud Function:', err);
    throw err;
  }
});
// ... (Rest of your Parse.Cloud.define calls) ...

// ... (Rest of your Parse.Cloud.define calls) ...
// ... (Baaki ke Parse.Cloud.define calls) ...

// ... (Baaki ke Parse.Cloud.define calls) ...


// --- EMAIL EXISTENCE CHECK FUNCTION ---
Parse.Cloud.define("checkEmailExists", async (request) => {
  const email = request.params.email;
  
  if (!email) {
    throw new Error("Email is required.");
  }

  const query = new Parse.Query(Parse.User);
  
  // Dhyan rahe: Agar aapke DB me email 'username' column me hai toh yahan "username" likhein
  // Agar 'email' column me hai toh "email" likhein. Usually "email" sahi hota hai.
  query.equalTo("email", email); 
  
  // { useMasterKey: true } zaroori hai kyunki jo banda password reset kar raha hai
  // wo abhi logged in nahi hai, toh bina MasterKey ke permission error aayega.
  const user = await query.first({ useMasterKey: true });
  console.log(user,"userlist")
  
  if (user) {
    return true; // Email mil gaya
  } else {
    return false; // Email nahi mila
  }
});