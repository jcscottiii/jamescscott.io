---
author: James Scott
categories:
- Dokku
- Terraform
- DigitalOcean
date: 2016-09-03T19:28:06-04:00
title: New Blog, New Server
url: /2016/09/03/new-blog-new-server/
type: "post"
---

## New Blog, New Server

My Wordpress blog is long gone! Hello, [Hugo](https://gohugo.io/)! This post is
the beginning. This will be one part of the series that describe my new
deployment onto DigitalOcean. Still working out some kinks but rather document
what I have while it's still fresh.

## Back Story

Previous to using DigitalOcean, I used InMotion Hosting. In particular,
I used their `Power Plan`. The plan was just a shared hosting plan with a bunch
one-click apps. The only bad thing was, I didn't really have a use for those
other apps besides Wordpress. Also, I couldn't use Let's Encrypt for free certs.
Finally, my subscription was up at the end of August and I received a notice
of renewal for $200+ for a two year extension. (The first time I paid for it,
it was not as much because of a promotion either.) Thus, I figured, I needed
to move.

## Plan

### For Infrastructure: [DigitalOcean](https://www.digitalocean.com/)

![](/blog-content/2016/09/DigitalOcean.png)

- More control than what I had before.
- At the time, there was a way to get $35 of credit.
  1. Use someone's referral code like [mine](https://m.do.co/c/6045ce367053) to get $10.
  1. Create a CodeAnywhere [account](https://codeanywhere.com). Upon creating an account there, you will see a Connection Wizard and there will be an option for `DigitalOcean`. After clicking there, you will see an option for getting a promo code.
  1. Both of the codes will not work, upon signing up. You will need to submit a ticket for the other. DigitalOcean's support is really helpful and quick to add the other code to your account.


### For infrastructure management: [Terraform](https://www.terraform.io/)

![](/blog-content/2016/09/Terraform.png)

- I really love the idea as infrastructure-as-code and Hashicorp's Terrafrom
tool is something I have been wanting to dive into more.
- I want to be able to provision everything and tear everything down at the drop of a dime with a single command.
- When I say provision, I mean, create the droplet, secure it, configure my domains, deploy my apps and databases (include backups).
- When I say tear down, I mean backup the databases, remove the apps, and destroy the droplet.


### For deploying apps: [Dokku](http://dokku.viewdocs.io/dokku/)

![](/blog-content/2016/09/Dokku.png)

Dokku is a Platform as a Service (PaaS) for a single node. A PaaS makes it easy
to deploy apps by removing the burden of having to configure the infrastructure
for every app. Theoretically, it allows you to easily scale as well (Dokku is a
  slightly different case).

Pros of Dokku:
- Simple to setup
- Can run on one droplet (less money than running a real platform as a service)
- Nice plugins (e.g. Let's Encrypt for SSL certs for all the apps.)

Cons of Dokku:

  - Not really scalable but I don't need something too scalable.

I looked at alternative PaaSs and also Orchestrators.

[Kubernetes](http://kubernetes.io/): _The_ Container Orchestrator

- This is where all the buzz is at. I wanted to do this.
- Too expensive to setup for my needs.
  - Need multiple droplets
- DigitalOcean has no official instructions on how to do this.
  - People in the community have done this but found it dated or incomplete.

[Flynn](https://flynn.io/)

- Minimum infrastructure needs are similar to Kubernetes, which brings about cost.

[Deis](https://deis.com/)

- v2 uses Kubernetes. Cost.


## Next Steps

I will be making a blog post series about this whole process. More to come. Stay tuned!!
