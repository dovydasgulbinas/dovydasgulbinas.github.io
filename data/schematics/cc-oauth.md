```sequence
title: Client Credential Authorization Sequence
participant RO+CL as RO
participant AS as AS
participant RS as RS
RO->AS: I want to authorize here are my username/password
AS-->>RO: Here is your Access Token
RO->>RS: Here is my Access Token, give me my data
RS-->RO: Here you are.
```
