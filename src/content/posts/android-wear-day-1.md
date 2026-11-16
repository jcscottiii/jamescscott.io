---
title: "Android Wear: Day 1"
description: This post is the beginning of a mini-series of developing for Android Wear. This post will focus on setting up your environment for initial development with…
pubDatetime: 2014-07-04T02:03:51Z
tags:
  - android
---

This post is the beginning of a mini-series of developing for Android Wear. This post will focus on setting up your environment for initial development with Android Studio. As someone who loves tinkering with new things, I was very anxious to try out the new Android Wear SDK especially after I received my e-mail notification from Motorola about the Moto 360. ![Motorola email announcing the Moto 360 smartwatch](/wp-content/uploads/2014/07/590.png)

## In This Part of The Series&#8230;

I will describe just the the steps of setting up your environment to develop Android Wear Apps.

## Android Studio Setup

To start developing Android Wearable Apps, you need 1) Android Studio and 2) Gradle.

1. Android Studio is Google&#8217;s new highly favored child of an IDE that builds on top of IntelliJ.
2. Gradle is the new build system. Previously, Ant was used.

Android Studio As of this writing, Android Studio was only at v0.8.0. I&#8217;m installing it on Mac OS X Mavericks. Go to <http://developer.android.com/sdk/installing/studio.html> Pleasantly enough, you download a DMG file. Just drag it into your Applications folder and you&#8217;re good to go! ![Dragging Android Studio into the Applications folder on macOS](/wp-content/uploads/2014/07/648.png)Quick side note: From the beginning, Google is trying to make the whole experience of development easier. Of course, seasoned developers would overlook this difference. However, I really see this very small change beneficial to first time programmers  and / or youth. (Compared to using Eclipse which just comes in a zip file and you have fish for the Eclipse executable) ![Android Studio splash screen](/wp-content/uploads/2014/07/430.png)Upon opening, there&#8217;s a notification saying to update. ![Android Studio welcome screen with an update available notice](/wp-content/uploads/2014/07/954.png)After going to the change log, <http://tools.android.com/recent>, it seems like a very important update. This update  (0.8.1) brings the Android L Preview, Support for Wear and TV, and many other things. Even though it prompts you that an update is available, you need to still go check for updates yourself. ![Android Studio menu with Check for Updates selected](/wp-content/uploads/2014/07/203.png) ![Update Info dialog offering Android Studio 0.8.1](/wp-content/uploads/2014/07/497.png)Update and restart&#8230;

<h3>
  Getting Started
</h3>

Google has a nice little tutorial here: <http://developer.android.com/training/wearables/apps/creating.html> Found their lesson to be a little out of order. ![Android Wear training lesson list: set up an emulator, set up a device, create a project, include the correct libraries](/wp-content/uploads/2014/07/346.png)From here, start following the tutorial on the website. I&#8217;m just going to note some changes I experienced..

<ul>
  <li>
    Instead of setting up an emulator and device, I created the project first.
  </li>
  <li>
    Kudos to Google letting the developer know how many devices can be targeted by choosing a specified API Level <img alt="New project wizard with minimum SDK set to API 19, Android 4.4 KitKat" src="/wp-content/uploads/2014/07/405.png" />
  </li>
  <li>
    I used Phone and Tablet API Level 19. <ul>
      <li>
        Defaulted all the following screens.
      </li>
    </ul>
  </li>

  <li>
    <span>After finishing, it took awhile but to build, but eventually everything came up. However, there were errors.</span><img alt="Android Studio error: project sync failed" src="/wp-content/uploads/2014/07/322.png" />
  </li>
  <li>
    <span>In the &#8220;Messages Gradle Sync&#8221; window, you can install the repo and sync project.</span><img alt="Gradle error: failed to find play-services-wearable, with a link to install the repository" src="/wp-content/uploads/2014/07/730.png" />
  </li>
  <li>
    Upon following the instructions, still no luck. Finally, upon adding the repo as reported in [http://stackoverflow.com/a/24442494](http://stackoverflow.com/a/24442494), it works. Afterwards, do the following: <ol>
      <li>
        Go to SDK Manager <img alt="SDK Manager button in the Android Studio toolbar" src="/wp-content/uploads/2014/07/548.png" />
      </li>
      <li>
        Install the missing tools / SDK Platforms for your API  Levels. <img alt="Android SDK Manager with Android 4.4W (API 20) packages selected for install" src="/wp-content/uploads/2014/07/855.png" />
      </li>
      <li>
        My final list of installed packages is as follows. (assuming Target Handheld is API Level 19 and Target Wear is API 20) <img alt="Android SDK Manager listing the installed tools, platforms, and extras" src="/wp-content/uploads/2014/07/122.png" />
      </li>
    </ol>
  </li>
</ul>

Other Materials: <http://developer.android.com/training/building-wearables.html> In the next part of the series, we get things up and running!
