---
title: JSON Web Tokens
slug: JSON-WEB-TOKEN
description: Repost from https://medium.com/@ambersariya/jwt-json-web-token-cd90ef7a7a66
modified: 2022-05-18T14:41:38.500Z
date: 2017-02-28T11:45:44.128Z
---

## What is it?

> _JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties. The claims in a JWT are encoded as a JSON object that is used as the payload of a JSON Web Signature (JWS) structure or as the plaintext of a JSON Web Encryption (JWE) structure, enabling the claims to be digitally signed or integrity protected with a Message Authentication Code (MAC) and/or encrypted._

JSON Web Tokens are an open, industry-standard [**RFC 7519**](https://tools.ietf.org/html/rfc7519) method for representing claims securely between two parties. See here: [https://jwt.io](https://jwt.io "https://jwt.io")

In this context, "claim" can be something like a "command", a one-time authorization, or basically any other scenario that you can word as:

> _Hello Server B, Server A told me that I could "**claim goes here**", and here’s the (cryptographic) proof._

Before we dive into this further, I’d like to define some terms we use in the realm of authentication.

> **_Authentication_** _— Proving who you are_
>
> **_Authorization_** _— Being granted access to resources_
>
> **_Token_** _— medium used to persist authentication and get authorization_

## So, what does It Look Like?

Well, it looks like another confusing looking string

    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ

Upon closer inspections, you’ll see that this JWT consist of three parts separated by dots (`.`), which are:

- Header
- Payload
- Signature

    Header.Payload.Signature

So, let’s break it down a little:

```js
// header
    eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
// payload
    .eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9
// signature
    .TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ
```

### Header


```json title="HS256 indicates that this token is signed using HMAC-SHA256."
{
    "alg": "HS256",
    "typ": "JWT"
}
```

### Claims/Payload

```json title="The payload contains the claims that we wish to make"
{ "sub": "1234567890", "name": "John Doe", "admin": true}
```

### Signature

We use the following formula to calcalate signature

```js
HMACSHA256(encodeBase64(header) + "." + encodeBase64(payload), secret)
```

This then gives us something like:

```
thiseyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJsb2dnZWRJbkFzIjoiYWRtaW4iLCJpYXQiOjE0MjI3Nzk2Mzh9.gzSraSYS8EXBxLN_oWnFSRgCzcmJmMjLiuyu5CSpyHI
```

Let’s expand on the claims section of JWT. The following claims are part of the RFC document:

**iss**: who is the issuer of this token auth.example.com
**sub**: what is the subject of this token e.g. auth
**aud**: who can use this token e.g ['client1.example.com','client2.example.com']
**exp**: Defines the expiration time as unix timestamp e.g. 1488192525
**nbf**: define how long after the issued token was generated we can use it e.g. 300 seconds (5 minutes)
**iat**: issued at is a unix timestamp e.g. 1488192525
**jti**: JWT ID unique id. This can be used to prevent a token from being replayed e.g. "xa443D"

The key names are case sensitive and have been kept small to keep the JSON payload compact.

## How does the Authentication Flow work?

In authentication, when the user successfully logs in using their credentials, a JSON Web Token will be returned and must be saved locally (typically in local storage, but cookies can be also used), instead of the traditional approach of creating a session in the server and returning a cookie.

```json title="POST /login"
{
    email: "username@example-domain.com"
    password: "5£cUr3PA$$W0rd!"
}
```

```json title="Response 201 Created"
{
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ"
}
```

Any subsequent calls to the API would typically send the Authorization header using the Bearer schema.

```js
Authorization: "Bearer myToken"
```

Therefore the content of the header should look like the following.

```js title="GET /"
# Headers
Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiYWRtaW4iOnRydWV9.TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ"
```

This is a stateless authentication mechanism as the user state is never saved in the server memory. The server’s protected routes will check for a valid JWT in the Authorization header, and if there is, the user will be allowed.

- signature valid?
- client allowed? aud- expected issuer? iss- can this token be used? nbf

As JWTs are self-contained, all the necessary information is there, reducing the need of going back and forward to the database. This allows us to fully rely on data APIs that are stateless and even make requests to downstream services. It doesn’t matter which domains are serving the APIs, as Cross-Origin Resource Sharing (CORS) won’t be an issue as it doesn’t use cookies.

## Making a case for JWT

- **Portability**: they work across many different platforms, having implementations in various programming languages.
- **Compact**: Because of its size, it can be sent through an URL, POST parameter, or inside an HTTP header. Additionally, due to its size its transmission is fast.
- **Self-contained:** The payload contains all the required information about the user, to avoid querying the database more than once.
- **Control:** Allows fine grained control over types of permissions. You can specify detailed access control information within _the token itself_ as part of its payload. For instance, in the same way that you can create AWS security policies with very specific permissions, you can limit the token to only give read/write access to a single resource. In contrast, API Keys tend to have a coarse all-or-nothing access.

## Problems with JWT

- Cannot be used in place of Sessions & Cookies. If we want to use them in such a manner, then stick with Sessions and Cookies.
- Data goes stale. For instance, an admin with a JWT token has had their access revoked but the token will keep on working because it was generated and verified correctly with the secret key.
- There’s a critical vulnerability when using Asymmetric keys. The attackers know which algorithm was used to generate the token. This is open to abuse from the attackers. The server should already know which algorithm was used to generate/verify the integrity of this token.

## Conclusion

JSON Web Tokens offer many advantages but not without having some drawbacks. If you work on an extremely large-scale application, sessions could be the appropriate choice. It is completely reasonable to combine sessions and JWT — they each have their own purpose, and sometimes you need both. Just don’t use JWT for _persistent_ data.

---

## Further Reading

Thanks to the following:

- [https://tools.ietf.org/html/rfc7519](https://tools.ietf.org/html/rfc7519 "https://tools.ietf.org/html/rfc7519")
- [http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html#RegisteredClaimName](http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html#RegisteredClaimName "http://self-issued.info/docs/draft-ietf-oauth-json-web-token.html#RegisteredClaimName")
- [https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/](https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/ "https://auth0.com/blog/critical-vulnerabilities-in-json-web-token-libraries/")
- [https://auth0.com/learn/json-web-tokens/](https://auth0.com/learn/json-web-tokens/ "https://auth0.com/learn/json-web-tokens/")
- [https://www.slideshare.net/lcobucci/jwt-to-authentication-and-beyond](https://www.slideshare.net/lcobucci/jwt-to-authentication-and-beyond "https://www.slideshare.net/lcobucci/jwt-to-authentication-and-beyond")
- [https://www.slideshare.net/a_z_e_t/javascript-object-signing-encryption](https://www.slideshare.net/a_z_e_t/javascript-object-signing-encryption "https://www.slideshare.net/a_z_e_t/javascript-object-signing-encryption")
- [http://christhorntonsf.com/secure-your-apis-with-jwt/](http://christhorntonsf.com/secure-your-apis-with-jwt/ "http://christhorntonsf.com/secure-your-apis-with-jwt/")
- [http://cryto.net/\~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/](http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/ "http://cryto.net/~joepie91/blog/2016/06/13/stop-using-jwt-for-sessions/")
