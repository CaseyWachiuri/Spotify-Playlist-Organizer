// Handles requests to the api and gets the access token
const clientId = import.meta.env.VITE_CLIENT_ID;
const clientSecret = import.meta.env.VITE_CLIENT_SECRET;

// Change back to export default function
let funcName = function () {
  // Probably need useEffect for the API calls
  const value = "Authorization code pulled from another file";
  return value;
}

let secretName = function () {
  return `clientId: ${clientId} and clientSecret: ${clientSecret}`
}

/*
  const [authorization, setAuthorization] = useState("");
  const timeout = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000);
  const [timedOut, setTimedOut] = useState(false);

  function fetchAuthorizationToken(url, body) {

    useEffect(() => {
      fetch(url)
        .then(r => r.json())
        .then(d => {
        //setTimedOut(false);
        //setAuthorization(d.token)
        // Launches when the token expires
        //const timeout = setTimeout(() => { seTimedOut(true), d.expiry });
        });

        return () => {
          clearTimeout(timeout); // Clear the timeout function to start afresh
          setTimedOut(false); // Reset the timeout to get new authentication token
        }
    },[timedOut]); // Listens out for the timeout function
  }
*/

export { secretName,funcName};
