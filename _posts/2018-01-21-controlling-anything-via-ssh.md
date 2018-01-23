---
layout: post
comments: true
title:  "A thorough guide on controlling anything SSH with Homeassistants's Hass.io"
date:   2018-01-22 11:05:00 +0200
categories:
  - homeassistant
  - hyperion
  - ssh
  - hassio
---


# Intro

## What is SSH and how to use it for controlling other machines

SSH is a powerfull command line-tool allowing you to connect to a remote
machine and do basically what ever you want.  Most people don't know that
SSH is not just a black window in which hackers put text in. It is also
a way of sending a command to a remote machine without even typing anything.

Yes! you can shutdown or do anything you want with SSH (as long as you
have the user name and password of that server). A good example would be
shutting down remote server using this SSH command:

```
ssh donald@192.168.1.2 'sudo reboot'
```

This command will effectively restart a machine with IP `192.168.1.2` machine. Cool but how do you
do that using Homeassistant? By using the [command_line][1] component. This
is all fine and dandy but if you tried to connect to `donald` using this
command you probably noticed that you needed a password for that. And now you have
probaly realised that you will not be able to add a password to the
[command_line][1] component. Luckily for you can do SSH commands without
entering any passwords and yet still be safe at the same time. For this
feat you will need a **public/private** key pair that will be used to connect
to your remote machine without any passwords.


## So where is the catch ?

In Hass.io 😞. After I migrated from Hassbian to Hass.io. I ran into an issue. This issue
was that I could not do proper SSH commands to a computer running Hyperion.
These issues with SSH were in fact caused by the concept of Docker isolation.
This means that my Homeassistant instance was completely separated
from my host machine, thus not allowing me to run executables such as SSH
and others. Luckily official Homeassistant Docker image has SSH client installed
to the container so this mean that I CAN call SSH commands, but yet again
there is a catch. Can you guess what is that catch? As I mentioned before
we NEED to authenticate ourselves using a password OR public/private key
pair. So lets lets begin by making a public/private key pair.


## Generating the Keys

in reality we need to generate ssh keys both on the **FROM** machine and the
**TO** machine. Because this is the only way (in SSH) for BOTH machines can prove their
identity to each other. In this tutorial a machine that we issue commands FROM will be
called the **MASTER** & the machine and the machine executing commands **SLAVE** in our 
case **MASTER** is the machine running HASS.io instance. 


## What we will be doing?

In this tutorial we will make button in Homeassistant that when pressed will shutdown our 
SLAVE server via SSH. Basically it will apped a text file every time we press a button.
This example will be a good starting point for controlling remote devices.

# Prerequisites

- [Setup SSH connection to your HASSIO.io ResinOS host][3]


# Lets Begin

In my case IP addreses were:

  - MASTER IP: 192.168.0.105, SSH port: 22222
  - SLAVE IP: 192.168.0.111


## 1. Make SSH keys both on MASTER and the SLAVE

Generate SSH keys on HASS.io homeassistant docker container

### MASTER:

Connect to the MASTER. This will not work "out of the box" so first [follow
official tutorial][3] on how to connect to the HASS.io host running ResinOS

```
ssh root@192.168.0.105 -p 22222
```

Now attach to the Homeassistant docker container.
List available docker containers. 

```
docker ps -a
```

find one looking something like `homeassistant/homeassistant3`. Copy
its CONTAINER ID looking something like `b7dfc2f4d0c4`. Then attach to
your container
```
docker exec -it b7dfc2f4d0c4 /bin/bash
```

now finally generate your SSH key, but this time in a different directory  
```
mkdir /config/ssh
ssh-keygen -t rsa -f /config/ssh/id_rsa  
```

lets checkout our two brand new PUBLIC & PRIVATE keys
```
cd /config/ssh
ls -al
cat id_rsa.pub
```

if all went well you **public key** output should look something like this:

```
ssh-rsa AAAAB3NzaC1yc2EAAAADAQABAAABAQDyiprxeHAAieq2YtiXhFgSQIhZwvY6zsPAhsNU/N6yJ+JptVJGWBNY0tAD4eQiSsl88Qe4ryWVmtnw83jUjDMZp24uRtEAPnPW3f9N8mbDnyCEtbYhIDn1KseL3SuRWyFzk0fcMExZfsXrxgZ5nD/yQKvjcHm52LrhDfauxYADItonBZA+6mXh0E1LBrk6gP884IpLLbT9xetW2ZLP6htJDTPc2k9qN1cRVj3DD5Ppfyct1FmfZcAyi3Ua2dPxzngI5RUsjLBaqP+3lluc7fJVYK7fhnGZ36E/JNEamlzktBuLG1+1G3wxCshMFFBBuLTHb7qhtueIBY/4+wduJlFD root@hassio
```

 _⚠️ COPY this value it is your PUBLIC key we will use later!_

