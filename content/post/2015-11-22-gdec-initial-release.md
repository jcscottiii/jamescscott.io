---
author: James Scott
categories:
- Docker
- Go
- Golang
date: 2015-11-22T21:50:56Z
guid: https://jamescscott.io/?p=296
id: 296
title: GDEC Initial Release
url: /2015/11/22/gdec-initial-release/
---

This post is to announce the release of GDEC: the Golang Development Environment Container.

Currently, it sets up a Docker container with [Visual Studio Code](https://code.visualstudio.com/) and a Go extension. The capabilities of the [Go extension](https://marketplace.visualstudio.com/items/lukehoban.Go) are what initial drew me to even use Visual Studio Code. The visual debugger reminds me of the days I used Visual Studio for C++ debugging. However, I already had my vim-go setup (although it is outdated, and there are more awesome features available now). I wanted to easily make updates to my environment across multiple computers so I figured it would be a great time to dive into Docker from scratch. GDEC is the result of this tinkering. More details can be found at the [Github](https://github.com/jcscottiii/gdec). The docker hub link is [here](https://hub.docker.com/r/jcscottiii/gdec/). Screenshots are below.

#### Screenshots

<div class="gif_wrap wpgp-width600">
  <span class="empty_span wpgp-width600"></span> <span class="play_gif wpgp-width600">GIF</span> <img src="https://jamescscott.io/wp-content/uploads/2015/11/gdec-starting-vscode1_still_tmp.jpeg" class="_showing frame no-lazy" />
</div>

<img src="https://jamescscott.io/wp-content/uploads/2015/11/gdec-starting-vscode1_still_tmp.jpeg" class="_hidden no-lazy" alt="bla" style="display:none;" />
  


Starting the container and Visual Studio Code.

&nbsp;

<div class="gif_wrap wpgp-width600">
  <span class="empty_span wpgp-width600"></span> <span class="play_gif wpgp-width600">GIF</span> <img src="https://jamescscott.io/wp-content/uploads/2015/11/gdec-editing-vscode_still_tmp.jpeg" class="_showing frame no-lazy" />
</div>

<img src="https://jamescscott.io/wp-content/uploads/2015/11/gdec-editing-vscode_still_tmp.jpeg" class="_hidden no-lazy" alt="bla" style="display:none;" />
  


Editing a Go File

&nbsp;

<div class="gif_wrap wpgp-width600">
  <span class="empty_span wpgp-width600"></span> <span class="play_gif wpgp-width600">GIF</span> <img src="https://jamescscott.io/wp-content/uploads/2015/11/gdec-debugging-vscode_still_tmp.jpeg" class="_showing frame no-lazy" />
</div>

<img src="https://jamescscott.io/wp-content/uploads/2015/11/gdec-debugging-vscode_still_tmp.jpeg" class="_hidden no-lazy" alt="bla" style="display:none;" />
  


Debugging Code