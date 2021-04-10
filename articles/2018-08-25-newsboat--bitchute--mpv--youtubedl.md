Newsboat + Bitchute + mpv + youtube-dl


# $0: Why?


First of all RSS is still qualifies as a great technology.  Even though RSS
faded to obscurity in the past 8 years or so it is still very useful.  RSS was
and will be an integral part to the internet same as HTTP, e-mail and IRC is.

In the age when information streams are controlled by few major corporations it
important not to forget that we are responsible for what we are consuming.
This is why RSS is great with it you can aggregate
information form whole variety of sources: Youtube, Twitter, Blogs and even
those old crusty image boards that "Taiwanese Fishermen" are using to cause
political chaos in across the globe.

I recently began using Newsboat RSS client and I fell in love with it.  I loved
it so much that I even added my favorite Youtube channels as RSS feed.  There
are tons of information on how you can watch any Youtube video using `youtube-dl`
on a `mpv` media player, but I wanted to go one step further I wanted to be able
to watch Bitchute videos (that I subscribed via RSS) straight from my Newsboat client.

Here is how I have done it

## Prerequisites


- mpv 
- Newsboat
- youtube-dl


# Let's Begin!


## $1: Add this function to end of your `.bashrc` or `.zshrc` file.



```
btpl(){

PAGE=$(curl -s $1)
url="$(echo \"$PAGE\" | grep -Eoi '<source [^>]+>' | grep -Eo 'src="[^\"]+"' | grep -Eo '(http|https)://[^"]+')"
# url="$(curl -s $1 | grep -Eoi '<source [^>]+>' | grep -Eo 'src="[^\"]+"' | grep -Eo '(http|https)://[^"]+')"
TITLE=$(echo \"$PAGE\" | grep -oEi "<title>(.*)</title>" | cut -d '>' -f2 | cut -d '<' -f1)

mpv --ontop=yes --title="$TITLE" --snap-window --autofit-larger='25%' --geometry='-10-10' --speed 1.75 $url &
}
```

Let's explain some parameters of the command above:

`--ontop=yes`
:  this will always display the video window on top. I did this because I wanted
something similar to "Picture In Picture" feature found on OSX computers.

`--title=$TITLE`
:  it is the title of the mpv window duhhhh. 

`--snap-window`
:  this is optional, but it helps when you are moving the window around the
screen, because it snaps it to the 4 corners of the screen.

`--autofit-larger='25%'`
:  resizes the window to 25% (based on what is bigger width or height)

`--geometry='-10-10'`
:  Displays the mpv player window to the BOTTOM RIGHT corner and makes sure that
there is a 10px margin.

`--speed 1.75`
:  Pushes your brain to the limit, because playback now is 1.75x faster! Feel


**Open a new terminal window, and paste code below:**

```
btpl https://www.bitchute.com/video/UGlrF9o9b-Q/
```

If all went well video should of started playing.  

I bet you are not used to watching videos at 1.75x of their original speed but
trust me after some time you get used to it. It saves you time ;P


![success](/assets/img/btpl-screen-success.png)



## $2: Configure Newsboat


- Open your Newsboat configuration file: `~/.newsboat/config` 
    - on some linux distros this file is found at: `~/.config/newsboat/config`
- Paste these lines below:

```
# only for OSX
browser open

# only for Debian
browser nautilus

# only for bash users
macro b set browser "source $HOME/.bashrc && btpl "; open-in-browser ; set browser open

# only for zsh users
macro b set browser "source $HOME/.zshrc && btpl "; open-in-browser ; set browser open
```

`browser open`
:  This line is not talking about your web browser, but rather the browser of
your OS. On OSX system browser is `open` it handles many things: opens files,
handles various URLs, decides which program should open which file.  Linux Arch
users will probably use `linkhandler`, for Debian'istas it will be `nautilus`
and Linux Mints should use `nemo` instead of `open`

`macro b set browser [...]`
:  sets a macro on key press "b".  Now every time you press `",b"` characters
while in Newsboat. Hotkey for starting macros is always `","` read more about
macros [here](https://newsboat.org/releases/2.12/docs/newsboat.html)


For more info about Newsboat config you can go [here](https://newsboat.org/releases/2.12/docs/newsboat.html)


## $3: Add a Bitchute RSS test URL.


- Open your Newsboat URLs file: `~/.newsboat/urls` 
    - on some linux distros this file is found at: `~/.config/newsboat/urls`
- Paste this line below:

```
https://www.bitchute.com/feeds/rss/channel/styxhexenhammer666/ "news"
```

## $4: Fire it up!


- Start Newsboat:

```
newsboat
```

- Find The RSS feed we just added
- List all the items:

![how-to-invoke](/assets/img/how-to-invoke.png)


- hit: `",b"`
- Enjoy the Show!


# Last Words


That is it you should be able to watch any Bitchute video on your mpv player
straight from Newsboat RSS feed.  That is pretty cool and proved to be quite
useful.  I love the fact that mpv is highly customizeable and I can mimic the
`picture-in-picture` I really wanted.

- If you want to learn more about Newsboat Luke Smith has a great [video](https://www.youtube.com/watch?v=dUFCRqs822w) on it
- If you are interested were I came up with the bitchute-dl idea see this [video](https://www.bitchute.com/video/W4g3Jktibucb/) and the original [script](https://archive.fo/zd49L)
- If you want to see my current Newsboat configuration visit [here](https://github.com/dovydasgulbinas/env-configs/tree/master/newsboat)

return 0


;[1]: https://newsboat.org/releases/2.12/docs/newsboat.html#_first_steps
;[2]: https://newsboat.org/releases/2.12/docs/newsboat.html#_macro_support 
;[3]: https://www.youtube.com/watch?v=dUFCRqs822w 
;[4]: https://archive.fo/zd49L
;[5]: https://github.com/dovydasgulbinas/env-configs/tree/master/newsboat
;[6]: https://www.bitchute.com/video/W4g3Jktibucb/ "TheOuterLinux bt channel"
;layout: post
;comments: true
;date: 2018-08-25 16:26:39
;date_updated: 
;time_finished: 2018-08-25 19:19:39
;image: https://dovydas.xyz/assets/img/closed-and-key.png
;tags: software tui video
