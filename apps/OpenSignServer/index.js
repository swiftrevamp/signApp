import dotenv from 'dotenv';
dotenv.config({ quiet: true });
import express from 'express';
import cors from 'cors';
import { ParseServer } from 'parse-server';
import path from 'path';
const __dirname = path.resolve();
import http from 'http';
import formData from 'form-data';
import Mailgun from 'mailgun.js';
import { ApiPayloadConverter } from 'parse-server-api-mail-adapter';
import S3Adapter from '@parse/s3-files-adapter';
import FSFilesAdapter from '@parse/fs-files-adapter';
import AWS from 'aws-sdk';
import { app as customRoute } from './cloud/customRoute/customApp.js';
import { exec } from 'child_process';
import { createTransport } from 'nodemailer';
import { appName, cloudServerUrl, serverAppId, smtpenable, smtpsecure, useLocal } from './Utils.js';
import { SSOAuth } from './auth/authadapter.js';
import runDbMigrations from './migrationdb/index.js';
import { validateSignedLocalUrl } from './cloud/parsefunction/getSignedUrl.js';
import maintenance_mode_message from 'aws-sdk/lib/maintenance_mode_message.js';

// ✅ 1. Define Mount Path Globally (Usually '/app')
const MOUNT_PATH = process.env.PARSE_MOUNT || '/app';

