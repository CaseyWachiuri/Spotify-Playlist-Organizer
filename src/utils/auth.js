const client_id = import.meta.env.VITE_CLIENT_ID;
const client_secret = import.meta.env.VITE_CLIENT_SECRET;
const redirecturl = "http://127.0.0.1:5173/callback"
const authUrl = new URL("https://accounts.spotify.com/authorize");

// Specify the scopes that the app has in regards to the Spotify API
const scope="user-read-private user-read-email";

const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = window.crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}
const sha256 = async (plain) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}

const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

export const redirectToAuthCodeFlow = async () => {
  try {
    const codeVerifier  = generateRandomString(64);
    const hashed =  await sha256(codeVerifier);
    const codeChallenge = await base64encode(hashed);

    // Store the verifier for later authentication
    localStorage.setItem('codeVerifier', codeVerifier);
    const actualChallenge = codeChallenge;

    const params = new URLSearchParams({
      response_type: 'code',
      client_id: client_id,
      scope,
      code_challenge_method: 'S256',
      code_challenge: actualChallenge,
      redirect_uri: redirecturl,
    });

    //console.log(codeVerifier);
    //console.log(codeChallenge());
    authUrl.search = new URLSearchParams(params).toString();
    //console.log(authUrl.search);
    window.location.href = authUrl.toString();
  } catch ( error ) {
    console.error("This is the error:", error);
  }

  //window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const getAccessToken = async (code) => {
  // Stored in the previous step
  const codeVerifier = localStorage.getItem('codeVerifier');

  if (!codeVerifier) {
    console.error("PKCE Error,: code_verifier is missing!!");
  }
  // Remove codeVerifier for security purposes
  //localStorage.removeItem('codeVerifier');

  const url = "https://accounts.spotify.com/api/token";
  const payload = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: client_id,
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirecturl,
      code_verifier: codeVerifier,
    }),
  }

  const response = await fetch(url, payload);
  const data = await response.json();
  console.log(data);

  if(!response.ok) {
    throw new Error(`Token request error: ${response.status} - ${response.statusText}`);
  }


  // Holds the access token, refresh token and expiry
  return data;
}

export const fetchApi = async (url, method = 'GET', body = null) => {
  const token = localStorage.getItem('access_token');
  if (!token) throw new Error("No accesss token");

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Content-type': 'application/json',
  };

  const config = {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  };

  const response = await fetch(url, config);

  // Remember to add code to handle failed response. I'm too tired to think about it right now
  return response.status === 204 ? null : response.json();
};

export const logout = () => {
  // Backup in case the clear function shits the bed
  //localStorage.removeItem('access_token');
  //localStorage.removeItem('refresh_token');
  //localStorage.removeItem('expires_at');

  localStorage.clear();
}
