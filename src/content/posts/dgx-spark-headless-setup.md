---
title: "Setting up a DGX Spark headless, from my phone"
description: "I didn't want a monitor, keyboard, and mouse in my server room. Here's how I set up an NVIDIA DGX Spark without any of them."
pubDatetime: 2026-12-01T12:00:00Z
draft: true
series: dgx-spark
seriesPart: 1
tutorial: true
tags:
  - dgx-spark
  - homelab
  - local-ai
---

<!--
DRAFT. Before publishing:
- Replace every [TODO] with what actually happened.
- Photos: put originals in photos-inbox/, run
  `pnpm images dgx-spark-headless-setup`, paste the Markdown it prints,
  and write real alt text.
- Set ogImage to the card art (see shot list).
- Blur: Quick Start sticker, serial numbers, MAC addresses, Wi-Fi names,
  IP addresses, anything with your street address.
- Set pubDatetime to the real date and remove `draft: true`.

Shot list (landscape, JPEG / "Most Compatible", daylight, plain background):
1. Sealed box, then box next to a mug or your hand for scale
2. Contents laid out flat; front and rear ports close up; power brick
3. Quick Start card (blur the sticker)
4. Phone screen recording: joining the hotspot and the setup wizard
5. The Spark in its spot in the server room, cables connected
6. Terminal: first SSH login and nvidia-smi (blur hostname and IPs)
7. Card art: one 16:9 AI illustration for ogImage
-->

I have a server room. I did not want a monitor, keyboard, and mouse in it. The good news: the DGX Spark is designed to be set up without any of them.

[TODO: one or two sentences on why you bought it and what you want to learn.]

## What's in the box

[TODO: unboxing photos. The unit next to something for scale, the ports, the power brick.]

## Cable first, power last

The Spark turns on the moment it gets power. There's no power button. So plug in everything else first, starting with Ethernet, and connect power last.

Use the power adapter that came in the box. People on the NVIDIA forums have traced throttling, failed boots, and random shutdowns back to third-party USB-C chargers.

## Setup over its own Wi-Fi

On first boot, the Spark broadcasts its own setup hotspot. The network name and password are on a sticker on the Quick Start card in the box.

I joined it from my phone. A few things helped:

- **Turn off mobile data.** The hotspot has no internet, and phones like to drop networks like that and switch back to cellular.
- **Open the setup page by hand if it doesn't pop up.** The address is on the same sticker.
- **Expect your phone to switch networks partway through.** Once the Spark joins your home network, the hotspot shuts off and your phone needs to rejoin your home Wi-Fi to finish.

[TODO: what the wizard asked for, anything that surprised you, and screenshots from your phone.]

Then it downloads updates and reboots. Plan on it being unreachable for a while. [TODO: how long it took for you.]

## Then it's just SSH

Once it joined my network, it showed up by name:

```sh
ssh [user]@spark-[xxxx].local
```

I also gave it a fixed address on my router (a DHCP reservation) so it never moves.

[TODO: whether you used NVIDIA Sync or plain SSH. That's Part 2.]

## What I'd do differently

[TODO: the mistakes. This is the part people remember.]
