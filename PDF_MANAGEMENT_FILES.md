# OpenSignServer - PDF Management, Merge & Email Files

## Core PDF Processing Files

### 1. **PDF.js**
   - **Path:** `apps/OpenSignServer/cloud/parsefunction/pdf/PDF.js`
   - **Purpose:** Main PDF signing and processing logic
   - **Key Functions:**
     - PDF loading and validation
     - Digital signature addition
     - Certificate merging into PDF
     - Placeholder management for signatures
     - Email sending after signing
   - **Operations Handled:**
     - Sign PDF with digital certificates
     - Merge certificate with main PDF
     - Flatten forms after signing
     - Send completion emails

### 2. **PDFArrayCustom.js**
   - **Path:** `apps/OpenSignServer/cloud/parsefunction/pdf/PDFArrayCustom.js`
   - **Purpose:** Custom handling for PDF arrays and multiple PDFs

### 3. **GenerateCertificate.js**
   - **Path:** `apps/OpenSignServer/cloud/parsefunction/pdf/GenerateCertificate.js`
   - **Purpose:** Generate digital signing certificates
   - **Key Functions:**
     - Create certificate files
     - Generate certificate metadata
     - Handle certificate storage

### 4. **Placeholder.js**
   - **Path:** `apps/OpenSignServer/cloud/parsefunction/pdf/Placeholder.js`
   - **Purpose:** Manage signature placeholders in PDFs
   - **Key Functions:**
     - Add signature placeholder fields
     - Position management for signatures

---

## PDF Conversion & Utility Files

### 5. **docxtopdf.js**
   - **Path:** `apps/OpenSignServer/cloud/customRoute/docxtopdf.js`
   - **Purpose:** Convert DOCX files to PDF format
   - **Key Functions:**
     - DOCX to PDF conversion
     - Concurrency control for conversions
     - File upload to parse server
     - Error handling for conversion failures

### 6. **decryptpdf.js**
   - **Path:** `apps/OpenSignServer/cloud/customRoute/decryptpdf.js`
   - **Purpose:** Decrypt password-protected PDFs
   - **Key Functions:**
     - Remove PDF encryption
     - Handle password validation
     - Return decrypted PDF bytes

### 7. **fileUtils.js**
   - **Path:** `apps/OpenSignServer/utils/fileUtils.js`
   - **Purpose:** File utility functions for PDF management
   - **Key Functions:**
     - File name generation and sanitization
     - File type validation (especially for PDFs)
     - File path management

---

## Email Integration Files

### 8. **sendMailv3.js**
   - **Path:** `apps/OpenSignServer/cloud/parsefunction/sendMailv3.js`
   - **Purpose:** Primary email sending service (v3)
   - **Key Functions:**
     - Send emails via Mailgun or SMTP
     - Attach PDFs and certificates to emails
     - Handle email templates
     - Support multiple email providers
     - Track email sending

### 9. **sendMailGmailProvider.js**
   - **Path:** `apps/OpenSignServer/cloud/parsefunction/sendMailGmailProvider.js`
   - **Purpose:** Gmail provider for email sending
   - **Key Functions:**
     - Gmail-specific email delivery
     - OAuth authentication handling

### 10. **SendMailOTPv1.js**
   - **Path:** `apps/OpenSignServer/cloud/parsefunction/SendMailOTPv1.js`
   - **Purpose:** OTP email sending
   - **Key Functions:**
     - Send one-time password emails
     - OTP verification emails

### 11. **VerifyEmail.js**
   - **Path:** `apps/OpenSignServer/cloud/parsefunction/VerifyEmail.js`
   - **Purpose:** Email verification logic
   - **Key Functions:**
     - Send verification emails
     - Handle email confirmation

### 12. **updateEmailTemplates.js**
   - **Path:** `apps/OpenSignServer/cloud/parsefunction/updateEmailTemplates.js`
   - **Purpose:** Manage and update email templates
   - **Key Functions:**
     - Update email template content
     - Template variable replacement

---

## Document Workflow Files (Uses PDF Management)

### 13. **createBatchDocs.js**
   - **Path:** `apps/OpenSignServer/cloud/parsefunction/createBatchDocs.js`
   - **Purpose:** Batch document creation and sending
   - **Key Functions:**
     - Create multiple documents at once
     - Send emails to multiple recipients
     - Batch mail sending

