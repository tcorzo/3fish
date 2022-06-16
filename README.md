# Real 3fish.exe Application

This app is based off of this [popular tumblr post](https://ulan-bator.tumblr.com/post/155154594365).

![original](https://user-images.githubusercontent.com/40501327/173753697-c2f942fe-5052-4bb6-9d98-7826f2e5daca.gif)

My wife really liked it so I took it as an opportunity to try out [tauri](https://github.com/tauri-apps/tauri). I attempted to make it as accurate as possible, as well as provide actual functionality. Heres a screenshot of the app now:

![CleanShot 2022-06-16 at 17 52 12](https://user-images.githubusercontent.com/40501327/174161624-48bbfce1-2712-4b3d-b0db-857e48e7e9a4.png)

The scale of everything is 2x since it would be too small for modern displays.

The main differences can be found on the title bar since this window can't really be maximized by the button on the right as the background would look silly. I added some options to the left menu button aswell.

The application loops three songs I found in this [youtube video](https://www.youtube.com/watch?v=6magIq2zgIM), there will be more settings later for scrubbing through or looping a specific song.

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