### SLAVE: For testing purposes lets create a user called `mister.slave` 

connect to your SLAVE machine
```
ssh myUser@192.168.0.111
```

add a user called `mister.slave`
```
sudo useradd mister.slave sudo
sudo passwd mister.slave
```

this step may differ because unix based distros use different commands for enabling sudo on your user in my case (Debian 9)
I just had to write **sudo** when creating a new `mister.slave` user.

This will require a password write something memorable. We will delete this user later anyways.
After creating a `mister.slave` switch to it
```
sudo su mister.slave
```

Now that you became `mister.slave` user lets **finally** make our SSH keypair
```
ssh-keygen -t rsa 
```

Okay we have our keys setup but what about passwordless connection from MASTER?
Its easy we have to add the the **public key** we copied before to our SLAVE machines'
`authorized_keys` file.
```
echo "PASTE YOUR MASTER KEY INSTEAD OF THIS TEXT" >> ~/.ssh/authorized_keys
```

On some systems `authorized_keys` file must have specific unix permissions set
and it will fail silently if you do not add these permissions so lets do that.
Line below will only make the file readable and writable to our user
```
chmod 600 ~/.ssh/authorized_keys
```

Okay our connection should be good to go. So what we just did is we created a SSH key pair on
both MASTER and the SLAVE machines & we installed MASTERS **public key** onto SLAVE. Now the
SLAVE trusts the MASTER machine and allows it to connect without a password.

You will probaly be interested in running some commands with **sudo** without a password. For this
we will need add these lines to `/etc/sudoers` file.

_⚠️ You should be very careful when editing `/etc/sudoers` file one bad character could lock you out
from the system forever!_
```
sudo visudo
```
Since visudo uses vim text editor it will require you to know some commands. Do not worry I will denote editor command like this: `[[ ]]`. Everything in the `[[ ]]` are editor
commands that you will have to type **manually** on your keyboard.

_go to the bottom of the file_

`[[ shift + g ]] or simply [[ G ]]`

_enter insert mode_

`[[ i ]]`

Paste this to the end of the file.
```
mister.slave    ALL=(ALL) NOPASSWD:    ALL
```

_exit text editor and save contents_

`[[ :wq ]]`


If all went well you should be able to run sudo commands without password, lets test it out!
```
sudo whoami
```

Expected output should be `root`. So if console printed `root` and did not ask you for password congratz!
You can now run all sudo commands without a having to enter your users password.

---

# 2. Testing SSH connection MASTER -> SLAVE

lets connect to our MASTER machine again
```
ssh root@192.168.0.105 -p 22222
```

then lets issue a REBOOT command to our SLAVE
```
ssh mister.slave@192.160.0.105 'sudo reboot'
```

if your SLAVE rebooted you can continue to step [3 Adding Homeassistant Components](#3-adding-homeassitant-components)

---

# 3. Adding Homeassistant Components

Add these lines to your `configuration.yaml` file and then restart HASSIO

```yaml
switch:
  - platform: command_line
    switches:
      test_ssh:
        command_on: "ssh -i /config/ssh/id_rsa mister.slave@192.168.0.103 'sudo reboot'"
  friendly_name: Magic Test Switch
```

Now go to your Homeassistant dashboard and press your newly created button.


<p align="center">
  <img src="/assets/img/magic-switch.png"/>
</p>

# Conclusions

If you followed this tutorial thoroughly you should be good to seed to start for remote control via SSH. If you are 
a begginer this guide is a hard and if you managed to reboot something from Homeassistant you should pat your self
on the back.
Personally I used this method for turning on effects on my Hyperion daemon. Also I am planning to make shutdown and reboot buttons
on other server I have at home. One thing to mention though is that you will not have any console output when you call
a remote command using `command_line` component, so monitoring things on a remote machine is not possible. You can checkout my 
HASSIO config file for further inspiration [here][4]

return 0

[1]: https://home-assistant.io/components/switch.command_line/
[2]: https://hyperion-project.org/
[3]: https://home-assistant.io/developers/hassio/debugging/ 
[4]: https://github.com/megamorphf/hass-conf
