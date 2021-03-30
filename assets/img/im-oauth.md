```sequence
title: Implicit Authorization Sequence
RO->CL: Click some button on CL asks for a redirect to example.com/authorize.
CL->UA: Do that redirect to /authorize RO asked.
UA->AS: I need you to authorize this RO.
AS-->UA: OK, but I will need his sessionid cookie for example.com domain
UA->AS: Here is RO sessionid cookie
AS-->RO: I've identified you being user xxx123 based on your sessionid cookie. Do you wish to authorize this CL?
RO->AS: yes
AS->UA: RO Agreed redirect him to my-site.com/?token=123
UA-->CL: I am redirecting RO to /my-site.com/?token=123
CL-->RO: I have grabbed the token I can read your data.

note over UA: User Agent (browser)
note over CL: let's assume client is JS app running at my-site.com
note over AS: Authorization Server running on example.com domain
```
