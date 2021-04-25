🏡 Adding more features to Hyperion in Homeassistant

<video src="/data/ani/hyperion-hass.webm"  autoplay loop muted></video>


## Intro

After playing around with Hyperion I really liked it, I liked it so much that I decided to implement it in my smart-home setup.  I currently use Hyperion for Kodi, but I wanted a way to control it with my `Homeassistant`, because I could automate a lot of workflows e.g. automatically turn on the backlight in evenings. My Setup uses two Raspberry Pi devices: First for `Kodi + Hyperion` and second just for `Homeassistant`. Okay lets begin.


First open up your terminal and ssh to a machine with has Hyperion service enabled.

    ssh kodi@192.168.1.99

Test if Hyperion commands are working:

    hyperion-remote -e "Knight rider"

If you got your lights running are ok to go!

NOTE: In my case Homeassistant and Hyperion are on a different machine therefore I needed to set up a password-less ssh connection from my Homeassistant RPi → Kodi RPi*

Now login to your second machine running `Homeassistant` service.
```sh
ssh pi@192.168.1.100
sudo su homeassistant
```

Test the `Hyperion` again but now in a remote configuration.

**WARNING:** You are entering SSH inception, because you are connecting via SSH to Linux machine while already connected to another machine via SSH!
```
ssh kodi@192.168.1.99 'hyperion-remote -e "Knight rider"'
```

It was mentioned previously that this step just ran an SSH command in a different machine entirely via the power of SSH.  If your setup is all in one meaning `Hyperion` and `Homeassistant` are running on the same machine then the command would simply be:

    hyperion-remote -e "Knight rider"

Edit `Homeassistant` configuration files:
```yaml
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

```yaml
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

```yaml
📔 scripts.yaml

hyperion_run:
  alias: Run Hyperion Effect
  sequence:
    - alias: Run selected effect
      service: shell_command.run_hyperion_effect
```

```yaml
📔 groups.yaml # (Optional example to group all items)

hyperion_group:
  name: Hyperion Control
  entities:
    - input_select.hyperion_effects
    - script.hyperion_run
    - switch.hyperion_service

```
## Conclusion

This guide is a more or less a workaround for running Hyperion effects. I saw other people doing similar things to solve this problem, but it involved shell script for every Hyperion effect. This was due to the fact that `shell_command` functionality was introduced relatively recently to `Homeassistant`. I could try extending the feature set and add brightness control but for now it suits my needs. Furthermore, I could add automation to enable Hyperion only in evenings and I actually have done that. For more inspiration you can check out my  `Homeassistant` config by visiting this [GitHub repository.](https://github.com/dovydasgulbinas/Home-AssistantConfig)


;date: 2017-07-23 18:33:00 +0300
;tags: Homeassistant Hyperion
