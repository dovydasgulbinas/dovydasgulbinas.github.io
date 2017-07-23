---
layout: post
title:  "Adding more features to Hyperion in Homeassistant 🏠"
date:   2017-07-23 18:33:00 +0300
categories: homeassistant hyperion
---

After playing around with Hyperion I really liked it. I liked it so much that I decided to implement it in my smart-home setup.  I currently use Hyperion for Kodi, but I wanted a way to control it with my Homeassistant. Because I could automate a lot of workflows eg. automatically turn on the backlight in evenings. My Setup uses two Raspberry Pi devices: `First for Kodi + Hyperion` and `second just for Homeassistant`. Okay lets begin.



§1. Open up your terminal 💻 and ssh to a machine has Hyperion service enabled.

> ssh osmc@192.168.1.99`

§2. Test if Hyperion commands are working:**

> hyperion-remote -e "Knight rider"

If you gets your lights running are ok to go!

*important: in my case Homeassistant and Hyperion are on a different machines therefore I needed to setup a password-less ssh connection from my Homeassistant RPi -> Kodi RPi*

§3. Now login to your second machine running `Homeassistant` 🏠 service.

> ssh pi@192.168.1.100

§4. Test the Hyperion again but now in a remote configuration.




```ruby
def print_hi(name)
  puts "Hi, #{name}"
end
print_hi('Tom')
#=> prints 'Hi, Tom' to STDOUT.

```
