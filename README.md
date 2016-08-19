# electron-curse-ptt
An electron wrapper over the Curse voice client website enabling system wide PTT on linux.

## Why

- I do everything on linux, even gaming.
- The people I'm playing with decided to go for Curse (not availabel for linux) over Discord (available for linux).
- It's noisy at home so keeping the mic open is not an option.
- I want to speak without having to focus my browser.

## How
The simplest way to do system wide PTT requires to listen to input events in /dev/input.
Any input event goes through there.The downside is that you need root access for that. If 
instead of running the app with root access you'd give your user access to /dev/input,
you'd open yourself to keyloggers and what not.

The wrapper simply listen to KEY_LEFTCTRL for keydown (1) and keyup (0). When the key is
held down (2), we don't have to do anything. It then sends keydown and keyup events for
Ctrl+X to the BrowserWindow. Therefore, the PTT shortcut key must be configured to Ctrl+X.
If the two keybinds are the same, the keydown and keyup events would be sent twice when
the window would be focused.

I wasn't able to reach the localStorage where Curse keeps the settings (localStorage.settings
for a json of all the user settings).
