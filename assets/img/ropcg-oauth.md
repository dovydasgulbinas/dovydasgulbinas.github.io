```sequence 
title: Resource Owner Password Credentials Sequence
RO->CL: I need some data, here is my uname/password
CL->AS: Sending RO uname/password, I need an Access Token for him
AS-->CL: Here is your Access Token + *Refresh Token
CL->RS: Here is my Access Token give me RO data
RS-->CL: Here is data you asked
CL-->RO: Here is data you asked
note over AS: *Refresh Token is Optional
```
