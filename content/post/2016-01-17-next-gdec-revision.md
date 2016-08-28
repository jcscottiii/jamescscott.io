---
author: James Scott
categories:
- Docker
- Go
- Golang
date: 2016-01-17T11:07:46Z
guid: https://jamescscott.io/?p=319
id: 319
title: Plans for Next GDEC revision
url: /2016/01/17/next-gdec-revision/
---

It has been while with GDEC and I found many different problems with it. That has led me to think about how to do the next GDEC revision. Right now, my current pains are:

  * Getting the GUI setup for Windows seems impossible using the current technologies.
  * Code is isolated between container and host (biggest pain).
  * Lack of documentation on how to incorporate it in one&#8217;s workflow.

However, there are some new things I will try in the next iteration.

  * VNC. Setting up all that X11 stuff was hard and slow and didn&#8217;t work on Windows. There are VNC viewers for Windows so that should work out. I&#8217;m just hoping the performance is better too.
  * Use mounted volumes to solve the issue of isolation between host and container (newbie mistake)

Why do all of this? Context switching between projects is expensive (it costs you and your company time that can add up over time). Also, I&#8217;m lazy.

My ideal situation would consist of 1-2 commands and the whole environment is (re)setup. IDE container, Code Execution Container, External Services Container(s).

However, there are opinions about which IDE to use and such that can get in the way. I&#8217;ll think about those for the revision after this one.

The only question now is when I will get to it.

P.S. I don&#8217;t develop on Windows (only use it for gaming) but I think supporting Mac OS X, Windows, and Linux is important.