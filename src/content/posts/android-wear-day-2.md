---
title: "Android Wear: Day 2"
description: In the previous post, I suggested that you make the AVDs after making your project for a few reasons. Upon setting up the project, you selected which…
pubDatetime: 2014-07-18T07:12:25Z
tags:
  - android
---

## Setting up the Android Virtual Device

In the previous post, I suggested that you make the AVDs after making your project for a few reasons. Upon setting up the project, you selected which handheld and wear SDK levels you wanted (even though wear only has one level right now). ![Tools menu in Android Studio with Android, then AVD Manager selected](/wp-content/uploads/2014/07/238.png)

Now, you create your AVDs accordingly as specified [here](http://developer.android.com/training/wearables/apps/creating.html). After, creating the AVDs, you&#8217;re ready to go!

Since we are anxious to try the Android emulator out with the Android Wear image, make sure you change the menu beside the green play button to wear then press it. ![Run button in the Android Studio toolbar](/wp-content/uploads/2014/07/415.png)

Kudos: Android Studio / InteliJ interfaces nicely with Mavericks&#8217;s notification system

![macOS notification from Android Studio: Gradle invocation finished, 0 errors, 0 warnings](/wp-content/uploads/2014/07/771.png)

![Android Wear emulator booting, showing the Android logo on a round screen](/wp-content/uploads/2014/07/115.png)

## Android Emulator Starting Up

Unfortunately, I was unable to run the application due to an error. ![Install error: INSTALL_FAILED_OLDER_SDK](/wp-content/uploads/2014/07/511.png)

Did some searching and found out that other people have had the same problem. In this StackOverflow [post](http://stackoverflow.com/a/24487688), they address the problem. but I came up with a simpler solution by just changing the &#8220;compileSdkVersion&#8221; and &#8220;targetSdkVersion&#8221; as seen below.

```css
apply plugin: 'com.android.application'

android {
 compileSdkVersion 20 // James C. Scott edit. original: 'android-L'
 buildToolsVersion "20.0.0"

 defaultConfig {
 applicationId "com.example.jamescscott.helloworldwear"
 minSdkVersion 20
 targetSdkVersion 20 // James C. Scott edit. original: 'L'
 versionCode 1
 versionName "1.0"
 }
 buildTypes {
 release {
 runProguard false
 proguardFiles getDefaultProguardFile('proguard-android.txt'), 'proguard-rules.pro'
 }
 }
}

dependencies {
 compile fileTree(dir: 'libs', include: ['*.jar'])
 compile 'com.google.android.support:wearable:+'
 compile 'com.google.android.gms:play-services-wearable:+'
}
```

After the change, the app should run and you should have hello world! ![Android Wear emulator showing Hello Round World](/wp-content/uploads/2014/07/117.png)

More text
