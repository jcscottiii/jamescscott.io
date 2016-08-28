---
author: James Scott
categories:
- Android
date: 2014-07-04T02:03:51Z
guid: http://jamescscott.io/?p=7
id: 7
tags:
- Android
- Android Studio
- Android Wear
- Series
- Setup
title: 'Android Wear: Day 1'
url: /2014/07/04/android-wear-day-1/
---

This post is the beginning of a mini-series of developing for Android Wear. This post will focus on setting up your environment for initial development with Android Studio. As someone who loves tinkering with new things, I was very anxious to try out the new Android Wear SDK especially after I received my e-mail notification from Motorola about the Moto 360.  ![](https://jamescscott.io/wp-content/uploads/2014/07/590.png)<!--more-->

### In This Part of The Series&#8230;

I will describe just the the steps of setting up your environment to develop Android Wear Apps.

### Android Studio Setup

To start developing Android Wearable Apps, you need 1) Android Studio and 2) Gradle.

  1. Android Studio is Google&#8217;s new highly favored child of an IDE that builds on top of IntelliJ.
  2. Gradle is the new build system. Previously, Ant was used.

Android Studio As of this writing, Android Studio was only at v0.8.0. I&#8217;m installing it on Mac OS X Mavericks. Go to <http://developer.android.com/sdk/installing/studio.html> Pleasantly enough, you download a DMG file. Just drag it into your Applications folder and you&#8217;re good to go!  ![](https://jamescscott.io/wp-content/uploads/2014/07/648.png)Quick side note: From the beginning, Google is trying to make the whole experience of development easier. Of course, seasoned developers would overlook this difference. However, I really see this very small change beneficial to first time programmers  and / or youth. (Compared to using Eclipse which just comes in a zip file and you have fish for the Eclipse executable)  ![](https://jamescscott.io/wp-content/uploads/2014/07/430.png)Upon opening, there&#8217;s a notification saying to update.  ![](https://jamescscott.io/wp-content/uploads/2014/07/954.png)After going to the change log, <http://tools.android.com/recent>, it seems like a very important update. This update  (0.8.1) brings the Android L Preview, Support for Wear and TV, and many other things. Even though it prompts you that an update is available, you need to still go check for updates yourself.  ![](https://jamescscott.io/wp-content/uploads/2014/07/203.png) ![](https://jamescscott.io/wp-content/uploads/2014/07/497.png)Update and restart&#8230;

<h3 style="color: #1e4e79;">
  Getting Started
</h3>

Google has a nice little tutorial here: <http://developer.android.com/training/wearables/apps/creating.html> Found their lesson to be a little out of order.  ![](https://jamescscott.io/wp-content/uploads/2014/07/346.png)From here, start following the tutorial on the website. I&#8217;m just going to note some changes I experienced..

<ul style="font-size: 16px; line-height: 1.5;">
  <li>
    Instead of setting up an emulator and device, I created the project first.
  </li>
  <li>
    Kudos to Google letting the developer know how many devices can be targeted by choosing a specified API Level <img src="https://jamescscott.io/wp-content/uploads/2014/07/405.png" alt="" />
  </li>
  <li>
    I used Phone and Tablet API Level 19. <ul>
      <li>
        Defaulted all the following screens.
      </li>
    </ul>
  </li>
  
  <li>
    <span style="font-size: 16px; line-height: 1.5;">After finishing, it took awhile but to build, but eventually everything came up. However, there were errors.</span><img style="font-family: inherit; font-style: inherit; font-weight: inherit; line-height: 1.5;" src="https://jamescscott.io/wp-content/uploads/2014/07/322.png" alt="" />
  </li>
  <li>
    <span style="font-size: 16px; line-height: 1.5;">In the &#8220;Messages Gradle Sync&#8221; window, you can install the repo and sync project.</span><img style="font-family: inherit; font-style: inherit; font-weight: inherit; line-height: 1.5;" src="https://jamescscott.io/wp-content/uploads/2014/07/730.png" alt="" />
  </li>
  <li>
    Upon following the instructions, still no luck. Finally, upon adding the repo as reported in <a href="http://stackoverflow.com/a/24442494">http://stackoverflow.com/a/24442494</a>, it works. Afterwards, do the following: <ol>
      <li>
        Go to SDK Manager <img src="https://jamescscott.io/wp-content/uploads/2014/07/548.png" alt="" />
      </li>
      <li>
        Install the missing tools / SDK Platforms for your API  Levels. <img src="https://jamescscott.io/wp-content/uploads/2014/07/855.png" alt="" />
      </li>
      <li>
        My final list of installed packages is as follows. (assuming Target Handheld is API Level 19 and Target Wear is API 20) <img src="https://jamescscott.io/wp-content/uploads/2014/07/122.png" alt="" />
      </li>
    </ol>
  </li>
</ul>

Other Materials: <http://developer.android.com/training/building-wearables.html> In the next part of the series, we get things up and running!