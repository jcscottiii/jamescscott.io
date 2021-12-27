---
author: James Scott
categories:
- App Engine
- Go
- Golang
date: 2014-08-31T01:06:54Z
title: 'Go and App Engine: Part 1 &#8211; Setup'
aliases: [/2014/08/31/go-appengine-part-1/]
type: "post"
---

This is part 1 of a series of posts that involve developing and publishing to Google&#8217;s App Engine with Go as the backend. In addition, it will exemplify how to take advantage of the App Engine&#8217;s new module system. This post will run through setting up your existing Go environment to develop using Google App Engine.

## <span style="text-decoration: underline;">Setup</span>

### Installing Google Cloud SDK for Go

This post assumes you already have Go setup. Refer to my previous [Go post for tips on setting up](https://jamescscott.io/2014/07/30/go-setup/ "My Go Setup") if you have not. Google Cloud SDK tools have come a long way. Now, there&#8217;s a nice website with a script that can setup everything.

<pre class="EnlighterJSRAW" data-enlighter-language="null">curl https://sdk.cloud.google.com/ | bash</pre>

Choose Go. source the rc file that you told it to modify or just restart the terminal.

<pre class="EnlighterJSRAW" data-enlighter-language="null">gcloud auth login</pre>

The above line should authenticate you Google. It uses your logged in Google account in your browser to go ahead and authenticate you.

### Adding App Engine info to Vim-Go

Autocompletion is every developer&#8217;s best friend. However, if you open a new Vim-Go and try to add code that uses the App Engine libraries, it won&#8217;t auto complete. Vim-Go uses gocode. Just to make sure vim-go has it already you can run within a vim window:

<pre class="EnlighterJSRAW" data-enlighter-language="no-highlight">:GoUpdateBinaries</pre>

This will update your binaries for vim-go and install them in $HOME/.vim-go/ by default. Gocode maintains this variable called lib-path. This variable points to location of libraries you develop with. The libraries contain the necessary info for auto completion. As per Gocode&#8217;s [Readme](https://github.com/nsf/gocode/blob/master/README.md), lib-path defaults <strong style="color: #333333;">$GOPATH/pkg/$GOOS_$GOARCH</strong><span style="color: #333333;"> and </span><strong style="color: #333333;">$GOROOT/pkg/$GOOS_$GOARCH</strong>. This lib-path essentially only points to the created libraries from when you compile you Go code. Gocode uses the resolved value of the environment variable so if for example GOPATH changes, gocode will not use the new GOPATH variable. Luckily, the developers of gocode allow this variable to be overridden via command line. In my previous post, I mentioned using Go Versioning Packager (GVP) to manage your GO environment variables. Now, with the fact that I could possibly switch workspaces and inability to update the location of my libraries for gocde, I began to develop a script to solve just that by essentially looking at the possibly new value of GOPATH and overriding the old lib-path with the new value. <span style="text-decoration: underline;"><strong>More importantly, the <a href="https://github.com/jcscottiii/gocode_gvp_helper">script</a> can add additional libraries (like the location of our App Engine libraries)</strong></span>. To use the script, you need to:

  1. Either have gocode in your path or set the &#8220;gocode_bin&#8221; in the python script.
  2. Since we want to add the appengine library, add it to the list of additional_paths in the script.

Note: Make sure the paths for both bullet points contain the absolute resolved path (no environment variables) Run the script and you should be set. So now whenever you gvp into a different workspace, just run this script afterwards for autocompletion. ![](/wp-content/uploads/2014/09/223.png)

You should be ready to start developing Go for App Engine!

### Next Post

In the next post of the series, I will be doing some simple development and running a server locally on your computer. If you want a sneak peek, you can refer to my Github post [here](https://github.com/jcscottiii/testgaeapp). But warning, while it works now, it&#8217;s not polished. YMMV
