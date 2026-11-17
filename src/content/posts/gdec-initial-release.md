---
title: GDEC Initial Release
description: "This post is to announce the release of GDEC: the Golang Development Environment Container."
pubDatetime: 2015-11-22T21:50:56Z
tags:
  - docker
  - go
---

This post is to announce the release of GDEC: the Golang Development Environment Container.

Currently, it sets up a Docker container with [Visual Studio Code](https://code.visualstudio.com/) and a Go extension. The capabilities of the [Go extension](https://marketplace.visualstudio.com/items/lukehoban.Go) are what initial drew me to even use Visual Studio Code. The visual debugger reminds me of the days I used Visual Studio for C++ debugging. However, I already had my vim-go setup (although it is outdated, and there are more awesome features available now). I wanted to easily make updates to my environment across multiple computers so I figured it would be a great time to dive into Docker from scratch. GDEC is the result of this tinkering. More details can be found at the [Github](https://github.com/jcscottiii/gdec). The docker hub link is [here](https://hub.docker.com/r/jcscottiii/gdec/). Screenshots are below.

## Screenshots

![Terminal starting the GDEC Docker container, which opens Visual Studio Code](/wp-content/uploads/2015/11/gdec-starting-vscode1_still_tmp.jpeg)

Starting the container and Visual Studio Code.

![Editing a Go file in Visual Studio Code inside the GDEC container](/wp-content/uploads/2015/11/gdec-editing-vscode_still_tmp.jpeg)

Editing a Go File

![Debugging Go code in Visual Studio Code inside the GDEC container](/wp-content/uploads/2015/11/gdec-debugging-vscode_still_tmp.jpeg)

Debugging Code
