```sequence
title: Access Code Auth Sequence

RO->CL: I Want to use CL app
CL->UA: Please redirect RO to example.com/authorize*
UA->AS: I was asked to redirect a user to you.
AS->RO: Please enter your username/password to this form
RO->AS: Here you are.
AS-->UA: User has authorized the CL redirect send him ?code=xyz321
UA-->CL: Here giving you the ?code=xyz321
CL->AS: Here is the code xyz321, give me Authorization Token + Refresh Token
AS-->CL: Here you are AT + RT
CL->RS: Give me RO data here is my Authorization Token
RS-->CL: Here you are
CL->RO: Here you are
note over CL, UA: *URI actually looks like /authorize?client_id=123&redirect_uri=localhost
note over UA: user-agent (browser)
```
