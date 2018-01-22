---
layout: post
comments: true\
title:  "Issuing and managing client side certificates using Python"
date:   2017-10-29 03:11:00 +0300
categories:
  - ssl
  - apache2
  - client-side
  - python
---

<p align="center">
  <img src="/assets/img/client-side-word-cloud.png"/>
</p>

# Glossary

Key
:  a piece of cryptographic information used for encrypting data by a chosen algorithm


Certificate Signing Request (CSR)
:  a process in which person or server asks for his
key being signed. Thus allowing others you verify the the **key** belongs to them.


Certificate Authority (CA)
:  a person or a server that is trusted and signs
your certificates requests.


Client Side Certificate (CSC)
:  a file given to a user to prove its identity
it usually comes in .p12 format and is instlled into web browsers. CSC are obtained
usually by sending a CSR to a CA.

# Intro

Our company has decided to make some of their webpages publicly accessible, but
we did not want for *anyone* to see the actual content of our website. In other
words we simply wanted to have a webpage that could only be accessed by our employees.

So we ended up using client side certificates (CSC). CSC has been around for
relatively long time but until today it yet seems to be not very popular.
Use of client side certificates is very useful because you can identify users
who want to access your website.  It also can be used as good alternative for user
name and password. Because CSC as mentioned previously helps to uniquely identify
user who is connecting to your server.

## How CSC are generated

### But wait there's two 🔏 🔏

As you know SSL in general is not as trivial. Maybe that is the reason why CSC are not used as often.  But I will try to explain using this table below. To make things less
convoluted this example contains **one** certificate authority. In reality you will
probably have two of them. Why? Because one is used to issue a valid HTTPS certificate
for your **webpage**. Even-though you can always use self signed certificates both for
**webpage** and for a **client** (that connect to the website) I do not recommend that because, clients will have to go through screen like this:

![unknown certificate authority][bad-cert]

 But you probably know that already.  And yes you can force your users
to install your homebrew CA into their root certificate store this will only
make things harder for you, because you will only confuse simple users even more.

### Convoluted Table Time 🤷‍

☝️ *PROTIP: follow the enumeration.*
This example assumes you will be your own CA (a.k.a Your connection is not secure )


|                                kitty Certificate Authority (CA) 🔏                                |                                                picture-server 🗄                                               |                                                                                                                            eager-client 💻                                                                                                                            |
|:-------------------------------------------------------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|                       1. Generates private key for him self **kitty-ca.key**                      |                                                                                                                |                                                                                                                                                                                                                                                                       |
|                      2. Signs his own private key, thus becomes _CA_                     |                                                                                                                |                                                                                                                                                                                                                                                                       |
|  3. Step 2. yields a new file called a certificate: **kitty-ca.crt** |                                                                                                                |                                                                                                                                                                                                                                                                       |
|                                                                                                   |                       4. Server,generates private key for him self **picure-server.key**                       |                                                                                                                                                                                                                                                                       |
|                                                                                                   | 5. Server wants to prove that his key belongs to him therefore he creates a `certificate signing request` file |                                                                                                                                                                                                                                                                       |
|                                                                                                   |    6. File generated in step 5. is made from servers private key and looks like this: **picture-server.csr**   |                                                                                                                                                                                                                                                                       |
|                                                                                                   |                                         7. Servers sends his file to CA                                        |                                                                                                                                                                                                                                                                       |
|    8. kitty-ca accepts sent file and generates a certificate for Server: **picture-server.crt**   |                                                                                                                |                                                                                                                                                                                                                                                                       |
|                                                                                                   |  9. picture-server takes the new **picture-server.crt** file and add its to its apache or nginx configuration  |                                                                                                                                                                                                                                                                       |
|                                                                                                   |           10. picture-server is ready to prove his identity to client and serve encrypted pictures 🔐          |                                                                                                                                                                                                                                                                       |
|                                                                                                   |                                                                                                                |                                                                            11. eager-client want,for his pictures not to be available publically. He wants client-side-authentication (CSA)                                                                           |
|                                                                                                   |                                                                                                                | 12. for _CSA_ eager-client has multiple options:   12.1 Generate _private_ key for himself **eager-client.key**   12.2 eager-client, needs to prove that his key belongs to him therefore he creates a `certificate signing request`file   12.3 He sends that file to kitty-ca |
| 13. kitty-ca accepts sent file and generates a certificate for eager-client: **eager-client.crt** |                                                                                                                |                                                                                                                                                                                                                                                                       |
|                                                                                                   |                                                                                                                |                                                                    14. eager-client converts **eager-client.crt** to the new **eager-client.p12** file and add it to its Firefox, Chrome browsers or adds it to his keychain                                                                    |
|                                                                                                   |                                                                                                                |                                                                                                              15. eager-client connects to picture-server                                                                                                              |
|                                                                                                   |                                                                                                                |                                                                                                  16. picture-server trusts kitti-ca issued files **eager-client.p12**                                                                                                 |
|                                                                                                   |                                                                                                                |                                                                                          17. picture-server serves eager-client a webpage full of pictures to an eager-client                                                                                         |



