# Real 3fish.exe Application

This app is based off of this [popular tumblr post](https://ulan-bator.tumblr.com/post/155154594365).

![original](https://user-images.githubusercontent.com/40501327/173753697-c2f942fe-5052-4bb6-9d98-7826f2e5daca.gif)

My wife really liked it so I took it as an opportunity to try out [tauri](https://github.com/tauri-apps/tauri). I tried to make it as accurate as possible, as well as provide actual functionality. Heres a screenshot of the app now:

![CleanShot 2022-06-15 at 03 05 42](https://user-images.githubusercontent.com/40501327/173754335-1ece7340-edd6-436e-a930-9d50c8f30688.gif)

The main differences exist on the titlebar. I replaced the two buttons on the right for a mute and close button. There's currently a useless settings button on the left which will open up more options for the user to take advantage of.

The application currently loops three songs found in this [youtube video](https://www.youtube.com/watch?v=6magIq2zgIM), there will be more settings later for scrubbing through or looping a specific song.

You can change the volume with the mouse wheel.

# Releases

Check out the [releases](https://github.com/snoozed-dev/3fish/releases) to download an unsigned build for your system (i aint paying hundreds for code signing).

# Running locally

1. Follow steps on the [tauri prequisites](https://tauri.studio/v1/guides/getting-started/prerequisites) documentation to get your environment ready.
2. `$ git clone git@github.com:snoozed-dev/3fish.git`
3. `$ cd ./3fish`
4. `$ yarn && yarn tauri dev`

# Building

I currently use the handy [github actions](https://github.com/tauri-apps/tauri-action) provided by [tauri](https://github.com/tauri-apps).
