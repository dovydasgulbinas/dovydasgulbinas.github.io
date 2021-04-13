What is Game State Integration on CS:GO?

# Intro

A controversial CS:GO [winter update](https://blog.counter-strike.net/index.php/2015/12/13325/) (12/17/2015) had community raging about ridiculous changes to weapon mechanics as well as the notoriously OP R8 revolver.
Due to high dissatisfaction and many other changes community really ignored the good and interesting things devs at 'Valve' had given us
One of those 'good' things like [Game State Integration](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration)


## What is Game State Integration (GSI) ?

 Game state integration is a sexy new way to link up *events* that are happening in the gave with any computer or any device that handles basic RESTful messages.
 You may ask what are events exactly currently these events include:

- information about spectated player (name, steam ID, clan, etc.)
- Can give you information about the round current round state (whether the game is in freeze time mode, pause, or that the round is simply running)
- You can even get info about when the bomb has been planted
- You can get info on which team had won the round
- Receive info on every time you kill an enemy
- Get notified every time a bullet is fired
- Know the score and the map of the game
- and many more...

## Why is it useful?

Because it is ultra easy to setup and can enable you to control&nbsp;virtually &nbsp;anything PC or some crazy piece of hardware.
Original post of CS:GO devs told that:

```
For example, game state integration was used at the CS:GO Major Championship at DreamHack Cluj-Napoca to present special stage effects (e.g., lighting and pyrotechnics) during a match.
```


## Demonstrations

Up to this date various people including me have created many interesting things using GSI. See videos down below:

### CS:GO HUD in a browser window

![video thumbnail](https://i.ytimg.com/vi/FM1-iapbEtc/0.jpg)
[video link](https://www.youtube.com/embed/FM1-iapbEtc)

Probably the most sophisticated of all demos given below.
This is a rich extension to your CS:GO game. Technology used here is node.js and JavaScript.
This video really showcased the functionality GSI has. I strongly encourage you to tryout this one on your own computer.
More info on how to do it can be found on GitHub [Phillips hue lights controlled by a C4 timer](https://github.com/Double0negative/CSGO-HUD").

![video thumbnail](https://i.ytimg.com/vi/QBdI54MHB-k/0.jpg)
[video link](https://www.youtube.com/embed/QBdI54MHB-k)

This project is by far the least sophisticated but really has the wow factor.
For this video Phillips hue light were used in combination with Python and Hue Bridge IP more info on this project can be found also on [GitHub](https://github.com/doobix/csgo-c4-hue)

### My project physical 7-segment HUD

This is what I made. I choose Python for my project because I recently
started learning it and thought it was a good practice. All of the
functionality is demonstrated in the video.

![video thumbnail](https://i.ytimg.com/vi/6le5cuakBh4/0.jpg)
[video link](https://www.youtube.com/embed/6le5cuakBh4)

## Closing remarks

By now I hope you really got a grasp on what GSI has to offer. If you are exited about it and want to make something similar feel free to contact me. By the time I'm writing this post someone has already wrote a *C#* library specifically designed to handle GSI events.
For my future blog posts I'll try to cover actually how GSI works. And I will also give you my experience and what I learned during this project until now you can [read more about GSI](https://developer.valvesoftware.com/wiki/Counter-Strike:_Global_Offensive_Game_State_Integration)
Until then make something epic and share it with the world.

Vi ses

;tags arduino csgo gsi