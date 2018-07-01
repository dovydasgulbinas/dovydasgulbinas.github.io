---
layout: post
comments: true
title:  "Introduction on REST authentication"
date:   2018-06-23 15:44:00 +0300
categories:
  - rest
  - authentication
  - OAuth
---


![this is snek](/assets/img/closed-and-key.png)


Glossary
========

HTTP Header
:  All data found in the HTTP request that starts after very first "\n"
and end at the boundries of two "\n\n"  characters.  HTTP headers usually look
similar to this example: `User-Agent: XBMC Addon Radio`

REST
: REpresentational State Transfer.  

CSRF
: Cross site request forgery.  A type of an attack in which user's existing
session cookie can be used by unauthorized attacker.

Redirect URI (RURI)
: An endpoint in client application that accepts Access Tokens OR Authorization Codes.
Imporant part in RURIs are their URL parameters.  eg. https://megamorphf.github.io/?**acces_token=12345**.
In order to receive and `access_token` your Client must have an endpoint enabled and listen
on that URL in order to receive that code.  If you are using mobile apps and need
to fetch URL parameters this can be done not by listening on a specific endpoint
but rather tracking the URLs app user is navigating in the build it browser.

User-Agent
: A Fancy term for a web browser or a client that can do HTTP requests.

API Key
:  Synonymous with **Token Based Authentication** is a string that Authorizes
a client (API Consumer) to access endpoints that require authorization.

Consumer, API Consumer
:  A person who is using or implementing the API in some web or mobile app.

Access Token (AT), Authorization Token (AT)
:  Are used interchangeably in this blog post.  They are strings that allow a client
to do requests on behalf of a user.

Resource Owner (RO), User
:  someone who’s data is kept on a server

Resource Server (RS)
:  server that keeps Resource Owner’s data.

Client (CL)
:  a piece of software that communicates with a Resource Server on behalf of the Resource Owner.

Authorization Server (AS)
:  server that manages OAuth 2.0 tokens and verifies that _Resource Owner's_ credentials are correct.




Intro
=====

Recently I had to design REST API endpoints.  My company currently has and old
and hairy monolithic backend.  Like most living things in order to survive they
have to adapt, so did our enterprise backend, it had to talk REST.  

REST in particular is a great approach in design, because it forces you to think
about other people using your REST API.  And like most things the simpler the
thing the less questions you will get.  The messy things began when I started
thinking about authentication and how to implement it.  When I got my feet wet
I come up with various questions like: What is exactly is **Session Based**
authentication.  Is **Token Based** authentication better than **Session
Based** authentication?  What do you mean that **Session Based** authentication
is stateful and why should i f-ing care?  Oh wait, I can also use OAuth for that?
I hope this blog post will clarify thing or two for someone who was as
lost as I was.

Zen of REST
===========

1. Let's talk HTTP
2. Let's use {POST, GET, PUT, DELETE ...}  
3. Let's be **stateless**
4. Let's user URI to organize data we share

The **stateless** is what really makes REST different from older web
architectures. Ideal stateless server basically will never remember who it gave
a resource to & it will not bother with things such as sessions, compared the
traditional webpages where session based authentication is used.  No cookies and no
sessions, that is the way REST does things. If you are an attentive
reader you probably already understood that _Session Based_ authentication
breaks core REST principles.

So if you need to add REST functionality to your old enterprise back-end.
Or you just want to follow the Zen of REST by the letter
prepare to say goodbye to that `sessionid` cookie.


Token Based Authentication (TBA)
===============================