# Translating To OpenSSL commands

Since Python uses OpenSSL under the hood I will also show you how to do all the
necessary steps using OpenSSL command line.  The numbered items represent the
enumerated steps of table above.


#1.

```
openssl genrsa -out kitty-ca.key 4096
```

#2-3.

```
openssl req -config openssl.cnf \
-key kitty-ca.key -new -x509 -days 7300 \
-sha256 -extensions v3_ca -out kitty-ca.crt
```

#4.

```
openssl genrsa -out picture-server.key 2048
```

#5-6.

```
openssl req -config openssl.cnf -new -sha256 \
-key picture-server.key \
-out picture-server.csr
```

#8.

```
openssl ca -config openssl.cnf \
      -days 375 -notext -md sha256 \
      -in picture-server.csr \
      -out picture-server.crt
```

#12.1

```
openssl genrsa -out eager-client.key 2048
```


#12.2

```
openssl req -config openssl.cnf -new -sha256 \
-key eager-client.key \
-out easger-client.csr

```

#13. / The actual client side generation part

```
openssl ca -config openssl.conf -notext -md sha256 \
-in eager-client.csr \
-out eager-client.crt
```

#14. / Conversion from crt --> p12
```
openssl pkcs12 -export \
-inkey eager-client.key \
-in eager-client.crt \
-out eager-client.p12
```

## Lets recap

So if no noticed what we did here we just did same thing 3 times:

1. generate certificate for _kitty-ca_ (signs his own certificate)
2. generate certificate for _picture-server_ (kitty-ca signs picture-server's certificate)
3. generate certificate for _eager-client_ (kitty-ca signs eager-client's certificate)

In reality eager-client's  and picture-server's certificates can be signed by two different
Certificate Authorities (CAs) and they will still be able to trust each other.
Because client side and server side authentication are not dependent on each other
is any way (this example only made it that way). You could even have Only client
side certification without HTTPS enabled on your server and it would still work
(client would still be authenticated).


# Release the Python 🐍

## Running the Python

For running this code on your machine I highly recommend for you to install
[miniconda][miniconda] this will simply you installation tremendously because pip, OpenSSL,
virtualenv comes with this installation out of the box.

Once you installed you miniconda. **Restart your terminal app** And run the Python
script provided below in the gist.

This gist below contains everything you need to Issue your client a certificate
and revoke it:

<script src="https://gist.github.com/megamorphf/13af9e0d0321fcfc0c787aaed4a86888.js"></script>


# Conclusion

I hope you got a better grasp on HTTPS in general. One thing you should remember
is that In client-side setup everyone has to have their own private key and their
certificate, because certificates are objects that prove your identity.  Not your
private keys. Also private keys do not age meaning you can as for as many certificates
you like with the same private key.  The only thing that ages is your certificates.

In general all HTTPS initiative can be summarized in 3 simple steps:
1. Create your private key
2. Create a signing request for your key
3. Get a certificate and prove you identity with it


# Next Up

You probably noticed acronym  `crl` used a lot  in the Python snippet.
If you did and are curious about it. You will be able to find more info about it in
my next blogpost.

`return 0`

[bad-cert]: http://ohmag.net/wp-content/uploads/2016/06/33-cert-7.png
[miniconda]: https://conda.io/miniconda.html
