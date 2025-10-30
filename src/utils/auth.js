const client_id = import.meta.env.VITE_CLIENT_ID;
const client_secret = import.meta.env.VITE_CLIENT_SECRET;
const redirecturi = "http://192.168.0.10:5173/callback";

// Specify the scopes that the app has in regards to the Spotify API
const scope="user-read-private user-read-email playlist-read-private playlist-read-collaborative playlist-modify-public playlist-modify-private";

const generateRandomString = (length) => {
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const values = crypto.getRandomValues(new Uint8Array(length));
  return values.reduce((acc, x) => acc + possible[x % possible.length], "");
}


const base64encode = (input) => {
  return btoa(String.fromCharCode(...new Uint8Array(input)))
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

const sha256 = async (plain) => {
  const encoder = new TextEncoder()
  const data = encoder.encode(plain)
  return window.crypto.subtle.digest('SHA-256', data)
}


export const redirectToAuthCodeFlow = async () => {
  const codeVerifier  = generateRandomString(64);
  const codeChallenge = async () => {
    const hashed = await sha256(codeVerifier);
    const codeChallenge = base64encode(hashed);
    return codeChallenge;
  };

  // Store the verifier for later authentication
  localStorage.setItem('codeVerifier', codeVerifier);

  const params = new URLSearchParams({
    response_type: 'code',
    client_id: client_id,
    scope,
    code_challenge_method: 'S256',
    code_challenge: codeChallenge,
    redirect_uri: redirecturi,
  });

  window.location.href = `https://accounts.spotify.com/authorize?${params.toString()}`;
};

export const getAccessToken = async (code) => {
  // Stored in the previous step
  const codeVerifier = localStorage.getItem('codeVerifier');

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
      redirect_uri: redirecturi,
      code_verifier: codeVerifier,
    }),
  }

  const response = await fetch(url, payload);
  const data = await response.json();

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
