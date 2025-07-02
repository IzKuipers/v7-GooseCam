# Goose Cam

Keep track of the holy goose! I got this goose from someone very important to me. I've decided to put a camera on the little creature to make sure it doesn't go anywhere. As you can see he's already gotten my keys, who knows what else he's capable of...

## Making of the Goose Cam

This all started when I watched a video from Nostalgia Nerd about the Trojan Room Coffee Pot. I found that to be so fascinating that I immediately wanted to do something like that myself. One thing was clear: I wanted to have a constantly running feed of some static object hosted online on my site.

### The Raspberry Pi

As with a lot of projects, the Raspberry Pi comes as the heart of it all. More specifically my old Raspberry Pi 3b+ that recently got decommissioned, the perfect choice. I installed a fresh copy of Raspbian, nothing special, just the stock operating system, and I enabled Composite Video. Why the hell would I need Composite Video for a simple webcam streaming thing? Good question. We'll get to that.

I confirmed that Linux could work with my cheap Trust webcam and got a basic test running in which I simply pulled some questionable faces in front of the camera to test image quality, adjust focus and make sure it didn't drop (too many) frames. After that, it was building time. What kind of building? The best kind.

### The LEGO Enclosure

Because the old project of the Pi was moved to storage, it didn't have any kind of housing anymore. And, since I don't have a 3D-printer and I'm not creative enough to mess around with cardboard and tape, I decided to build a simple (and ugly) enclosure for the Pi and the camera. After a lot of struggle I got the Pi in a LEGO enclosure with (most of) the ports unobstructed. There's a compartment next to the Pi that houses the foot of the webcam, the webcam itself sticking out the top. Underneath the Pi is a big mess of wires, since the webcam's USB cable is so unnecessarily long. Stuffing that cable in there was no easy task.

### But why the Composite?

If you're anything like me, you love a good side-project to derive from your original plan. For this project that came in the form of a little Color CRT (Television). It has a composite video port and seemed like the perfect device to have on the shelf above the Goose so that I could make adjustments while looking at an actual feed of the goose. To hook it up to the Pi 3 you need a special cable since the composite is embedded into the headphone/microphone jack, but I had already made this cable weeks prior to this project while repairing this CRT. I enabled Composite Video Out using `raspi-config`, and I then did a couple hours of tinkering and troubleshooting to get it all to work, which I'll get to. Using a CRT for this is power-hungry but super fancy.

### The Linux side of things

I'll be the first to admit that it was challenging to get all of this to work. I had never really messed with `ffmpeg` or `motion` (the two applications that power all of this), so I had a lot of troubleshooting ahead of me. In the end, I'm running two `systemd` services simultaneously. One outputs the webcam's feed to `http://localhost:8080/` using `motion`, and the other feeds that webpage to the Pi's framebuffer using `ffmpeg` so that it's displayed on the CRT.

#### The ffmpeg command

After a lot of troubleshooting, this is the command I ended up with for my specific scenario:

```bash
ffmpeg -i http://localhost:8080 -pix_fmt rgb565le -vf "scale=680:450, pad=720:480:(ow-iw)/2:(oh-ih)/2" -f fbdev /dev/fb0
```

It's got some padding on there to correct the annoying amount of overscan that this little CRT has on the Composite channel. The resolution is 720x480 instead of 640x480 to stretch it out because the Composite video signal is squeezed quite a bit horizontally.

#### The Motion setup

Setting up Motion involved enabling image streaming, setting the resolution and adjusting some text scaling. I used [this Gist comment](https://gist.github.com/endolith/2052778?permalink_comment_id=3316138#gistcomment-3316138) as a base for my configuration. I added `text_scale 3`, `text_left IzK` to the config, and I removed the brightness, contrast and saturation settings since my webcam is way too basic for that and the default works better.

## Known problems

- It's possible for the feed to freeze after awhile. That's not a problem with this application, rather a problem with `motion`. Luckily, you can click the feed to refresh it. It might look broken for a second, but **it's the intended behaviour!**

## Author

Izaak Kuipers [izaak.kuipers@gmail.com](mailto:izaak.kuipers@gmail.com)

## License

MIT
