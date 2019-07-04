import jwt from 'express-jwt';
import jwksRsa from 'jwks-rsa';

const authenticate = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://limber.au.auth0.com/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer
  audience: 'co.limber.api', //replace with your API's audience, available at Dashboard > APIs
  issuer: 'https://limber.au.auth0.com/',
  algorithms: ['RS256']
});

export default authenticate;
