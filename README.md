# electron-curse-ptt
An electron wrapper over the Curse voice client website enabling system wide PTT on linux.

## Why
I do everything on linux, even gaming.
The people I'm playing with decided to go for Curse (not availabel for linux) over Discord (available for linux).
It's noising at home so keeping the mic open is not an option.
I want to speak without having to focus my browser.

## How
The only way I found requires to listen to input events in /dev/input. Any input even goes through there. The simplest way 
to enable system wide PTT is to actually listen to those events. The downside is that you need root access for that. If 
instead of running the app with root access you'd give your user access to /dev/input, you'd open yourself to keyloggers
and what not.
