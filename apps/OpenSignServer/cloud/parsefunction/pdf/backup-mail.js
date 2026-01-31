// `sendCompletedMail` is used to send copy of completed document mail
async function sendCompletedMail(obj) {
  const url = obj.doc?.SignedUrl;
  const doc = obj.doc;
  const sender = obj.doc.ExtUserPtr; // Yeh document ka owner/creator hai
  const pdfName = doc.Name;
  const TenantAppName = appName;
  const logo =
    "<img src='https://unidesign-jewel.com/images/logo.png' height='50' style='padding:20px'/>";
  const opurl = ` <a href=www.opensignlabs.com target=_blank>here</a>`;

  // Pehle subject aur body taiyaar kar lete hain
  let subject = `Document "${pdfName}" has been signed by all parties`;
  let body =
    "<html><head><meta http-equiv='Content-Type' content='text/html; charset=UTF-8' /></head><body><div style='background-color:#f5f5f5;padding:20px'><div style='background-color:white'>" +
    `<div>${logo}</div><div style='padding:2px;font-family:system-ui;background-color:#47a3ad'><p style='font-size:20px;font-weight:400;color:white;padding-left:20px'>Document signed successfully</p></div><div>` +
    `<p style='padding:20px;font-family:system-ui;font-size:14px'>All parties have successfully signed the document <b>"${pdfName}"</b>. Kindly download the document from the attachment.</p>` +
    `</div></div><div><p>This is an automated email from ${TenantAppName}. For any queries regarding this email, please contact the sender ${sender.Email} directly.` +
    `If you think this email is inappropriate or spam, you may file a complaint with ${TenantAppName}${opurl}.</p></div></div></body></html>`;

  // Custom mail logic (ise waise hi rehne dein)
  if (obj?.isCustomMail) {
    // ... (YEH POORA SECTION JAISA THA WAISA HI RAHEGA, KOI BADLAV NAHI)
    const tenant = sender?.TenantId;
    if (tenant) {
      subject = tenant?.CompletionSubject ? tenant?.CompletionSubject : subject;
      body = tenant?.CompletionBody ? tenant?.CompletionBody : body;
    } else {
      const userId = sender?.CreatedBy?.objectId || sender?.UserId?.objectId;
      if (userId) {
        try {
          const tenantQuery = new Parse.Query('partners_Tenant');
          tenantQuery.equalTo('UserId', {
            __type: 'Pointer',
            className: '_User',
            objectId: userId,
          });
          const tenantRes = await tenantQuery.first({ useMasterKey: true });
          if (tenantRes) {
            const _tenantRes = JSON.parse(JSON.stringify(tenantRes));
            subject = _tenantRes?.CompletionSubject ? tenant?.CompletionSubject : subject;
            body = _tenantRes?.CompletionBody ? tenant?.CompletionBody : body;
          }
        } catch (err) {
          console.log('error in fetch tenant in signpdf', err.message);
        }
      }
    }
    const expireDate = doc.ExpiryDate.iso;
    const newDate = new Date(expireDate);
    const localExpireDate = newDate.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

    const variables = {
      document_title: pdfName,
      sender_name: sender.Name,
      sender_mail: doc?.SenderMail || sender.Email,
      sender_phone: sender?.Phone || '',
      receiver_name: sender.Name,
      receiver_email: sender.Email,
      receiver_phone: sender?.Phone || '',
      expiry_date: localExpireDate,
      company_name: sender.Company,
    };
    const replaceVar = replaceMailVaribles(subject, body, variables);
    subject = replaceVar.subject;
    body = replaceVar.body;
  }
  
  // --- YAHAN SIRF OWNER KO MAIL BHEJNE KA LOGIC HAI ---

  const Bcc = doc?.Bcc?.length > 0 ? doc.Bcc.map(x => x.Email) : [];
  const updatedBcc = doc?.SenderMail ? [...Bcc, doc?.SenderMail] : Bcc;
  const formatId = doc?.ExtUserPtr?.DownloadFilenameFormat;
  const filename = pdfName?.length > 100 ? pdfName?.slice(0, 100) : pdfName;
  const docName = buildDownloadFilename(formatId, {
    docName: filename,
    email: doc?.ExtUserPtr?.Email,
    isSigned: true,
  });

  // Sirf OWNER ko email bhejo ATTACHMENTS KE SAATH
  const ownerParams = {
    extUserId: sender.objectId,
    url: url,
    from: TenantAppName,
    replyto: doc?.ExtUserPtr?.Email || '',
    recipient: sender.Email, // Sirf owner ka email
    subject: subject,
    pdfName: pdfName,
    html: body,
    mailProvider: obj.mailProvider,
    bcc: updatedBcc?.length > 0 ? updatedBcc : '',
    certificatePath: `./exports/signed_certificate_${doc.objectId}.pdf`, // Attachment 1
    filename: docName, // Attachment 2
  };
  
  try {
    const res = await axios.post(serverUrl + '/functions/sendmailv3', ownerParams, { headers });
    if (res.data?.result?.status !== 'success') {
      // Agar mail fail ho, toh certificate file delete kar do
      unlinkFile(`./exports/signed_certificate_${doc.objectId}.pdf`);
    }
  } catch (err) {
    unlinkFile(`./exports/signed_certificate_${doc.objectId}.pdf`);
  }

  // SIGNERS KO MAIL BHEJNE WALA POORA CODE HATA DIYA GAYA HAI
}