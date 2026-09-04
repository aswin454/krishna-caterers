import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TOKEN_PATH = path.join(__dirname, 'google-tokens.json');

// ======================================================
// TOKEN FUNCTIONS
// ======================================================

function loadTokens() {
  if (!fs.existsSync(TOKEN_PATH)) {
    return null;
  }

  try {
    const data = fs.readFileSync(TOKEN_PATH, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading Google tokens:', error);
    return null;
  }
}

function saveTokens(tokens) {
  try {
    const existing = loadTokens() || {};

    const merged = {
      ...existing,
      ...tokens,
      updatedAt: Date.now(),
    };

    fs.writeFileSync(
      TOKEN_PATH,
      JSON.stringify(merged, null, 2)
    );

    console.log('Google Drive tokens updated successfully.');

    return merged;
  } catch (error) {
    console.error('Error saving Google tokens:', error);
    throw error;
  }
}

// ======================================================
// OAUTH
// ======================================================

export function getAuthUrl() {
  const rootUrl =
    'https://accounts.google.com/o/oauth2/v2/auth';

  const options = {
    client_id: process.env.GOOGLE_CLIENT_ID,
    redirect_uri: process.env.GOOGLE_REDIRECT_URI,
    response_type: 'code',
    scope: 'https://www.googleapis.com/auth/drive.readonly',
    access_type: 'offline',
    prompt: 'consent',
  };

  const queryString = new URLSearchParams(options).toString();

  return `${rootUrl}?${queryString}`;
}

// ======================================================
// EXCHANGE AUTHORIZATION CODE FOR TOKENS
// ======================================================

export async function getTokensFromCode(code) {
  try {
    const response = await fetch(
      'https://oauth2.googleapis.com/token',
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          code,
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret: process.env.GOOGLE_CLIENT_SECRET,
          redirect_uri: process.env.GOOGLE_REDIRECT_URI,
          grant_type: 'authorization_code',
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Failed to exchange authorization code: ${errorText}`
      );
    }

    const tokens = await response.json();

    return saveTokens(tokens);
  } catch (error) {
    console.error(
      'Error exchanging authorization code:',
      error
    );

    throw error;
  }
}

// ======================================================
// GET VALID OAUTH ACCESS TOKEN
// ======================================================

async function getValidAccessToken() {
  const tokens = loadTokens();

  if (!tokens) {
    throw new Error(
      'No Google authorization tokens found. Please connect your Google account.'
    );
  }

  const expiresIn = Number(tokens.expires_in || 3600);

  const updatedAt = Number(
    tokens.updatedAt || Date.now()
  );

  const expiresAt =
    updatedAt + expiresIn * 1000;

  const isExpired =
    expiresAt - 60000 < Date.now();

  // Token is still valid
  if (!isExpired && tokens.access_token) {
    return tokens.access_token;
  }

  // No refresh token
  if (!tokens.refresh_token) {
    throw new Error(
      'No refresh token available. Please reconnect your Google account.'
    );
  }

  console.log(
    'Google access token expired. Refreshing...'
  );

  try {
    const response = await fetch(
      'https://oauth2.googleapis.com/token',
      {
        method: 'POST',
        headers: {
          'Content-Type':
            'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: process.env.GOOGLE_CLIENT_ID,
          client_secret:
            process.env.GOOGLE_CLIENT_SECRET,
          refresh_token: tokens.refresh_token,
          grant_type: 'refresh_token',
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(
        `Failed to refresh Google token: ${errorText}`
      );
    }

    const newTokens = await response.json();

    const updatedTokens = saveTokens(newTokens);

    return updatedTokens.access_token;
  } catch (error) {
    console.error(
      'Error refreshing Google token:',
      error
    );

    throw error;
  }
}

// ======================================================
// CHECK GOOGLE DRIVE CONNECTION
// ======================================================

export function isGoogleDriveConnected() {
  const hasApiKey =
    !!process.env.GOOGLE_API_KEY;

  const hasOAuth =
    !!(
      process.env.GOOGLE_CLIENT_ID &&
      process.env.GOOGLE_CLIENT_SECRET &&
      process.env.GOOGLE_REDIRECT_URI &&
      loadTokens()
    );

  return hasApiKey || hasOAuth;
}

// ======================================================
// GET GOOGLE DRIVE IMAGES
// ======================================================

export async function getDriveImages(baseUrl = '') {
  try {
    // --------------------------------------------------
    // Get folder ID
    // --------------------------------------------------

    const folderId =
      process.env.GOOGLE_DRIVE_FOLDER_ID;

    if (!folderId) {
      throw new Error(
        'GOOGLE_DRIVE_FOLDER_ID is missing from .env'
      );
    }

    // --------------------------------------------------
    // Build Drive query
    // --------------------------------------------------

    const query =
      `'${folderId}' in parents ` +
      `and mimeType contains 'image/' ` +
      `and trashed = false`;

    const fields =
      'files(id,name,mimeType,createdTime,webContentLink,thumbnailLink)';

    const apiKey =
      process.env.GOOGLE_API_KEY;

    let url;
    let headers = {};

    // ==================================================
    // API KEY MODE
    // ==================================================

    if (apiKey) {
      console.log(
        'Google Drive: Using API Key'
      );

      url =
        'https://www.googleapis.com/drive/v3/files' +
        `?q=${encodeURIComponent(query)}` +
        `&fields=${encodeURIComponent(fields)}` +
        '&orderBy=createdTime%20desc' +
        `&key=${encodeURIComponent(apiKey)}`;
    }

    // ==================================================
    // OAUTH MODE
    // ==================================================

    else {
      console.log(
        'Google Drive: Using OAuth'
      );

      const accessToken =
        await getValidAccessToken();

      url =
        'https://www.googleapis.com/drive/v3/files' +
        `?q=${encodeURIComponent(query)}` +
        `&fields=${encodeURIComponent(fields)}` +
        '&orderBy=createdTime%20desc';

      headers = {
        Authorization:
          `Bearer ${accessToken}`,
      };
    }

    // --------------------------------------------------
    // Request Google Drive API
    // --------------------------------------------------

    const response = await fetch(url, {
      method: 'GET',
      headers,
    });

    if (!response.ok) {
      const errorText =
        await response.text();

      throw new Error(
        `Google Drive API error: ${response.status} ${errorText}`
      );
    }

    const data =
      await response.json();

    console.log(
      `Google Drive: Found ${data.files?.length || 0
      } images`
    );

    // ==================================================
    // FORMAT IMAGES FOR WEBSITE GALLERY (Newest First)
    // ==================================================

    const files = data.files || [];
    files.sort((a, b) => new Date(b.createdTime) - new Date(a.createdTime));

    return files.map(
      (file) => {
        const name =
          file.name || '';

        // Remove extension
        let title =
          name.replace(
            /\.[^/.]+$/,
            ''
          );

        let category =
          'Gallery';

        // ----------------------------------------------
        // Support:
        // Category - Title.jpg
        // ----------------------------------------------

        if (name.includes(' - ')) {
          const parts =
            name.split(' - ');

          category =
            parts[0].trim();

          title =
            parts
              .slice(1)
              .join(' - ')
              .replace(
                /\.[^/.]+$/,
                ''
              )
              .trim();
        }

        return {
          id: file.id,

          category,

          title,

          image:
            `${baseUrl}/api/gallery/image/${file.id}?w=600`,

          fullImage:
            `${baseUrl}/api/gallery/image/${file.id}?w=1600`,

          driveUrl:
            `https://drive.google.com/file/d/${file.id}/view`,

          createdTime:
            file.createdTime,

          mimeType:
            file.mimeType,
        };
      }
    );
  } catch (error) {
    console.error(
      'Error fetching Google Drive images:',
      error
    );

    throw error;
  }
}