### 14. **declinedocument.js**
   - **Path:** `apps/OpenSignServer/cloud/parsefunction/declinedocument.js`
   - **Purpose:** Handle document decline workflow
   - **Key Functions:**
     - Send decline notification emails
     - Update document status
     - Email notifications on decline

### 15. **ForwardDoc.js**
   - **Path:** `apps/OpenSignServer/cloud/parsefunction/ForwardDoc.js`
   - **Purpose:** Forward documents to other signers
   - **Key Functions:**
     - Send forwarded document emails
     - Handle forwarding workflow
     - Attach PDFs to forward emails

---

## Backup/Legacy Files

### 16. **pdf-backup.js**
   - **Path:** `apps/OpenSignServer/cloud/parsefunction/pdf/pdf-backup.js`
   - **Purpose:** Backup version of PDF processing logic

### 17. **backup-mail.js**
   - **Path:** `apps/OpenSignServer/cloud/parsefunction/pdf/backup-mail.js`
   - **Purpose:** Backup email sending logic

---

## Core Utilities

### 18. **Utils.js**
   - **Path:** `apps/OpenSignServer/Utils.js`
   - **Purpose:** General utilities including PDF operations
   - **Key Functions:**
     - `flattenPdf()` - Remove widgets and flatten PDF
     - PDF field removal
     - Email template variable replacement
     - Secure URL generation
     - File usage tracking

---

## Cloud Configuration File

### 19. **main.js**
   - **Path:** `apps/OpenSignServer/cloud/main.js`
   - **Purpose:** Cloud function definitions and routing
   - **Key Functions:**
     - Define `signPdf` cloud function
     - Define `sendmailv3` cloud function
     - Register all Parse Cloud functions

---

## Email Template Files (Static)

### 20-26. **Email Templates** (in `apps/OpenSignServer/files/`)
   - `custom_email.html` - Custom email HTML template
   - `custom_email.txt` - Custom email text template
   - `custom_email_subject.txt` - Custom email subject
   - `password_reset_email.html` - Password reset email HTML
   - `password_reset_email.txt` - Password reset email text
   - `password_reset_email_subject.txt` - Password reset subject
   - `verification_email.html` - Email verification HTML
   - `verification_email.txt` - Email verification text
   - `verification_email_subject.txt` - Verification subject

---

## Quick Reference Summary

### PDF Management Functions:
| Operation | Primary File | Utility Functions |
|-----------|--------------|-------------------|
| Sign PDF | PDF.js | Utils.js (flattenPdf) |
| Merge PDFs | PDF.js | PDFDocument (pdf-lib) |
| Convert DOCX→PDF | docxtopdf.js | fileUtils.js |
| Decrypt PDF | decryptpdf.js | Coherentpdf |
| Generate Certificate | GenerateCertificate.js | P12Signer, SignPdf |
| Send Signed PDF Email | sendMailv3.js | Utils.js (replaceMailVaribles) |
| Batch Send | createBatchDocs.js | sendMailv3.js |
| Document Decline | declinedocument.js | sendMailv3.js |
| Forward Document | ForwardDoc.js | sendMailv3.js |

### Email Providers Supported:
- SMTP (configurable)
- Mailgun
- Gmail (via sendMailGmailProvider.js)

### Key Technologies:
- **PDF Library:** pdf-lib (PDFDocument)
- **Digital Signing:** @signpdf/signpdf
- **Email:** Mailgun, Nodemailer
- **Certificate Signing:** P12Signer
- **Placeholder Management:** @signpdf/placeholder-pdf-lib
- **Document Encryption:** Coherentpdf

---

## Data Flow Example:

1. **PDF Upload** → fileUtils.js (validate)
2. **Add Signature** → PDF.js + Placeholder.js
3. **Generate Certificate** → GenerateCertificate.js
4. **Merge Certificate** → PDF.js (PDFDocument.load + merge)
5. **Flatten PDF** → Utils.js (flattenPdf)
6. **Send Email** → sendMailv3.js (with Mailgun/SMTP)
7. **Update Status** → Cloud database

