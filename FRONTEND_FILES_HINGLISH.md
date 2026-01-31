# OpenSign Frontend - PDF Management Related Files (Hinglish Explanation)

## Main PDF Components Folder

**Location:** `apps/OpenSign/src/components/pdf/`

### 1. **EditTemplate.jsx** ⭐ (सबसे important)
   - **Kya hai:** Template banane ke liye component jo PDF upload karte ho aur fields add karte ho
   - **Main kaam:**
     - PDF upload karna
     - PDF validation (check karna PDF sahi hai)
     - Signer fields add karna
     - Notification settings lagna
     - Template save karna
   - **Use:** Jab naya template create karte ho

### 2. **RenderPdf.jsx**
   - **Kya hai:** PDF ko screen par display karna
   - **Main kaam:**
     - PDF render karna (dikhana)
     - Pages load karna
     - Zoom in/out functionality

### 3. **RenderAllPdfPage.jsx**
   - **Kya hai:** Sari PDF pages ko dikhana ek saath
   - **Main kaam:** Grid view mein sare pages dikhana

### 4. **PdfHeader.jsx**
   - **Kya hai:** PDF editor ke top mein header (toolbar)
   - **Main kaam:**
     - Save button
     - Back button
     - Settings

### 5. **PdfTools.jsx**
   - **Kya hai:** PDF editing tools (toolbar)
   - **Main kaam:**
     - Zoom
     - Page navigation
     - Add fields buttons

### 6. **DragElement.jsx**
   - **Kya hai:** Drag karna elements ko PDF par
   - **Main kaam:** Signature, text, checkbox fields drag karna

### 7. **WidgetComponent.jsx**
   - **Kya hai:** Signature field, text field, etc. ka UI
   - **Main kaam:** Fields ko PDF par show karna aur edit karna

### 8. **WidgetList.jsx**
   - **Kya hai:** Left sidebar mein widget list (sare fields)
   - **Main kaam:** Available fields dikhana jis ko add kar sakte ho

### 9. **Placeholder.jsx**
   - **Kya hai:** Signature placeholder (jagah reserve karna)
   - **Main kaam:** Signature ke liye box banana

### 10. **PlaceholderType.jsx**
   - **Kya hai:** Type select karna placeholder ka (signature, initials, etc.)
   - **Main kaam:** Field type choose karna

### 11. **PlaceholderCopy.jsx**
   - **Kya hai:** Placeholder ko copy karna
   - **Main kaam:** Same placeholder ko dusre pages par add karna

### 12. **AgreementSign.jsx**
   - **Kya hai:** Agreement sign karna (recipient side)
   - **Main kaam:** PDF ko manually sign karna

### 13. **AgreementContent.jsx**
   - **Kya hai:** Agreement ka content show karna
   - **Main kaam:** PDF content display

### 14. **EmailComponent.jsx** ⭐ (email bhejne ke liye)
   - **Kya hai:** Email settings component
   - **Main kaam:**
     - Email addresses add karna
     - Email message likha
     - Reminder settings

### 15. **EmailBody.jsx**
   - **Kya hai:** Email template ka body
   - **Main kaam:** Email ka text likha aur customize karna

### 16. **CustomizeMail.jsx**
   - **Kya hai:** Custom email template editor
   - **Main kaam:**
     - Email message customize karna
     - Variables add karna (name, date, etc.)
     - HTML editor

### 17. **VerifyEmail.jsx**
   - **Kya hai:** Email verify karna
   - **Main kaam:** User ka email verify karna link se

### 18. **DefaultSignature.jsx**
   - **Kya hai:** Default signature save karna
   - **Main kaam:** Personal signature save karna reuse ke liye

### 19. **Signedby.jsx**
   - **Kya hai:** Signed by information show karna
   - **Main kaam:** Kis ne sign kiya, kab kiya ye dikhana

### 20. **SignerListComponent.jsx**
   - **Kya hai:** Signers list show karna
   - **Main kaam:** Sare signers dikhana aur unka status

### 21. **SignerListPlace.jsx**
   - **Kya hai:** Placeholder mein signer list
   - **Main kaam:** Placeholder par signer select karna

### 22. **RecipientList.jsx**
   - **Kya hai:** Recipients ka list (jo sign karenga)
   - **Main kaam:** Sare recipients dikhana

### 23. **DragGridLinesLayer.js**
   - **Kya hai:** Grid lines for alignment
   - **Main kaam:** PDF par grid lines dikhana positioning ke liye

### 24. **BorderResize.jsx**
   - **Kya hai:** Widget ka border resize karna
   - **Main kaam:** Field ko drag karke size badalna

