🏡 Adding more features to Hyperion in Homeassistant

![hass-gif](/data/img/hyperion-hass.gif)

## Intro
After playing around with Hyperion I really liked it. I liked it so much that I decided to implement it in my smart-home setup.  I currently use Hyperion for Kodi, but I wanted a way to control it with my `Homeassistant`. Because I could automate a lot of workflows eg. automatically turn on the backlight in evenings. My Setup uses two Raspberry Pi devices: First for `Kodi + Hyperion` and second just for `Homeassistant`. Okay lets begin.


First open up your terminal and ssh to a machine with has Hyperion service enabled.
```
ssh kodi@192.168.1.99
```

Test if Hyperion commands are working:
```
hyperion-remote -e "Knight rider"
```

If you gets your lights running are ok to go!

NOTE: In my case Homeassistant and Hyperion are on a different machines therefore I needed to setup a password-less ssh connection from my Homeassistant RPi -> Kodi RPi*

Now login to your second machine running `Homeassistant` service.
```
ssh pi@192.168.1.100
sudo su homeassistant
```

Test the `Hyperion` again but now in a remote configuration.

WARN: You are entering SSH inception. You are connecting via SSH to Linux machine while already connected to another machine via SSH!
```
ssh kodi@192.168.1.99 'hyperion-remote -e "Knight rider"'
```

As mentioned before this step just ran a SSH command in a different machine entirely via the power of SSH.  If you setup is all in one meaning `Hyperion` and `Homeassistant` are running on the same machine then the command would simply be:

```
hyperion-remote -e "Knight rider"
```

Edit `Homeassistant` configuration files:
```
📔 configuration.yaml #

script: !include scripts.yaml

script: !include groups.yaml

input_select:
  hyperion_effects:
    name: Hyperion Effects
    options: !include hyperion_effect_list.yaml
    initial: Rainbow swirl
    icon: mdi:white-balance-iridescent

shell_command:
  run_hyperion_effect:  "ssh kodi@192.168.1.99 \"hyperion-remote -e '{{states.input_select.hyperion_effects.state}}'\" "

```
```
📔 hyperion_effect_list.yaml (create this file in hass root directory)

- Rainbow mood
- Rainbow swirl fast
- Rainbow swirl
- Red mood blobs
- Warm mood blobs
- Blue mood blobs
- Full color mood blobs
- Cold mood blobs
- Green mood blobs
- Knight rider
- Police Lights Single
- Police Lights Solid
- Rainbow mood
- Rainbow swirl fast
- Rainbow swirl
- Sparks Color
- Sparks
- Strobe blue
- Strobe Raspbmc
- Strobe white
- Color traces
- X-Mas
- Cinema brighten lights
- Cinema dim lights
- UDP multicast listener
- UDP listener

```
```
📔 scripts.yaml

hyperion_run:
  alias: Run Hyperion Effect
  sequence:
    - alias: Run selected effect
      service: shell_command.run_hyperion_effect
```
```
📔 groups.yaml # (Optional example to group all items)

hyperion_group:
  name: Hyperion Control
  entities:
    - input_select.hyperion_effects
    - script.hyperion_run
    - switch.hyperion_service

```
## Conclusion

This guide is a more or less a workaround for running Hyperion effects. I saw other people doing similar things to solve this problem but it involved shell script for every Hyperion effect. This was due to the fact that `shell_command` functionality was introduced relatively recently to `Homeassistant`. I could try extending the feature set and add brightness control but for now it suits my needs. Furthermore you could add automation to enable Hyperion only in evenings I actually have done that. If you want to see how I did it checkout my  `Homeassistant` config by visiting this [GitHub repo](https://github.com/dovydasgulbinas/Home-AssistantConfig)


;date: 2017-07-23 18:33:00 +0300
;tags: homeassistant hyperion
