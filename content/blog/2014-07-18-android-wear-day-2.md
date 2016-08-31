---
author: James Scott
categories:
- Uncategorized
date: 2014-07-18T07:12:25Z
guid: http://jamescscott.io/?p=84
id: 84
title: 'Android Wear: Day 2'
url: /2014/07/18/android-wear-day-2/
type: "post"
---

### Setting up the Android Virtual Device

In the previous post, I suggested that you make the AVDs after making your project for a few reasons. Upon setting up the project, you selected which handheld and wear SDK levels you wanted (even though wear only has one level right now). ![](https://jamescscott.io/wp-content/uploads/2014/07/238.png)

Now, you create your AVDs accordingly as specified [here](http://developer.android.com/training/wearables/apps/creating.html). After, creating the AVDs, you&#8217;re ready to go!

Since we are anxious to try the Android emulator out with the Android Wear image, make sure you change the menu beside the green play button to wear then press it. ![](https://jamescscott.io/wp-content/uploads/2014/07/415.png)

Kudos: Android Studio / InteliJ interfaces nicely with Mavericks&#8217;s notification system

![](https://jamescscott.io/wp-content/uploads/2014/07/771.png)

![](https://jamescscott.io/wp-content/uploads/2014/07/115.png)

### Android Emulator Starting Up

Unfortunately, I was unable to run the application due to an error. ![](https://jamescscott.io/wp-content/uploads/2014/07/511.png)

Did some searching and found out that other people have had the same problem. In this StackOverflow [post](http://stackoverflow.com/a/24487688), they address the problem. but I came up with a simpler solution by just changing the &#8220;compileSdkVersion&#8221; and &#8220;targetSdkVersion&#8221; as seen below.

<pre class="EnlighterJSRAW" data-enlighter-language="css">apply plugin: 'com.android.application'


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
}</pre>

After the change, the app should run and you should have hello world! ![](https://jamescscott.io/wp-content/uploads/2014/07/117.png)

More text
