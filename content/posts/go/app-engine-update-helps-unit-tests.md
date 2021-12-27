---
author: James Scott
categories:
- App Engine
- Go
- Golang
date: 2014-09-30T16:28:24Z
title: App Engine Update Which Helps My Unit Tests!
aliases: [/2014/09/30/app-engine-update-helps-unit-tests/]
type: "post"
---

I began to write unit tests for my private project and ran into a weird problem that I have seen others comment on because of the inability to use fake HTTP requests for things like unit testing.

For particular App Engine operations, you pass the incoming HTTP request object to things like the Datastore. However, for unit tests, you have to create a fake HTTP request. Or so I thought.

This is the error that I get:

<pre class="lang:default decode:true">panic: appengine: NewContext passed an unknown http.Request [recovered]
	panic: appengine: NewContext passed an unknown http.Request</pre>

(Note: There are some solutions to this problem already before this update like this [elegant solution](http://www.compoundtheory.com/testing-go-http-handlers-in-google-app-engine-with-mux-and-higher-order-functions/) by Mark Mendel. But now with the update it&#8217;s a lot simpler.)

However, version 1.9.11 of the Go App Engine SDK brought some very convenient additions. I will show you that a fairly recent update allows you fix this problem easily. <img src="https://jamescscott.io/wp-includes/images/smilies/simple-smile.png" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" />


### **My Problem**

I architected my code to be PaaS-independent because while I am using App Engine, in the future that may not be the case. For the majority (if not all App Engine transactions), you need a App Engine Context.

I architected the stack as following:

  1. The server receives a request and routes it to an appropriate function (e.g Login(*http.Request, http.ResponseWriter))
  2. Within the function, the incoming \*http.Request is passed to some worker function that has a specific function and uses a specific technology (e.g. db.GetItem(&#8220;user_table&#8221;, username, \*http.Request) &#8211; Getting a user from a database. The database technology can be different between PaaS and in the App Engine case we use Datastore.)
  3. This function resides in another file (sometimes even another package). I always have at least two files for these worker functions. Each file has its own implementation of the function and using [build constraints](http://blog.golang.org/the-app-engine-sdk-and-workspaces-gopath) I build only one of the files. Which one I build depends on the PaaS. (I have better abstract interface stuff going on but won&#8217;t go into detail for this post to keep it simple.)
  4. Within my App Engine specific file, I can take the *http.Request and create the context I need to use Datastore.

Now if I want to test from Step 2 onwards, I need to create my own incoming *http.Request. If I create my request and call the function within my unit test. I will ultimately get the error.

<pre class="lang:default decode:true">panic: appengine: NewContext passed an unknown http.Request [recovered]
	panic: appengine: NewContext passed an unknown http.Request</pre>

###

### **Road To The Fix**

My reasoning was to check in the App Engine source code for why it&#8217;s panicking. So I just Googled the error and found the source code in [api_dev.go](https://code.google.com/p/appengine-go/source/browse/appengine_internal/api_dev.go)

![](/wp-content/uploads/2014/09/154.png)

Ok so basically, I need to make sure that my request is in the ctxs map. Where do they normally do it?

![](/wp-content/uploads/2014/09/131.png)

As suspected, for every real request, they add it to the map.

Now, where else do they do it?

![](/wp-content/uploads/2014/09/629.png)

There&#8217;s this new function that adds what we need but it&#8217;s in the appengine_internal package.

If we search around the code in our &#8220;appengine&#8221; package we have&#8230;

![](/wp-content/uploads/2014/09/383.png)

Ah-ha. So if we can get an instance object and call NewRequest(), everything will be taken care of.

### **The Fix**

My Go App Engine SDK is terribly out of date.

![](/wp-content/uploads/2014/09/747.png)

And that addition was just added to the version released 6 days ago as of this writing.

![](/wp-content/uploads/2014/09/980.png)

Time to upgrade!

<pre class="lang:sh decode:true ">gcloud components update</pre>

Kudos to the Developers at Google who created the gcloud tool. It works so well.

Now lets look at the version.

![](/wp-content/uploads/2014/09/845.png)

Uh oh, the appengine version didn&#8217;t upgrade to version 1.9.11, which is the version we need. I checked the hosted json file, components-2.json, that the glcoud tool looks at and it looks that while they have released version 1.9.11 individually, they have not updated this file.

**Update (Sept 30)** &#8211; Until Sept 30, [I began to write unit tests for my private project and ran into a weird problem that I have seen others comment on because of the inability to use fake HTTP requests for things like unit testing.

For particular App Engine operations, you pass the incoming HTTP request object to things like the Datastore. However, for unit tests, you have to create a fake HTTP request. Or so I thought.

This is the error that I get:

<pre class="lang:default decode:true">panic: appengine: NewContext passed an unknown http.Request [recovered]
	panic: appengine: NewContext passed an unknown http.Request</pre>

(Note: There are some solutions to this problem already before this update like this [elegant solution](http://www.compoundtheory.com/testing-go-http-handlers-in-google-app-engine-with-mux-and-higher-order-functions/) by Mark Mendel. But now with the update it&#8217;s a lot simpler.)

However, version 1.9.11 of the Go App Engine SDK brought some very convenient additions. I will show you that a fairly recent update allows you fix this problem easily. <img src="https://jamescscott.io/wp-includes/images/smilies/simple-smile.png" alt=":)" class="wp-smiley" style="height: 1em; max-height: 1em;" />


### **My Problem**

I architected my code to be PaaS-independent because while I am using App Engine, in the future that may not be the case. For the majority (if not all App Engine transactions), you need a App Engine Context.

I architected the stack as following:

  1. The server receives a request and routes it to an appropriate function (e.g Login(*http.Request, http.ResponseWriter))
  2. Within the function, the incoming \*http.Request is passed to some worker function that has a specific function and uses a specific technology (e.g. db.GetItem(&#8220;user_table&#8221;, username, \*http.Request) &#8211; Getting a user from a database. The database technology can be different between PaaS and in the App Engine case we use Datastore.)
  3. This function resides in another file (sometimes even another package). I always have at least two files for these worker functions. Each file has its own implementation of the function and using [build constraints](http://blog.golang.org/the-app-engine-sdk-and-workspaces-gopath) I build only one of the files. Which one I build depends on the PaaS. (I have better abstract interface stuff going on but won&#8217;t go into detail for this post to keep it simple.)
  4. Within my App Engine specific file, I can take the *http.Request and create the context I need to use Datastore.

Now if I want to test from Step 2 onwards, I need to create my own incoming *http.Request. If I create my request and call the function within my unit test. I will ultimately get the error.

<pre class="lang:default decode:true">panic: appengine: NewContext passed an unknown http.Request [recovered]
	panic: appengine: NewContext passed an unknown http.Request</pre>

###

### **Road To The Fix**

My reasoning was to check in the App Engine source code for why it&#8217;s panicking. So I just Googled the error and found the source code in [api_dev.go](https://code.google.com/p/appengine-go/source/browse/appengine_internal/api_dev.go)

![](/wp-content/uploads/2014/09/154.png)

Ok so basically, I need to make sure that my request is in the ctxs map. Where do they normally do it?

![](/wp-content/uploads/2014/09/131.png)

As suspected, for every real request, they add it to the map.

Now, where else do they do it?

![](/wp-content/uploads/2014/09/629.png)

There&#8217;s this new function that adds what we need but it&#8217;s in the appengine_internal package.

If we search around the code in our &#8220;appengine&#8221; package we have&#8230;

![](/wp-content/uploads/2014/09/383.png)

Ah-ha. So if we can get an instance object and call NewRequest(), everything will be taken care of.

### **The Fix**

My Go App Engine SDK is terribly out of date.

![](/wp-content/uploads/2014/09/747.png)

And that addition was just added to the version released 6 days ago as of this writing.

![](/wp-content/uploads/2014/09/980.png)

Time to upgrade!

<pre class="lang:sh decode:true ">gcloud components update</pre>

Kudos to the Developers at Google who created the gcloud tool. It works so well.

Now lets look at the version.

![](/wp-content/uploads/2014/09/845.png)

Uh oh, the appengine version didn&#8217;t upgrade to version 1.9.11, which is the version we need. I checked the hosted json file, components-2.json, that the glcoud tool looks at and it looks that while they have released version 1.9.11 individually, they have not updated this file.

**Update (Sept 30)** &#8211; Until Sept 30,](https://dl.google.com/dl/cloudsdk/release/components-2.json) stayed the same. I even filed an issue about it. The only way to update your SDK is by doing it manually. As of today, the json fille received an update and the Go SDK for App Engine is now version 1.9.12. (Which is perfect for our needs)!

![](/wp-content/uploads/2014/09/675.png)

Now we are using the right version!

You will be creating an instance manually and needs to be handled carefully on the resources side.

You have to:

  1. Manually call NewInstance()
  2. Manually call .Close() on that object. Preferably, by using the &#8220;defer&#8221; keyword.

<pre class="lang:go mark:11,15-16 decode:true ">import (
	"appengine/aetest"
	...
	...
)

..
..

func TestGetNonExistentAccount(t *testing.T) {
	inst, e := aetest.NewInstance(nil)
	if e != nil {
		t.Fatal("Can't create instance")
	}
	defer inst.Close()
	r, e := inst.NewRequest("GET", "/", nil)
	if e != nil {
		t.Fatal("Can't create request")
	}
	...
	// Your code that uses that request 'r'.
	...
}</pre>

&nbsp;

Now, when you run your test via &#8220;goapp test&#8221;, you&#8217;ll see some new logging similar to when you run &#8220;goapp serve&#8221;.

<pre class="lang:default decode:true  ">jamess-mbp:unittests jamescscott$ goapp test
2014/09/30 16:25:14 appengine: not running under devappserver2; using some default configuration
INFO     2014-09-30 23:25:15,718 devappserver2.py:733] Skipping SDK update check.
WARNING  2014-09-30 23:25:15,718 devappserver2.py:749] DEFAULT_VERSION_HOSTNAME will not be set correctly with --port=0
WARNING  2014-09-30 23:25:15,727 api_server.py:383] Could not initialize images API; you are likely missing the Python "PIL" module.
INFO     2014-09-30 23:25:15,733 api_server.py:171] Starting API server at: http://localhost:60780
INFO     2014-09-30 23:25:15,739 dispatcher.py:186] Starting module "default" running at: http://localhost:60781
INFO     2014-09-30 23:25:15,750 admin_server.py:117] Starting admin server at: http://localhost:60782
INFO     2014-09-30 23:25:16,755 api_server.py:583] Applying all pending transactions and saving the datastore
INFO     2014-09-30 23:25:16,756 api_server.py:586] Saving search indexes
PASS</pre>

&nbsp;

That&#8217;s all folks! Until next time.