// ======================================================
// GET RAW IMAGE BUFFER (PROXY)
// ======================================================

export async function getDriveImageBuffer(fileId, width = '600') {
  const apiKey = process.env.GOOGLE_API_KEY;

  // 1. Try public CDN preview link first
  try {
    const cdnUrl = `https://lh3.googleusercontent.com/d/${fileId}=w${width}`;
    const response = await fetch(cdnUrl);
    if (response.ok) {
      const arrayBuffer = await response.arrayBuffer();
      return {
        buffer: Buffer.from(arrayBuffer),
        contentType: response.headers.get('content-type') || 'image/jpeg'
      };
    }
  } catch (error) {
    console.warn(`CDN fetch failed for file ${fileId}, falling back to API:`, error.message);
  }

  // 2. Fallback to authenticated Google Drive API media download
  let url;
  let headers = {};

  if (apiKey) {
    url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media&key=${apiKey}`;
  } else {
    const accessToken = await getValidAccessToken();
    url = `https://www.googleapis.com/drive/v3/files/${fileId}?alt=media`;
    headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }

  const response = await fetch(url, { headers });
  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Google Drive API alt=media failed: ${response.status} ${errText}`);
  }

  const arrayBuffer = await response.arrayBuffer();
  return {
    buffer: Buffer.from(arrayBuffer),
    contentType: response.headers.get('content-type') || 'image/jpeg'
  };
}