Token based a authentication is one of the most primitive types of authentication (this does not mean it's bad).
It works by using **Tokens** or more commonly called **API Keys**. These tokens are simply
a replacement for username/password pair.  The true benefit of using tokens lies in the fact that if someone
steals your token you can simply reissue a new one, unlike with password, because you would
have to change that goddamn thing. Password is the fishing rod, while token is a fish.
In the context of REST for Token Based authentication you will need to implement
an endpoint that will return a new Token, this endpoint will consume your
username/password and spit out a fresh auth token.

Example of such endpoint would look like:

request
```
POST /authenticate/token HTTP/1.1
Host: example.com
Content-Type: application/json

{
  "username": "pepe",
  "password": "animal"
}
```
response
```
HTTP/1.1 200 OK
Content-Type: application/json;charset=UTF-8
Cache-Control: no-store
Pragma: no-cache

{
  "Token": "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b"  
}
```

You probably realized, that the endpoint `/authenticate/token` must be
available for anyone.  Because "You need a Token to get a Token" is not exactly
going to work.  You probably also have a question where do I put this token exactly?
The answer: to a **HTTP header**.  Access token e.g. in Django REST framework
would look like `Authorization: Token 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`.
One API I used while back would store it like so `apikey: 9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b`.
There is really no strict consensus therefore you make sure you double check
how it is implemented with frameworks using.

Cool but why I just can't put these apikeys/tokens in the body of each request?
Well because each method would require different implementation.  GET request would
require an URL parameter e.g. `?apikey='9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b'`, while
POST request would require an attribute in the request body: `{ "token": "9944b09199c62bcf9418ad846dd0e4bbdfc6ee4b" }`.
Finally it would make REST application **stateful** because it would have to store These
tokens/apikeys in the database, because POST method creates new entries.

<p class="important">
it is not mandatory for you to implement an endpoint for the client
to issue a Token you can simply give it to him manually, assuming only
few people will use your application.
</p>

---

TBA Pros & Cons?
------------

Token based authentication needs username and password.  In some
cases you do not really care. But there are cases when your user data is senstitive
and you don't want third parties handling your users credentials.
e.g. mobile payment API, you want for third parties to create cool looking mobile
app for your clients, but you know that they may be sneaky and steal some private
information from your user.

Good thing about token based auth is that it can be made **stateless**.
Further more it is simpler
than other methods.  You just need to add some value to a HTTP request header.
Also you can do API key validation even on the web server e.g 'NGINX' itself.
It can be completely decoupled from the API back-end.

In summary, use token based auth when you need to fetch and post some
data that is not sensitive.  Basically API keys are good for monitoring and
"pay walling" people who use your API.


Session Based Authentication (SBA)
=================================

Session is very different compared to _Token Based Authentication_.
The ways it differs from Token authentication are:

* Session tokens are issued & managed by the back-end server

* Session tokens have very short validity time compared to TBA

* Session tokens are stored as cookie.

This is how a cookie looks `Cookie: sessionid=asbkta702ybw90rd87vphn14kre76s91`
some may argue that, technically `Cookie:` is still a part of HTTP header.
Yes but cookies have extra properties compared to plain HTTP headers.
For example your backed API server can set a cookie value on your clients machine
and your browser has a power to remember them.
SBA is great when using web page based applications, but it creates problems when your API
is being used in mobile apps.  This will force the API consumer to use some sort mechanism to
remember those SBA cookies. And also the consumer will have to be sure that these cookies
are set properly.  Another problem you will face when using SBA is that your API will
be vulnerable to CSRF attacks.  The only way to solve this issue,  is to add yet another cookie
to your client's cookie store in Django this cookie is called **csrftoken**.
Additionally CSRF cookies have to be unique and managed by your API backed as well.

---

To summarize SBA is very messy and it isn't designed to be used with REST applications in general.

OAuth 2.0
=========

The best and recommended way of authenticating if your API will be used by everyday
users, third parties and your API must handle their username/password then OAuth is a must have.

Like TBA OAuth also uses tokens to manage access to resources.  Another
benefit of OAuth 2.0 is ability to give tokens permissions.  For example this
token grants this application ability to read users messages, but not create them.

OAuth 2.0 describes four ways of **Authorization Grants (AG)** defined by [RFC6749][8.1].
RFC6749 also introduces 4 important terms that you must know. **Resource Owner (RO)** - someone who's data is kept
on a server  **Resource Server (RS)** -- server that keeps _Resource Owner's_ data.  **Client (CL)** - a piece of software
that communicates with a _Resource Server_ on behalf of the _Resource Owner_. **Authorization Server (AS)** - server that
manages OAuth 2.0 tokens and verifies that _Resource Owner's_ credentials are correct.

Authorization Code (AC)
-----------------------

This method is a commonly used method in OAuth.  If you ever used any of Google'
apps you we're definitely prompted with enter your Google username and password.
The form that you enter your password in was issued by Google's AS.
In most cases this form will be a webpage presented to you as an iFrame.
This way of authentication is great because, the CL never gets RO credentials.
Instead of credentials CL will receive a  "Authorization code". This authorization
code is not an access token.  Instead it a code that can generate multiple
access tokens during the use of the applications. AC in it self is only
used to get access tokens this means you can't use AC
to access RO's data directly.


One thing to note though it may
be annoying to enter password to every single Google app you have downloaded
knowing that you have all ready logged in on some Google apps.  This is not
a big deal if a user will use on of your CO will use multiple Apps to Access
it's resources you may need to reconsider other _authorization grant_ methods./

1. CL does a request to AS and sends his `client_id` + `redirect_uri`

2. AS renders RO form, this form contains a login or authorization message.
RO enters its credentials or authorizes the CL.

3. AS returns an AC using a browser based redirect to the CL. The AC is returned as an URL parameter a **Redirect URI (RURI)**. But since we can't do much with AC we have to introduce one extra step.

4. CL uses _Authorization Code_ to fetch **Access Token (AT)**
& **Refresh Token (RT)**.  _This step is done in the background_.

5. CL uses AT he just got to fetch data from RS

![ac-oauth](/assets/diagrams/ac-oauth.png)


It is important to note there may not be any redirect to `example.com/authorize`, because
the AS has already defined a specific URL that is used for AC authorization.
Also the RFC standard does define nor stop you from having an endpoint that redirects
to `/authorize`.  Just remember that your AC-OAuth must have a authorization endpoint


[Implicit (IM)][8]
------------------

Implicit authorization is a type of authorization you would want to use in a web app
that has no back-end e.g JavaScript application. Since the web browsers stores **cookies**
for a specific website you can't really save AC's and RT's because every new app your
user used would require a new pair AC's and RT's.  You may ask so what? I do not
mind that a user has to authorize with RS every single time it is not my problem
that he decided to use apps other than my own.  It is stupid to think this way
for a one reason: _It is better to minimize number of times RO has to
enter a password, because the probability of password being compromised increases._

RFC6749 documentation introduces a term **user-agent** a.k.a a web browser.
Also RFC6749 is being very _implicit_ (pun intended) when it comes to explaining.
What is the role of browser is.  In reality browser has to support three features:
cookies, redirects & JavaScript.  If the conditions are not met your users are
probably using "lynx" or "w3m".

The figure below assumes that the user has already logged in to example.com domain.
This is why the figure in [RFC6749][8] has more steps than I present.

![im-oauth](/assets/diagrams/im-oauth.png)

This is big sequence diagram, the most important part in it are the two redirects
happening: **1. CL->UA->AS** and **2. CL<-UA<-AS**.
In a real world application when doing **1.CL->UA->AS** you would form an URL
like this `/authorize?client_id=777&redirect_uri=my-site.com`.

`client_id`
:  parameter
helps AS to identify which CL is doing a request, since AS is the one issuing this client_id.
In theory client_id could be optional, but must of OAuth based frameworks
I have used make it mandatory.

`redirect_uri`
: parameter instructs the AS to where the user should be redirected. When redirected
the CL (javascript) will get few more goodies because AS will attach a juicy Token.

---

### IM summary

* Implicit authorization needs `sessionid` cookie set for the domain in which AS is running.
if cookie is not present then user will be prompted to login. And then the cookie will be set
* Implicit authorization would not work without a client client-agent (browser).
because you need a way to handle the HTTP redirects.
* Auth Tokens are passed as URL parameters
* There is no way how to renew an Auth Token. This means that Tokens will have
to be renewed by the user when they expire.
* Tokens must to be stored in browser _LocalStorage_ or _Cookies_ for further use.


Resource Owner Password Credentials (ROPC)
------------------------------------------

This type of authorization should be used rarely.  And avoided most of the time
since RO credentials are given directly to the CL. CL will use username/password
of the RO to get an Access Token.  This feature should never be enabled
for third party developers, because they may steal your RO username/password.
Only case it is okay to use when you are building your own operating system, e.g.
Android phones in their __Settings__ page have an __Accounts__ section in which user
enters his Google username/password.  Since these credentials are stored in the
system itself and no other apps have access to these credentials it is okay.
In theory ROPC should only require username/password once, because during
the authorization with AS, CL is allowed to receive a **Authorization Token + Refresh Token**
Refresh Token will allow the CL to renew Authorization Token when the initial one expires.
So the best practice would be to embed a mechanism that would prevent CL from
storing username/password on the device all together.

![ropcg-oauth](/assets/diagrams/ropcg-oauth.png)


Client Credentials (CC)
-----------------------

The final and most basic way of authenticating. CC architecture has only two components (in authorization process)
client (CL) and authorization server (AS).  In this case RO is the CL.  For example if you
want to get Authorization Token for yourself you could do that using [curl][10].

![cc-oauth](/assets/diagrams/cc-oauth.png)

### usage
Use Client Credentials when you are developing or testing your OAuth apps. Or
if you are a [TUI][11] person feel free to authorize all apps this way 😉


General Summary
---------------

---

OAuth 2.0:

As I show in this blogpost there are more than ways how to _"skin the cat called auth"_.
But if your REST API will be used by everyday people should go with OAuth 2.0.
OAuth 2.0 as a standard covers multiple cases you will encounter plus nowadays
it became an industry standard.

---

Token Based Authentication (TBA):

If you want to expose your API as SaS then in most cases Token Based Authentication (TBA)
covered in the first chapter should be sufficient.  Because there is a high likely hood
that consumer of your API will be another machine, not a person.  And as we know
machines tend not to forget their passwords or Tokens.

---

Session Based Authentication (SBA)

If your only plan in life is to make a single web app in life, you can go with
SBA. SBA is actually an old way of doing things, because all non-REST web applications
rely on sessions.  Further more session based authentication can become a pain
in the ass to implement on a mobile app, because you would have to manage session
cookies manually.  It was designed for use in webpages and should remain to be used with them.

This post does not cover all intricacies of authorization but I hope it gave you a good
head start. I highly recommend to skim through developer docs written by [Spotify][7]
and the [RFC6749][8.1] I mentioned before.

`return 0`

[1]: https://security.stackexchange.com/questions/81756/session-authentication-vs-token-authentication#92123
[2]: https://stackoverflow.com/questions/1592534/what-is-token-based-authentication
[3]: https://security.stackexchange.com/questions/81756/session-authentication-vs-token-authentication#92123
[4]: https://security.stackexchange.com/questions/40189/is-a-cookie-safer-than-a-simple-http-header
[5]: https://chrisbartos.com/articles/how-do-i-implement-session-authentication-in-django-rest-framework/
[6]: https://tools.ietf.org/html/rfc6749
[7]: https://developer.spotify.com/documentation/general/guides/authorization-guide/
[8]: https://tools.ietf.org/html/rfc6749#section-4.2
[8.1]: https://tools.ietf.org/html/rfc6749
[9]: https://codeplanet.io/principles-good-restful-api-design/
[10]: https://en.wikipedia.org/wiki/CURL
[11]: https://en.wikipedia.org/wiki/Text-based_user_interface