### 25. **CellsWidget.jsx**
   - **Kya hai:** Widget cells (multiple widgets)
   - **Main kaam:** Multiple widgets ko manage karna

### 26. **CellsSettingModal.jsx**
   - **Kya hai:** Widget settings modal
   - **Main kaam:** Widget ki settings change karna

### 27. **PrefillWidgetsModal.jsx**
   - **Kya hai:** Pre-fill values modal
   - **Main kaam:** Fields mein default values bharna

### 28. **WidgetsValueModal.jsx**
   - **Kya hai:** Widget value set karna
   - **Main kaam:** Field value define karna

### 29. **WidgetNameModal.jsx**
   - **Kya hai:** Widget ka naam rakhna
   - **Main kaam:** Field ko naam dena (field id)

### 30. **AddRoleModal.jsx**
   - **Kya hai:** Role add karna
   - **Main kaam:** Signer roles banani (sender, cc, etc.)

### 31. **PageReorderModal.jsx**
   - **Kya hai:** Pages ka order change karna
   - **Main kaam:** PDF pages ko reorder karna (1,3,2 → 1,2,3)

### 32. **PrevNext.jsx**
   - **Kya hai:** Previous/Next page buttons
   - **Main kaam:** Page navigation

### 33. **TextFontSetting.jsx**
   - **Kya hai:** Text field ka font settings
   - **Main kaam:** Font size, color, style change karna

### 34. **EditorToolbar.jsx**
   - **Kya hai:** Top toolbar with all options
   - **Main kaam:** Sare options ka top menu

### 35. **Guidelines.jsx**
   - **Kya hai:** Alignment guidelines
   - **Main kaam:** Widgets align karne mein help

### 36. **DropdownWidgetOption.jsx**
   - **Kya hai:** Dropdown options for widgets
   - **Main kaam:** Widget action menu (delete, edit, etc.)

### 37. **SelectLanguage.jsx**
   - **Kya hai:** Language select karna
   - **Main kaam:** App ka language change karna

### 38. **getWidgetType.jsx**
   - **Kya hai:** Widget type determine karna
   - **Main kaam:** Field type detect karna (signature, text, etc.)

### 39. **WidgetsDragPreview.jsx**
   - **Kya hai:** Drag preview karte time widget dikhana
   - **Main kaam:** Drag karte time field ka preview dikhana

### 40. **Widgets folder**
   - **Kya hai:** Individual widget components
   - **Main kaam:** Har type ke field ka component

---

## Pages (Complete Pages) 

**Location:** `apps/OpenSign/src/pages/`

### 1. **SignyourselfPdf.jsx** ⭐ (Self-signing)
   - **Kya hai:** Apne aap ko sign karna page
   - **Main kaam:**
     - PDF open karna
     - Apna signature add karna
     - Document sign karna

### 2. **PdfRequestFiles.jsx** ⭐ (Recipient signing)
   - **Kya hai:** Recipients ke liye signing page
   - **Main kaam:**
     - Document receive karna
     - Signature add karna
     - Send back karna

### 3. **PlaceHolderSign.jsx** ⭐ (Placeholder-based signing)
   - **Kya hai:** Placeholder mein sign karna
   - **Main kaam:**
     - Pre-made placeholder par signature add karna
     - Signature box par click karna

### 4. **DraftDocument.jsx** ⭐ (Draft documents)
   - **Kya hai:** Draft documents manage karna
   - **Main kaam:**
     - Templates se documents banani
     - Details fill karna
     - Recipients add karna
     - Send karna

### 5. **DebugPdf.jsx**
   - **Kya hai:** Debugging page for PDFs
   - **Main kaam:** PDF issues check karna (development ke liye)

### 6. **Managesign.jsx** ⭐ (Document management)
   - **Kya hai:** Sent documents manage karna
   - **Main kaam:**
     - Sent documents dekha
     - Status dekha (pending, signed, rejected)
     - Re-send karna
     - Download karna

### 7. **Opensigndrive.jsx** ⭐ (Document storage)
   - **Kya hai:** Drive - sabhi documents ek jagah
   - **Main kaam:**
     - All documents store karna
     - Search karna
     - Download karna
     - Delete karna

### 8. **DocSuccessPage.jsx**
   - **Kya hai:** Success page jab document send ho jaye
   - **Main kaam:** Success message dikhana

### 9. **VerifyDocument.jsx**
   - **Kya hai:** Signed document verify karna
   - **Main kaam:**
     - Digital signature verify karna
     - Document authentication

### 10. **Report.jsx**
   - **Kya hai:** Reports page
   - **Main kaam:** Activity reports, stats dikhana

### 11. **Dashboard.jsx**
   - **Kya hai:** Home page/dashboard
   - **Main kaam:** Overview, stats, quick actions

