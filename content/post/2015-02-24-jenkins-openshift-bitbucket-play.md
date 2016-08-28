---
author: James Scott
categories:
- Continous Integration
- Play Framework
date: 2015-02-24T22:52:03Z
guid: http://jamescscott.io/?p=239
id: 239
title: Jenkins + OpenShift + Bitbucket + Play Framework
url: /2015/02/24/jenkins-openshift-bitbucket-play/
---

First post of the new year! I have been very busy. This post will be a non-Golang post actually too. This post is just to help anyone who wants to setup their own free (that&#8217;s right, Free) hosted Jenkins CI Server, hook it up to a private repo and go over some of the GOTCHAs along the way (always some struggles when going the free route).

## Table Of Contents

  * Background
  * Getting Your Jenkins Instance Up
  * Give Jenkins Access To Your Private Bitbucket Repo
  * Your First Manually Triggered Build
  * Setting Up Automatic Builds Upon Push

## Background

I have been experimenting with OpenShift gears because they offer free &#8220;Gears&#8221;. (For those that do not know, RedHat developed OpenShift which is another cloud PaaS. It&#8217;s actually built on top of AWS. With OpenShift, they use the word &#8220;cartridges&#8221;. You select cartridges which setup the environment and runtime for your applications. Then you just deploy your application to it and it runs.) In addition, I&#8217;ve been experimenting with a new side project (which is maintained in a private team repo in Bitbucket) that uses the Play Framework. At some point, I decided to use Continuous Integration for testing and deployment. I started using Codeship (which is a great tool) and I&#8217;ve used wrecker (also awesome) and TeamCity (awesome but have to self host). But there was just one thing that I always missed, I wanted to be in complete control in the long term which means I need to host it myself. As it is a side project, I don&#8217;t want to pay for something that I work on every now and then. OpenShift happened to have a cartridge that deploys a Jenkins instance. I&#8217;ve setup CI before, but being limited to the rules and permissions of OpenShift (e.g. you can&#8217;t read the .ssh folder in own home directory with the Jenkins cartridge) came with a lot of GOTCHAs. This post explains the journey.

## Getting Your Jenkins Instance Up

Create an account on [OpenShift](openshift.redhat.com/app/login).

Create an application and find the &#8220;Jenkins Server&#8221; application.

![](https://jamescscott.io/wp-content/uploads/2015/02/591.png)

&nbsp;

After the application is created, it will show you the password for the admin account. You might want to change it now after logging in the first time via going to https://<your\_jenkins\_ci\_server\_url>.rhcloud.com/me/configure

### Let&#8217;s add one worker to do the builds

Manage Jenkins -> Manage Nodes

![](https://jamescscott.io/wp-content/uploads/2015/02/206.png)

Click on the &#8220;master&#8221; node.

![](https://jamescscott.io/wp-content/uploads/2015/02/299.png)

### Update the plugins

Manage Jenkins -> Manage Plugins.

![](https://jamescscott.io/wp-content/uploads/2015/02/911.png)

Go to the Advanced Tab

<img class="" src="https://jamescscott.io/wp-content/uploads/2015/02/993.png" alt="" width="523" height="466" />

Click the &#8220;Check Now&#8221; at the bottom right and watch the plugins come flowing in.

![](https://jamescscott.io/wp-content/uploads/2015/02/229.png)

Once you update the plugins list, you will see all the plugins that represent the power of Jenkins.

## Give Jenkins Access To Your Private Bitbucket Repo

You need to get the SSH public key from your Jenkins Server so that Jenkins can authenticate with the repo.

Go back into the OpenShift applications Dashboard and click on your application. On the left side you should see this prompt:

![](https://jamescscott.io/wp-content/uploads/2015/02/486.png)

Once you click on it, it will create give you the SSH command. Make sure you setup connection to the instance, RHC and all that other stuff first [here](https://developers.openshift.com/en/getting-started-overview.html).

Now, log into your application. If you try to access .ssh (which contains the public key for ssh), you will get a permission denied (**GOTCHA #1**). Luckily, with some digging around and reading, you can find out that your $OPENSHIFT\_DATA\_DIR is a place where you can read and write and it actually contains a public key for you already&#8230;. Now we just need to make sure Git uses it.

<pre class="lang:sh decode:true">cd $OPENSHIFT_DATA_DIR

mkdir $OPENSHIFT_DATA_DIR/.ivy2
mkdir -p $OPENSHIFT_DATA_DIR/.sbt/boot

chmod 0400 .ssh/jenkins_id_rsa
chmod 0400 .ssh/jenkins_id_rsa.pub
"" &gt; git-ssh-wrapper.sh
chmod 755 git-ssh-wrapper.sh
vim git-ssh-wrapper.sh

###Contents of git-ssh-wrapper.sh####
#!/bin/bash
 
ID_RSA="$OPENSHIFT_DATA_DIR/.ssh/jenkins_id_rsa"
 
ssh -o UserKnownHostsFile=/dev/null -o StrictHostKeyChecking=no -i $ID_RSA $1 $2
</pre>

This tip of this wrapper came from the discussion here: <https://forums.openshift.com/jenkins-stuff> as it seems to be a popular workaround when dealing with OpenShift.

<pre class="lang:default decode:true">cd $OPENSHIFT_DATA_DIR
vim .bash_profile
### Add the following line to the .bash_profile ###
export GIT_SSH="$OPENSHIFT_DATA_DIR/git-ssh-wrapper.sh"


source .bash_profile</pre>

&nbsp;

Log into your Jenkins instance. Go to Jenkins->Manage Jenkins-> Configure System

![](https://jamescscott.io/wp-content/uploads/2015/02/605.png)

Find the Environment Variables Checkbox

![](https://jamescscott.io/wp-content/uploads/2015/02/420.png)

Check it and add:

Name: GIT_SSH

Value: $OPENSHIFT\_DATA\_DIR/git-ssh-wrapper.sh

![](https://jamescscott.io/wp-content/uploads/2015/02/904.png)

If you are using the Play Framework, you&#8217;ll need at least (Scala Build Tool) SBT installed to do testing and building.

Download [it](http://www.scala-sbt.org/) to the $OPENSHIFT\_DATA\_DIR folder and it to your Path by adding another Environment variable for example.

![](https://jamescscott.io/wp-content/uploads/2015/02/844.png)

Now, we made sure Jenkins will use the SSH Key that we have access to and can share with Bitbucket (which will we do next)

Next, run: cat &#8220;$OPENSHIFT\_DATA\_DIR/.ssh/jenkins\_id\_rsa.pub&#8221; and save this public key for the next step while still logged into your instance.

Log into Bitbucket -> Go to the Settings for the particular repo you would like Jenkins to have access to. Go to Deployment Keys (read-only access to the repository)

![](https://jamescscott.io/wp-content/uploads/2015/02/490.png)

Paste in the public key that you just printed to screen a few steps before.

![](https://jamescscott.io/wp-content/uploads/2015/02/287.png)

&nbsp;

## Your First Manually-Triggered Build

If you have not already, create a project for your build by clicking on Jenkins -> New Item

![](https://jamescscott.io/wp-content/uploads/2015/02/391.png)

Note: Create a project name with no special characters or spaces (Useful for next section)

Go down to Source Code Management and select Git. Paste in the URL for your repo.

![](https://jamescscott.io/wp-content/uploads/2015/02/423.png)

&nbsp;

Add a build step

![](https://jamescscott.io/wp-content/uploads/2015/02/741.png)

**GOTCHA #2**

You can not simply put &#8220;sbt test&#8221; for the Play Framework tests with OpenShift. By default, it will try to add some hidden files and folders to your home directory. On our OpenShift instance, we can&#8217;t do that since we don&#8217;t have write access. So we need to tell sbt to write to the OPENSHIFT\_DATA\_DIR that we have write access to.

Instead, use this execute shell command

<pre class="lang:default decode:true ">sbt test -Dsbt.ivy.home=$OPENSHIFT_DATA_DIR/.ivy2 -Divy.home=$OPENSHIFT_DATA_DIR/.ivy2 -Dsbt.boot.directory=$OPENSHIFT_DATA_DIR/.sbt/boot</pre>

&nbsp;

![](https://jamescscott.io/wp-content/uploads/2015/02/928.png)

**GOTCHA #3**

If you have not modified the Testing settings in the build.sbt file, and run the job, it is likely that you will see this message.

<pre class="lang:default decode:true">java.net.BindException: Permission denied
	at java.net.PlainSocketImpl.socketBind(Native Method)
	at java.net.AbstractPlainSocketImpl.bind(AbstractPlainSocketImpl.java:376)
	at java.net.ServerSocket.bind(ServerSocket.java:376)
	at java.net.ServerSocket.&lt;init&gt;(ServerSocket.java:237)
	at java.net.ServerSocket.&lt;init&gt;(ServerSocket.java:128)
	at sbt.ForkTests$$anonfun$mainTestTask$1.apply(ForkTests.scala:35)
	at sbt.ForkTests$$anonfun$mainTestTask$1.apply(ForkTests.scala:34)
	at sbt.std.Transform$$anon$3$$anonfun$apply$2.apply(System.scala:45)
	at sbt.std.Transform$$anon$3$$anonfun$apply$2.apply(System.scala:45)
	at sbt.std.Transform$$anon$4.work(System.scala:64)
	at sbt.Execute$$anonfun$submit$1$$anonfun$apply$1.apply(Execute.scala:237)
	at sbt.Execute$$anonfun$submit$1$$anonfun$apply$1.apply(Execute.scala:237)
	at sbt.ErrorHandling$.wideConvert(ErrorHandling.scala:18)
	at sbt.Execute.work(Execute.scala:244)
	at sbt.Execute$$anonfun$submit$1.apply(Execute.scala:237)
	at sbt.Execute$$anonfun$submit$1.apply(Execute.scala:237)
	at sbt.ConcurrentRestrictions$$anon$4$$anonfun$1.apply(ConcurrentRestrictions.scala:160)
	at sbt.CompletionService$$anon$2.call(CompletionService.scala:30)
	at java.util.concurrent.FutureTask.run(FutureTask.java:262)
	at java.util.concurrent.Executors$RunnableAdapter.call(Executors.java:471)
	at java.util.concurrent.FutureTask.run(FutureTask.java:262)
	at java.util.concurrent.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1145)
	at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:615)
	at java.lang.Thread.run(Thread.java:745)
[error] (test:executeTests) java.net.BindException: Permission denied</pre>

This is due to the testing infrastructure in SBT in which the source can be seen [here](http://www.scala-sbt.org/0.13.2/sxr/sbt/ForkTests.scala.html). As tests are forked, they communicate back to the original process via a socket. However, if you look at the ServerSocket call below, it places 0 which means the OS will give me a socket on whatever port is available. It will give me a port after 1024 (first 1024 are privileged only), however, OpenShift accounts can only get access to ports 15000 &#8211; 35530. So there&#8217;s a mismatch between what the system will give me vs what I have actual access to bind to which causes the problem.

![](https://jamescscott.io/wp-content/uploads/2015/02/672.png)

It makes no sense to compile our own SBT. However, after more reading, there are more options that can be added to the build.sbt which changes the testing infrastructure.

<pre class="lang:scala decode:true ">### Inside the build.sbt ###
import sbt._
import sbt.Keys._

...
...
... Your build stuff ...
...
...

parallelExecution in Test := false

Keys.fork in Test := false
</pre>

Instead of forking a new process to run the tests, the original process will run the tests.

Now time to build!!

Within the project

Click Build Now and you should see it added to the queue.

![](https://jamescscott.io/wp-content/uploads/2015/02/714.png)

Ta-da!

## Setting Up Automatic Builds Upon Push

Felix Leong has a great tutorial for [this](http://felixleong.com/blog/2012/02/hooking-bitbucket-up-with-jenkins).

Begin with the &#8220;Preparing the Jenkins project&#8221; section.

He uses KeePass to generate his key. I used LastPass. You could just blindfold yourself and type a few characters out if you don&#8217;t have a random string generator.

In addition, one more thing has changed. Under his &#8220;Bitbucket + Jenkins = Bliss!&#8221; heading, he mentions &#8220;services&#8221;. As of today, it&#8217;s called hooks. And you want to add a Jenkins hook. The rest of the steps for the services are correct.

Also, make sure your project in Jenkins has no spaces. It simplifies the url when you add the hook url into Bitbucket

![](https://jamescscott.io/wp-content/uploads/2015/02/839.png)

![](https://jamescscott.io/wp-content/uploads/2015/02/473.png)

Now push to your repository, and it should all work!

Hope you enjoyed this article!