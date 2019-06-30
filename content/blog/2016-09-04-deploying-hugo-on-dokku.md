---
author: James Scott
categories:
- Hugo
- Dokku
date: 2016-09-04T20:56:20-04:00
title: Deploying Hugo On Dokku
url: /2016/09/04/deploying-hugo-on-dokku/
type: "post"
featured: blog-content/2016/09/Future-Imperfect-Screenshot.png
---

## The Move From Wordpress to Hugo

This was a long time coming. As mentioned in my previous
[post](/2016/09/03/new-blog-new-server/), I used Wordpress as my blogging
platform. My hosting service was up for renewal, I decided against that and
moved to DigitalOcean. I decided to deploy Dokku (more on that in another post)
so that I could manage multiple apps easily. One of those apps is my blog which
I decided it will use Hugo to generate my website from markdown.

Here is my journey.

## Theme and Requirements Met
Hugo is a static site generator. I quickly found a theme I liked. The [Future
Imperfect theme by Julio Pescador](http://themes.gohugo.io/future-imperfect/).

![](/img//blog-content/2016/09/Future-Imperfect-Screenshot.png)

This theme had two major components built in.

1. Ability to comment on articles (via Disqus)
1. Google Analytics (data is always good!)

## Migrating current posts

There is a tool to migrate straight from Wordpress to Hugo. It didn't work for
me exactly. Instead, I exported my site as a Jekyll website then used Hugo to
convert to a Hugo site. (Should've documented this more but it happened so fast
and so early in the process.)

One thing I had to do manually was export my Wordpress `pages` I wanted such as
my About Me page. In addition, all of my non-published / draft blogs were not
exported. I didn't bother to copy those over though.


## ! [remote rejected] master -> master (pre-receive hook declined)

I received this error when ever I tried to deploy my blog to Dokku.
This error made no sense to me. I could deploy the sample Rails app which needed
a database to even function but I couldn't deploy a static site. What????

I saw a lot of issues like this
[one](https://github.com/dokku/dokku/issues/2154) which mentioned Dokku not
liking submodules now / submodules being a special case / submodules finally
working now / etc. Theoretically, I did not use git submodules because I didn't
use the `git submodule` command nor had a `.gitmodules` file. But I did have a
git repository within another repository. In actually, I learned that was the
problem.

### Problem

It all happened because of this:

```sh
mkdir themes
cd themes
git clone https://github.com/jpescador/hugo-future-imperfect.git
```

For those unfamiliar with Hugo. The way to get a theme is by cloning it into
your `themes` folder. Dokku loses it when trying to figure out what to do.

### Solution

I had to remove the whole themes folder. Then I ran this instead:

```sh
git submodule add https://github.com/jpescador/hugo-future-imperfect.git themes/hugo-future-imperfect
```

This generates the `.gitmodules` file. And Dokku, will finally accept the push.
It wouldn't deploy yet (now got `Unable to detect buildpack`) but at least I
can determine what was going on.

## Unable to detect buildpack

### Problem
For Hugo sites, you aren't supposed to commit your built files to version
control. But with Dokku, it only takes what you have in your Git repository and
works from there. There is no official buildpack for building and serving Hugo
sites to Dokku. I actually had an idea of this problem due to my experience with
Heroku and Cloud Foundry.

### Solution
I quickly found a buildpack for [Hugo](https://github.com/roperzh/heroku-buildpack-hugo).
Plugged it in and it didn't work. It was a permission issue for the scripts.
I found a [fork](https://github.com/AlexSnet/heroku-buildpack-hugo) that had
fixed the issue.

It worked. The buildpack used Hugo to both build and serve the website.
However, it wasn't using the latest version of Hugo. I decided to
[fork it](https://github.com/jcscottiii/heroku-buildpack-hugo) and update it.

Then, I found out that Hugo really acts like it's in dev mode when you use
`hugo server`, without passing very specific flags like `baseURL`, even though
you have a config file. `baseURL` is necessary so that the social links will be
right (instead of using `localhost`). I could have modified the command line to
pass in very app specific flags but then the buildpack wouldn't useful to other
apps. Instead of doing that, [I removed the `hugo server`](https://github.com/jcscottiii/heroku-buildpack-hugo/commit/48c37f0c64af9d8c1ad033e8d615faba425da82e).
The plan now is to just use the Hugo buildpack to build the site and then to use
the official NGINX buildpack to serve the static site.

In order to get this to work, I had to create a custom NGINX config. To point
the root to `/app/www/public`.

## Let's Encrypt
The Let's Encrypt [plugin](https://github.com/dokku/dokku-letsencrypt) is really
easy to setup HTTPS for the site. Once setup, it will auto-renew the certs.
In addition, it will cause your app to automatically redirect to the HTTPS
scheme. I'll talk more about this when I talk about automating my whole
infrastructure.

## Next Steps:
I'm still working through some hiccups. For example if you don't add the trailing
slash to some URLs, NGINX will do it but also add the port number of the
container and it just ends badly.

Also, I need to setup continuous delivery for the blog as well.

[You can checkout the repo for this blog as well](https://github.com/jcscottiii/jamescscott.io)
