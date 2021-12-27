---
author: James Scott
categories:
- Initial Thoughts
date: 2014-07-10T21:20:06Z
tags:
- Initial Thoughts
- Linksys
- Reviews
- WRT1900AC
title: 'Initial Thoughts: WRT1900AC'
url: /2014/07/10/initial-thoughts-wrt1900ac/
type: "post"
---

My landlord was gracious enough to provide Internet for all tenants. The service comes through AT&T&#8217;s DSL. Before moving to California, I personally have never had DSL. For all of my adult life, I have used Cable Internet.

The speeds of DSL have never been as fast as what to I&#8217;m used to but can&#8217;t complain about free.

However, as myself and many other tenants started to add more devices to the network, our wireless network started to act weird. Finally fed up with it, I decided to take matters in to my own hands and upgrade the hardware..

### Problem

Started to do some investigation. I sat by the Modem/Router combo during one of the flaky outages for maybe 5-10 mins to see if I could get any weird behavior from the lights. According to the lights, the wireless would just turn off. I correlated this to around 8pm when everyone would happen to be home thus there had to be some stress on the wireless network that the router couldn&#8217;t handle.

Did some research on the modem / router combo. The Modem / Router is by 2Wire. Model: 3600HGV: <http://www.amazon.com/AT-2Wire-3600HGV-Gateway-Wireless>

There were many complaints that the wireless was very flaky. All experiencing the same problem.

  * <http://forums.att.com/t5/Setup-and-Self-Install/No-Wireless-on-3600HGV/td-p/3257303>
  * <http://forums.att.com/t5/Residential-Gateway/Gateway-3600HGV-Wireless-green-light-not-on-and-can-t-connect/td-p/3394781>
  * <http://forums.cnet.com/7723-7585_102-532139/2wire-modem-keeps-disconnecting-my-wifi-from-all-devices/>

&nbsp;

The wifi would break and stop broadcasting altogether.

However, by the time I read all the complaints and the possibility of receiving some replacement lack luster product from AT&T still had to be paid for, I decided to take matters into my own hands. I bought the <span style="text-decoration: underline;"><em>Linksys WRT1900AC</em></span>.

### WRT1900AC

I owned a WRT54G growing up.

![](/wp-content/uploads/2014/07/361.png)

Didn&#8217;t know much about networking aside from what I read online. I did however install [DD-WRT](http://www.dd-wrt.com/wiki/index.php/Linksys_WRT54G_v2.0). Gave me great flexibility compared to the stock firmware. I just remember ramping up the WIFI signal strength and logging in a lot to set up port forwarding for some video games. But I&#8217;m sure there&#8217;s much more that could&#8217;ve been done.

I&#8217;ve read many blogs about the WRT1900AC. Many great speculations about this modern WRT54G. Linksys is clearly appealing to the network hobbyists with the similar blue hue as the predecessor.

![](/wp-content/uploads/2014/07/277.png)

Upon setting up the router, if it has internet access, you will setup the Linksys Smart Wifi system.

![](/wp-content/uploads/2014/07/947.png)

This will allow you to administer your router from within the network or via Linksys Smart Wifi Web App / Mobile App. Which is a huge bonus in my opinion.

![](/wp-content/uploads/2014/07/701.png)Web App

<img src="/wp-content/uploads/2014/07/321.png" alt="" width="294" height="441" />

iOS App

After setting up the 2.4 GHz network (SSID-Name) and 5 GHz (SSID-Name_5GHz) network, I realized one thing. Not all of my devices can use the 5 GHz. Examples include my iPhone 4s (yes, expect a blog about a new phone, whenever I upgrade) and my Chromecast which both can only use 2.4 GHz while my Macbook Pro can see both networks. However, I can still cast content from my Macbook Pro on the 5 GHz network to the Chromecast on the 2.4 GHz network.

### My Setup

<http://www.sbbala.com/uverse/> does a great job in explaining everything.

I chose the &#8220;[Use the RG as a modem option](http://www.sbbala.com/uverse/pg2.html)&#8220;.

Plug one end of the ethernet cord into the WAN port on the WRT1900AC.

Plug the other end into one of the ethernet ports in the 3600HGV.

Log into the 3600HGV&#8217;s admin site and go to Settings &#8211;> Firewall &#8211;> Applications, Pinholes and DMZ.

![](/wp-content/uploads/2014/07/633.png)

Select the router under the list of computers.

![](/wp-content/uploads/2014/07/207.png)

Allow all inbound traffic.

### Results

Very simple. Now both the networks from the 2Wire Router and the WRT1900AC can coexist.

I told a fellow tenant that if her and her boyfriend still have any problems on the old network, she could let me know and I will give them access to my network. (I already setup the Guest Network just in case if she wanted the details then.)

The installment of the Linksys router was completed on June 26th. Now it&#8217;s July. Haven&#8217;t heard any complaints from the fellow tenants (I was really hoping that I didn&#8217;t mess anything up when I was working with the 3600HGV).

### Conclusion

I&#8217;m still limited to the horrible speed of AT&T. But I can say wireless networking is solid. Prior to upgrading to using the WRT1900AC, simple internal networking like using the Chromecast was infeasible. It would not last at all. Now I can use my Chromecast with no hiccups.

I haven&#8217;t dug deep into the potential but I&#8217;m sure there&#8217;s more (has been advertised that you can use DD-WRT and OpenWRT). A future blog post to follow when I get a chance about that!

I&#8217;m really excited to own the WRT1900AC