### 12. **Preferences.jsx** ⭐ (Settings)
   - **Kya hai:** User preferences/settings
   - **Main kaam:**
     - Signature types enable/disable
     - Email notifications settings
     - Notify on signatures toggle
     - Download filename format

### 13. **Form.jsx**
   - **Kya hai:** Document send form
   - **Main kaam:** Recipients add karna, email message likha, send karna

### 14. **TemplatePlaceholder.jsx**
   - **Kya hai:** Template with placeholders
   - **Main kaam:** Pre-made templates use karna

### 15. **UserProfile.jsx**
   - **Kya hai:** User ki profile
   - **Main kaam:** User info edit karna

### 16. **UserList.jsx**
   - **Kya hai:** Sabhi users ki list (admin ke liye)
   - **Main kaam:** Users manage karna

### 17. **GuestLogin.jsx**
   - **Kya hai:** Guest login page
   - **Main kaam:** Non-registered user ko login karna

### 18. **Login.jsx**
   - **Kya hai:** Main login page
   - **Main kaam:** User ko login karna

### 19. **ChangePassword.jsx**
   - **Kya hai:** Password change page
   - **Main kaam:** Password change karna

### 20. **ForgetPassword.jsx**
   - **Kya hai:** Forget password page
   - **Main kaam:** Password reset link bhej

### 21. **AddAdmin.jsx**
   - **Kya hai:** Admin add karna (admin portal)
   - **Main kaam:** Naya admin create karna

### 22. **UpdateExistUserAdmin.jsx**
   - **Kya hai:** Existing admin update karna
   - **Main kaam:** Admin details edit karna

### 23. **PageNotFound.jsx**
   - **Kya hai:** 404 error page
   - **Main kaam:** Page not found error dikhana

---

## Primitives (Utility Components)

**Location:** `apps/OpenSign/src/primitives/`

### 1. **DownloadPdfZip.jsx** ⭐ (Download multiple PDFs)
   - **Kya hai:** Multiple PDFs ko zip mein download karna
   - **Main kaam:**
     - Selected PDFs select karna
     - Zip file banani
     - Download karna (एक साथ सब)
   - **Use:** Managesign ya drive page se multiple files download karna

### 2. **Alert.jsx**
   - **Kya hai:** Alert/notification component
   - **Main kaam:** Success, error messages dikhana

### 3. **Loader.jsx**
   - **Kya hai:** Loading spinner
   - **Main kaam:** Loading ke time indicator dikhana

### 4. **LoaderWithMsg.jsx**
   - **Kya hai:** Loader with message
   - **Main kaam:** Loading + message dikhana

### 5. **ModalUi.jsx**
   - **Kya hai:** Modal/popup window
   - **Main kaam:** Dialog boxes, confirmations

### 6. **DeleteUserModal.jsx**
   - **Kya hai:** User delete confirmation modal
   - **Main kaam:** Delete confirm karna

### 7. **LinkUserModal.jsx**
   - **Kya hai:** User linking modal
   - **Main kaam:** Users ko link karna (organization mein)

### 8. **PasswordResetModal.jsx**
   - **Kya hai:** Password reset modal
   - **Main kaam:** Password reset form

### 9. **PdfDeclineModal.jsx**
   - **Kya hai:** PDF decline confirmation modal
   - **Main kaam:** Document reject karna reason ke saath

### 10. **CheckCircle.jsx**
   - **Kya hai:** Success checkmark component
   - **Main kaam:** Success indicator dikhana

### 11. **AddContact.jsx**
   - **Kya hai:** Add new contact component
   - **Main kaam:** Contact book mein naya contact add karna

### 12. **ShareButton.jsx**
   - **Kya hai:** Share button component
   - **Main kaam:** Document share karna link/email se

### 13. **SignerCell.jsx**
   - **Kya hai:** Signer info cell (table/list)
   - **Main kaam:** Signer details show karna

### 14. **HandleError.jsx**
   - **Kya hai:** Error handling utility
   - **Main kaam:** Errors ko handle aur display karna

### 15. **LazyPage.jsx**
   - **Kya hai:** Lazy loading for pages
   - **Main kaam:** Pages ko on-demand load karna

### 16. **Tooltip.jsx**
   - **Kya hai:** Tooltip component
   - **Main kaam:** Hover par help text dikhana

### 17. **RenderReportCell.jsx**
   - **Kya hai:** Report cell renderer
   - **Main kaam:** Reports mein cells dikhana

### 18. **SessionExpiredModal.jsx**
   - **Kya hai:** Session expired modal
   - **Main kaam:** Session expire hone par login krana

### 19. **Validate.jsx**
   - **Kya hai:** Form validation
   - **Main kaam:** Fields validate karna (email, phone, etc.)

