import { auth } from "../service/firebase.js";

const extractAuthToken = (req) => {
  if (req.headers.authorization) {
    const tokenParts = req.headers.authorization.split(" ");
    if (tokenParts[0] === "Bearer" && tokenParts[1]) {
      return tokenParts[1];
    }
  }

  return undefined;
};

const validateAuthToken = async (token) => {
  return auth.verifyIdToken(token).then(
    (result) => {
      /**
         * result example
         * {
            iss: 'https://securetoken.google.com/bookery-4cb40',
            aud: 'bookery-4cb40',
            auth_time: 1675622891,
            user_id: 'xx',
            sub: 'xx',
            iat: 1675622891,
            exp: 1675626491,
            email: 'a@a.com',
            email_verified: false,
            firebase: { identities: { email: [Array] }, sign_in_provider: 'password' },
            uid: 'ELEpu21ovZZLQ6MPFQpkaunzMdH2'
            }
         */

      return result;
    },
    (error) => {
      console.error("Firebase auth failed");
      console.log(error);
      return undefined;
    }
  );
};

export default (req, res, next) => {
  const token = extractAuthToken(req);
  if (!token) {
    res.status(401).json({
      error: "Invalid authorization header",
    });
    return;
  }
  validateAuthToken(token).then((userData) => {
    if (!userData) {
      res.status(401).json({
        error: "Not Authorized",
      });
      return;
    }
    // bind to the request the user data
    req.user = userData;
    return next();
  });
};
