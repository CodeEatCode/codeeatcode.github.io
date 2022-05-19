---
title: Journey To The Centre Of The Stack
slug: journey-to-the-centre-of-the-stack
description: Journey to the Centre of the stack - Dockerising the legacy
date: 2020-11-30 11:00:00 +0000
modified: 2022-05-19T11:14:44.023Z
keywords:
  - docker
  - legacy-software
  - modernisation
  - containerisation
  - containerization
tags:
  - docker
  - legacy-software
  - modernisation
  - containerization
---

#### Dockerising the legacy

Making changes to application infrastructure can be daunting at the best of times so when it was decided that we move to the world of containers, I took on a task I didn’t know the depth of, so I am going to share my experience of getting my hands dirty.

At the time, I was new to docker but very interested in the technology, as technology folks, we all love a shiny new toy to play with. Apart from that the advantages and thus the reasons for so are listed as follows in no particular order:

- Introducing speedier changes and testing ideas faster
- Infrastructure as code
- Simplify application/tech stack
- Be cloud-friendly

<!--truncate-->

## Legacy Stack

Where working with the difficulty of releasing changes in the current environment that are potentially outdated, have no tests and no real dependency management, installing the dependencies and developing newer features can be a considerable effort.

The monster you could be working with may consist of the spaghetti of many applications running outdated technology.

## Doing the dirty work

I would, of course, start with looking at the stack diagram of sorts or create one if there’s isn’t one already and identify common things between the applications. If you have more than one application that shares a lot of common things such as language, set of libraries, webserver and OS, then extract this to a base image that each application can build on and extend.

For example, what tripped me when I tested one of the apps where file upload functionality failed because the file size was larger than the one allowed. So take care to look through configs of environments & language etc.

## Environment Variables

These will be your friend when dockerising an application so I would identify various things such as follows

- File storage paths e.g. for static assets
- URLs
- Secrets

Furthermore, environment variables helped me greatly in maintaining compatibility via feature flags as I wanted to maintain compatibility between the current environment and the potential new docker environment.

## File paths

Extract these paths across the applications and move to constants or move them to environment variables. So if you have a path dependency on e.g. **_/tmp_** this could be moved to an environment variable named **TMP_PATH,** making it configurable which can be supplied when the container is run.

In reality, you’ll likely be running multiple instances of the same container so changing this in favour of persistent storage via Kubernetes or Docker volumes would be better to allow access to any stored files to any multiple running instances. If you have the option, move files to S3 buckets or similar e.g. Min.io.

## Extract secrets

Extract any secrets e.g. API Keys to Docker/Kubernetes secrets, these could be stored in your favourite secrets management solution. Although initially, you may not have an established secrets management solution, so moving these to environment variables temporarily would allow you to get on with the job at hand.

## Logging mechanism

If you’re dockerising a legacy application then you’ll likely more than one process doing some important work e.g. Apache/Nginx logs, application logs, cron logs. These may also be writing to multiple different log files.

In suggested practice, it’s best to write to the standard output stream to see a combined view although you’ll want to differentiate between logs of different kinds. This can be done with a centralised logging solution for later.

## Language versions

This applies to any language but picking a ready-built official Docker image will go a long way to simplifying your life. Failing that, if nothing is available then look to build the language from the source on the closest os version. It should minimise any compatibility differences.

## Web Server

Keep to the same web server and the same version where possible.

## Session storage paths

Try to opt for a unified storage for sessions for example Database backed sessions otherwise try to go for a unified file path using persistent storage mounts.

## Access to other web services

Be mindful of how your application talks to another in your network. Whether this is via DNS or by hardcoded IP, you’ll want to change this to access this service by service name. The address should be extracted to an environment variable also to allow for configuration.

## How to test changes as you refactor?

If you’re lucky enough to have various types of tests for your application then keep running tests every so often while you make changes. Either run these locally or if you have a CI server setup to build your image and test on every push then that’s great.

Failing that, test the area/feature you’re refactoring by running the application with some dummy data.

## Reverse Proxying

Use a reverse proxy such as Nginx/HA Proxy/Traefik to act as an ingress controller for requests.

## SSL Termination

Important to figure this one when you consider yourself done with Dockerisation, as this may not be your biggest problem initially where you run one container in isolation.

One gotcha with this will be when, say, you go to production where your ingress is using a reverse proxy or a load balancer then if your application sets secure cookies, they may not be transmitted to the browser to be stored if you’re not using SSL with your app.

![SSL Termination Nginx](https://www.nginx.com/wp-content/uploads/2014/04/nginx-decrypts-https-traffic.png)

Shamelessly borrowed from [https://www.nginx.com/blog/nginx-ssl/](https://www.nginx.com/blog/nginx-ssl/)

## Cronjobs

If you plan on using Kubernetes then it allows you to schedule workloads that can be scheduled using a cronjob like syntax. Please see more details here: [https://kubernetes.io/docs/tasks/job/automated-tasks-with-cron-jobs/](https://www.nginx.com/blog/nginx-ssl/)

## File permissions

Container’s file permissions get copied from the host machine’s file system while building images so be mindful when building them on environments implementing the least privilege principle on the filesystem.

So when you COPY or ADD files, you can use the following

    COPY [--chown=<user>:<group>] <src>... <dest>

## Summary

I may have glossed over a few things but I would like to say that no matter how much I share, your own journey will give you a great bit of experience and hope I’ve shared some gotchas that may be of some help. So dive right in but with some consideration :-)

Thanks for sticking with me.