### 20. **ValidateRoute.jsx**
   - **Kya hai:** Route protection
   - **Main kaam:** Protected routes ko check karna (auth)

### 21. **Tour.jsx**
   - **Kya hai:** App tour/tutorial
   - **Main kaam:** New users ko feature dikhana

### 22. **TourContentWithBtn.jsx**
   - **Kya hai:** Tour content with buttons
   - **Main kaam:** Tutorial steps ke saath buttons

### 23. **DotLottieReact.jsx**
   - **Kya hai:** Animation component
   - **Main kaam:** Lottie animations dikhana

---

## Utility Functions

**Location:** `apps/OpenSign/src/utils/`

### 1. **prefillUtils.js** ⭐ (Data filling)
   - **Kya hai:** Pre-fill values in fields
   - **Main kaam:**
     - Template se data fetch karna
     - Fields mein automatically values fill karna
     - Signers attach karna
     - Document create karna template se

### 2. **widgetUtils.js**
   - **Kya hai:** Widget helper functions
   - **Main kaam:**
     - Save signature/initials as default
     - Widget value management
     - Widget type checking

### 3. **upgradeProgress.js**
   - **Kya hai:** Upgrade progress indicator
   - **Main kaam:** Loading progress bar show karna large operations mein

---

## Quick File Map 📍

### PDF Upload & Template Management:
```
EditTemplate.jsx  ← PDF upload aur template create
  ├─ RenderPdf.jsx  ← PDF display
  ├─ RenderAllPdfPage.jsx  ← All pages show
  ├─ PdfHeader.jsx  ← Top toolbar
  ├─ PdfTools.jsx  ← Editing tools
  └─ WidgetComponent.jsx  ← Fields add karna
```

### Signing (Recipients):
```
PdfRequestFiles.jsx  ← Recipient signing page
  ├─ PlaceHolderSign.jsx  ← Placeholder par sign
  ├─ AgreementSign.jsx  ← Agreement signing
  └─ SignyourselfPdf.jsx  ← Self-signing
```

### Sending Documents:
```
DraftDocument.jsx  ← Template se document create
  ├─ Form.jsx  ← Recipients add aur send
  ├─ EmailComponent.jsx  ← Email settings
  └─ CustomizeMail.jsx  ← Email customize
```

### Document Management:
```
Managesign.jsx  ← Sent documents manage
  ├─ DownloadPdfZip.jsx  ← Multiple files download
  └─ Opensigndrive.jsx  ← All documents storage
```

### Settings:
```
Preferences.jsx  ← User preferences
  ├─ Signature types enable/disable
  ├─ Email notifications
  └─ Download format settings
```

---

## Data Flow Example 🔄

```
1. User Login
   ↓
2. Dashboard/Managesign
   ↓
3. Template Create (EditTemplate.jsx)
   - PDF upload karna
   - Fields add karna (WidgetComponent)
   - Email customize karna (CustomizeMail)
   ↓
4. Send Document (DraftDocument.jsx)
   - Recipients add karna
   - Prefill data (prefillUtils.js)
   - Send karna (EmailComponent)
   ↓
5. Recipient Receives (PdfRequestFiles.jsx)
   - Link se open karega
   - Placeholder par sign karega
   - Submit karega
   ↓
6. Owner Receives Notification
   - Email me notification
   - Managesign mein status "Signed"
   ↓
7. Download (DownloadPdfZip.jsx)
   - Signed PDF download karna
```

---

## Key Technologies Used:

- **React** - Frontend framework
- **pdf-lib** - PDF manipulation (same as backend)
- **react-pdf** - PDF rendering
- **Drag & Drop** - Widget positioning
- **State Management** - React hooks/Redux
- **Axios** - API calls
- **Form Validation** - Email, phone, etc.

---

## Summary Table:

| **Purpose** | **Main File** | **Location** |
|-----------|----------|----------|
| PDF Edit/Template | EditTemplate.jsx | components/pdf/ |
| Self Sign | SignyourselfPdf.jsx | pages/ |
| Recipient Sign | PdfRequestFiles.jsx | pages/ |
| Send Docs | DraftDocument.jsx | pages/ |
| Manage Sent Docs | Managesign.jsx | pages/ |
| All Documents | Opensigndrive.jsx | pages/ |
| Email Setup | EmailComponent.jsx | components/pdf/ |
| Email Customize | CustomizeMail.jsx | components/pdf/ |
| Download Multiple | DownloadPdfZip.jsx | primitives/ |
| Settings | Preferences.jsx | pages/ |
| Widget Management | WidgetComponent.jsx | components/pdf/ |
| Pre-fill Data | prefillUtils.js | utils/ |