// --- START: CUSTOM PASSWORD RESET HTML DESIGN ---
const RESET_PASSWORD_HTML = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Reset Password</title>
    <style>
        body { margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif; background-color: #f5f5f5; display: flex; justify-content: center; align-items: center; height: 100vh; }
        .container { width: 100%; max-width: 450px; padding: 20px; box-sizing: border-box; }
        .card { background-color: white; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .header { background-color: #47a3ad; padding: 15px 20px; }
        .header h1 { margin: 0; font-size: 20px; color: white; font-weight: 400; }
        .content { padding: 30px 20px; }
        .label { display: block; margin-bottom: 8px; font-weight: bold; color: #333; font-size: 14px; }
        .input-field { width: 100%; padding: 12px; border: 1px solid #ddd; border-radius: 5px; font-size: 16px; margin-bottom: 20px; box-sizing: border-box; }
        .btn { display: block; width: 100%; padding: 12px; background-color: #47a3ad; color: white; border: none; border-radius: 5px; font-size: 16px; font-weight: bold; cursor: pointer; text-align: center; text-decoration: none; }
        .btn:hover { background-color: #3b8d96; }
        .btn:disabled { background-color: #ccc; cursor: not-allowed; }
        #message { margin-top: 15px; text-align: center; font-size: 14px; }
        .error { color: red; }
        .success { color: green; }
    </style>
</head>
<body>
    <div class="container">
        <div class="card">
            <div class="header">
                <h1>Reset Your Password</h1>
            </div>
            <div class="content">
                <p style="font-size: 14px; color: #666; margin-bottom: 20px;">
                    Enter your new password for <strong id="appName">your account</strong>.
                </p>

                <form id="resetForm">
                    <label class="label">New Password</label>
                    <input type="password" id="new_password" class="input-field" required placeholder="Enter new password" />

                    <label class="label">Confirm Password</label>
                    <input type="password" id="confirm_password" class="input-field" required placeholder="Confirm new password" />

                    <button type="submit" class="btn">Change Password</button>
                </form>

                <div id="message"></div>
            </div>
        </div>
    </div>

    <script>
        const urlParams = new URLSearchParams(window.location.search);
        const token = urlParams.get('token');
        const id = urlParams.get('id'); 
        const appNameParam = urlParams.get('app');
        
        if(appNameParam) {
            document.getElementById('appName').innerText = appNameParam;
        }

        document.getElementById('resetForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const password = document.getElementById('new_password').value;
            const confirm = document.getElementById('confirm_password').value;
            const messageDiv = document.getElementById('message');
            const btn = document.querySelector('.btn');

            if (password !== confirm) {
                messageDiv.innerHTML = '<span class="error">Passwords do not match!</span>';
                return;
            }

            btn.disabled = true;
            btn.innerText = 'Updating...';

            try {
                // Determine API URL based on current location
                // We are now at /app/password_reset_page, so we just go up to /app/apps/ID/...
                
                // Assuming current URL is https://site.com/app/password_reset_page...
                // Origin: https://site.com
                // Path: /app
                
                // Construct API path dynamically to be safe
                const origin = window.location.origin;
                // Parse Mount is usually the first part of pathname
                const pathParts = window.location.pathname.split('/'); 
                // Just in case mount path changes, we try to use the one from URL
                const mountPath = '/app'; // Defaulting to /app as per standard Parse setup
                
                const apiUrl = origin + mountPath + '/apps/' + id + '/request_password_reset';

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        token: token,
                        new_password: password
                    })
                });

                if (response.ok) {
                    document.querySelector('.content').innerHTML = 
                        '<div style="text-align:center; color:green;"><h3>Success!</h3><p>Your password has been successfully changed.</p></div>';
                } else {
                    const data = await response.json();
                    throw new Error(data.error || 'Failed to reset password');
                }
            } catch (error) {
                messageDiv.innerHTML = '<span class="error">Error: ' + error.message + '</span>';
                btn.disabled = false;
                btn.innerText = 'Change Password';
            }
        });
    </script>
</body>
</html>
`;
// --- END: CUSTOM PASSWORD RESET HTML DESIGN ---

let fsAdapter;
maintenance_mode_message.suppress = true;
if (useLocal !== 'true') {
  try {
    const spacesEndpoint = new AWS.Endpoint(process.env.DO_ENDPOINT);
    const s3Options = {
      bucket: process.env.DO_SPACE,
      baseUrl: process.env.DO_BASEURL,
      fileAcl: 'none',
      region: process.env.DO_REGION,
      directAccess: true,
      preserveFileName: true,
      presignedUrl: true,
      presignedUrlExpires: 900,
      s3overrides: {
        credentials: {
          accessKeyId: process.env.DO_ACCESS_KEY_ID,
          secretAccessKey: process.env.DO_SECRET_ACCESS_KEY,
        },
        endpoint: spacesEndpoint,
      },
    };
    fsAdapter = new S3Adapter(s3Options);
  } catch (err) {
    console.log('Please provide AWS credintials in env file! Defaulting to local storage.');
    fsAdapter = new FSFilesAdapter({
      filesSubDirectory: 'files', // optional, defaults to ./files
    });
  }
} else {
  fsAdapter = new FSFilesAdapter({
    filesSubDirectory: 'files', // optional, defaults to ./files
  });
}

let transporterMail;
let mailgunClient;
let mailgunDomain;
let isMailAdapter = false;
if (smtpenable) {
  try {
    let transporterConfig = {
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 465,
      secure: smtpsecure,
    };

    const smtpUser = process.env.SMTP_USERNAME;
    const smtpPass = process.env.SMTP_PASS;

    if (smtpUser && smtpPass) {
      transporterConfig.auth = {
        user: process.env.SMTP_USERNAME ? process.env.SMTP_USERNAME : process.env.SMTP_USER_EMAIL,
        pass: smtpPass,
      };
    }
    transporterMail = createTransport(transporterConfig);
    await transporterMail.verify();
    isMailAdapter = true;
  } catch (err) {
    isMailAdapter = false;
    console.log(`Please provide valid SMTP credentials: ${err}`);
  }
} else if (process.env.MAILGUN_API_KEY) {
  try {
    const mailgun = new Mailgun(formData);
    mailgunClient = mailgun.client({
      username: 'api',
      key: process.env.MAILGUN_API_KEY,
    });
    mailgunDomain = process.env.MAILGUN_DOMAIN;
    isMailAdapter = true;
  } catch (error) {
    isMailAdapter = false;
    console.log('Please provide valid Mailgun credentials');
  }
}
const mailsender = smtpenable ? process.env.SMTP_USER_EMAIL : process.env.MAILGUN_SENDER;

// ✅ 2. Construct correct URL for Live Server (Include /app)
// SERVER_URL is typically 'https://domain.com/app'
const serverUrlWithMount = process.env.SERVER_URL || cloudServerUrl;
// Helper to remove trailing slash if exists
const cleanServerUrl = serverUrlWithMount.replace(/\/$/, '');

export const config = {
  databaseURI:
    process.env.DATABASE_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/dev',
  cloud: function () {
    import('./cloud/main.js');
  },
  appId: serverAppId,
  logLevel: ['error'],
  maxLimit: 500,
  maxUploadSize: '100mb',
  masterKey: process.env.MASTER_KEY, 
  masterKeyIps: ['0.0.0.0/0', '::/0'], 
  serverURL: cloudServerUrl, 
  verifyUserEmails: false,
  publicServerURL: process.env.SERVER_URL || cloudServerUrl,
  appName: appName,
  
  // ✅ 3. USE MOUNT PATH IN CONFIG
  // This makes the link: https://unisign.othersys.com/app/password_reset_page
  customPages: {
    choosePassword: cleanServerUrl + '/password_reset_page',
  },

  allowClientClassCreation: false,
  allowExpiredAuthDataToken: false,
  enableInsecureAuthAdapters: false,
  databaseOptions: { allowPublicExplain: false },
  encodeParseObjectInCloudFunction: true,
  ...(isMailAdapter === true
    ? {
        emailAdapter: {
          module: 'parse-server-api-mail-adapter',
          options: {
            sender: appName + ' <' + mailsender + '>',
            templates: {
              passwordResetEmail: {
                subjectPath: './files/password_reset_email_subject.txt',
                textPath: './files/password_reset_email.txt',
                htmlPath: './files/password_reset_email.html',
              },
              verificationEmail: {
                subjectPath: './files/verification_email_subject.txt',
                textPath: './files/verification_email.txt',
                htmlPath: './files/verification_email.html',
              },
            },
            apiCallback: async ({ payload, locale }) => {
              if (mailgunClient) {
                const mailgunPayload = ApiPayloadConverter.mailgun(payload);
                await mailgunClient.messages.create(mailgunDomain, mailgunPayload);
              } else if (transporterMail) await transporterMail.sendMail(payload);
            },
          },
        },
      }
    : {}),
  filesAdapter: fsAdapter,
  auth: { google: { enabled: true }, sso: SSOAuth },
  push: { queueOptions: { disablePushWorker: true } },
};

export const app = express();
app.use(cors());
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(function (req, res, next) {
  req.headers['x-real-ip'] = getUserIP(req);
  const publicUrl = 'https://' + req?.get('host');
  req.headers['public_url'] = publicUrl;
  next();
});
function getUserIP(request) {
  let forwardedFor = request.headers['x-forwarded-for'];
  if (forwardedFor) {
    if (forwardedFor.indexOf(',') > -1) {
      return forwardedFor.split(',')[0];
    } else {
      return forwardedFor;
    }
  } else {
    return request.socket.remoteAddress;
  }
}

app.use(async function (req, res, next) {
  const isFilePath = req.path.includes('files') || false;
  if (isFilePath && req.method.toLowerCase() === 'get') {
    const serverUrl = new URL(process.env.SERVER_URL);
    const origin = serverUrl.pathname === '/api/app' ? serverUrl.origin + '/api' : serverUrl.origin;
    const fileUrl = origin + req.originalUrl;
    const params = fileUrl?.split('?')?.[1];
    if (params) {
      const fileRes = await validateSignedLocalUrl(fileUrl);
      if (fileRes === 'Unauthorized') {
        return res.status(400).json({ message: 'unauthorized' });
      }
    } else {
      return res.status(400).json({ message: 'unauthorized' });
    }
    next();
  } else {
    next();
  }
});

app.use('/public', express.static(path.join(__dirname, '/public')));

// ✅ 4. ROUTE ADDED WITH MOUNT PATH PREFIX (/app/password_reset_page)
// This ensures Nginx passes the request to the server
app.get(MOUNT_PATH + '/password_reset_page', (req, res) => {
    res.send(RESET_PASSWORD_HTML);
});

if (!process.env.TESTING) {
  // Use the global MOUNT_PATH variable here
  try {
    const server = new ParseServer(config);
    await server.start();
    // Mount Parse Server AFTER our custom route
    app.use(MOUNT_PATH, server.app);
  } catch (err) {
    console.log(err);
    process.exit();
  }
}

app.use('/', customRoute);

app.get('/', function (req, res) {
  res.status(200).send('opensign-server is running !!!');
});

if (!process.env.TESTING) {
  const port = process.env.PORT || 8080;
  const httpServer = http.createServer(app);
  httpServer.keepAliveTimeout = 100000; 
  httpServer.headersTimeout = 100000; 
  httpServer.listen(port, '0.0.0.0', function () {
    console.log('opensign-server running on port ' + port + '.');
    const isWindows = process.platform === 'win32';
    runDbMigrations();
    const migrate = isWindows
      ? `set APPLICATION_ID=${serverAppId}&& set SERVER_URL=${cloudServerUrl}&& set MASTER_KEY=${process.env.MASTER_KEY}&& npx parse-dbtool migrate`
      : `APPLICATION_ID=${serverAppId} SERVER_URL=${cloudServerUrl} MASTER_KEY=${process.env.MASTER_KEY} npx parse-dbtool migrate`;
    exec(migrate, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }

      if (stderr) {
        console.error(`Error: ${stderr}`);
        return;
      }
      console.log(`Command output: ${stdout}`);
    });
  });
}