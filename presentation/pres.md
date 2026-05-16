# Introduction – Self-Hosted Cloud Implementation

## Slide 1 - Title

**Self-Hosted Cloud Implementation**
Hugo Claveille
Master 1 Computer Science
DS4H Project
date

---

Hello everyone.
Today I’m going to present my DS4H project called  *Self-Hosted Cloud Implementation.*

The main objective was to explore and evaluate an infrastructure to replace the Render service.

---

## Slide 2 - Plan

1. #### Introduction
2. #### State of the art & solution selection
3. #### Infrastructure & deployment
4. #### Methodology
5. #### Scaling experiments
6. #### Discussion & conclusion

---

Here’s the plan for this presentation.

First, I will introduce the context and motivation for this project. 

Then, I will give a quick overview of the state of the art in cloud computing and how I selected the solution.

Next, I will describe the infrastructure I set up and how deployments work.

Then i will explain the methodology behind the scaling experiments.

After that, I will share the results of the experiments I conducted.

Finally, I will discuss the implications of this project and conclude with some final thoughts.

---

## Slide 3 - Introduction

Image render
Image horloge

Goal: **self-hosted alternative** — abstraction · isolation · multi-user · CI/CD

---

### Contexte

The IoT course is currently using Render to let students deploy their applications.
The problem is that Render is an external service — which means we depend on a third party for availability and pricing.

On top of that, Render has a well-known issue: on free tier, services go to sleep after inactivity, and take up to 30 seconds to wake up, which is quite annoying in a classroom setting.

### Goal

So the goal of this project was to replace it with a self-hosted solution that we fully control — one that can abstract the infrastructure, isolate applications, handle multiple users, and automate deployments.

### Why it matters

---

## Transition

Now that we understand the problem, let me give a bit of background on the technologies involved — and then walk you through how I selected the solution.

---

## Slide 4 — State of the Art: Abstraction & Remote Access

Since the beginning of computing, abstraction has been a key concept
1960s: "computer utility" — computing power as a service (Multics)
1940s→: remote access to computing resources by George Stibitz

Image de Multics
espece de frise chrono

---

The idea of abstracting computing resources is not new. As early as the 1960s, systems like Multics introduced the concept of a computer utility — (where computing power would be consumed like electricity, so on demand. )

Around the same time, the idea of accessing machines remotely emerged, George Stibitz demonstrated remote control of a computer as early as 1940. These early concepts laid the foundation for what we now call cloud computing."

---

## Slide 5 — State of the Art: Cloud Models & Containerization

---

IaaS / PaaS / SaaS — layers of abstraction
Public / Private / Hybrid cloud
Containers — lightweight isolation, shared kernel, portable
Docker
<!-- DevOps / IaC — Git push → build → deploy -->

---

These concepts evolved into the cloud models we know today. 

IaaS as Infrastructure as a Service gives you raw infrastructure, 
PaaS as Platform as a Service gives you a deployment environment, 
SaaS as Software as a Service gives you a full application. 

And deployments can be public, where the infrastructure is owned by a third party,
Private, where you own the infrastructure,
or hybrid, which is a mix of both.

The key enabling technology is containerization 
Docker in particular 
which allows multiple isolated apps to run on a single machine. 

Combined with DevOps practices, a simple git push can trigger an automatic build and deployment. 
These are exactly the properties we want for our self-hosted platform.

---

## Transition

Before comparing solutions, let me define what we actually need.

---

## Slide 6 — Our Needs

Web UI — students are not sysadmins
Git integration — push to deploy
Multi-user — isolate projects per student
Low resource footprint — single constrained machine
Monitoring & logging — track usage and troubleshoot
Easy to maintain — one person, one machine

---

First, a web interface
students are not sysadmin, they can't work exclusively with a command line (only). 

Second, Git integration 
a push to a repository should trigger an automatic deployment.  

Third, multi-user support — each student needs their own isolated space. 

Fourth, the solution must run on a single machine with limited resources. 

And finally, it needs to have monitoring and logging capabilities to track usage and troubleshoot issues.
<!-- And finally, it needs to be easy to maintain, because there's only one person managing the whole platform. -->

---

## Slide 7 — Infrastructure & Constraints

Single VPS — Debian 12
2 vCPU · 4.2 GB RAM · 25 GB storage
<!-- ~1.5 GB RAM available under normal conditions -->
No automatic elasticity — manual upgrade only

Image : le truc stylé généré par claude

---

The entire project runs on a single VPS running Debian 12. 

It has 2 virtual CPUs, 4.2 gigabytes of RAM, and 25 gigabytes of storage. 

<!-- In practice, only about 1.5 gigabytes of RAM are freely available under normal conditions.  -->

And unlike a public cloud, there is no automatic elasticity
if we need more resources, we have to manually request an upgrade. 

<!-- This is a hard constraint that directly influenced which solutions were viable. -->

---

## Transition

To resume we now know that we need a Pass with ????

So let se what posibilities do we have

---

## Slide 8 — Solutions Comparison

| Solution | Web UI | Multi-user | Git deploy | Resources |
|---|---|---|---|---|
| OpenStack | ✓ | ✓ | ~ | Too heavy |
| k3s | ~ | ~ | ~ | Medium |
| Dokku | ✗ | Limited | ✓ | Low |
| CapRover | ✓ | Limited | ✓ | Low |
| Coolify | ✓ | ✓ | ✓ | +20 GB |
| **Dokploy** | ✓ | ✓ | ✓ | **Low** |

---

I evaluated six solutions against our needs and constraints. 
OpenStack was too complex as a first approach.
k3s, the lightweight Kubernetes distribution, is technically viable but introduces unnecessary orchestration complexity. 
Dokku has no web interface. 
CapRover has limited multi-user support. 
Coolify ticks all the boxes but requires over 20 gigabytes of storage. 
That leaves Dokploy — it is an open-source, comunity-driven PaaS built on top of Docker.
it has a web interface, full multi-user support, native Git integration, and a low resource footprint. It was the clear choice.

---

## Slide 9 — How Dokploy Works

Docker — containerizes and isolates each application
Traefik — reverse proxy, routes traffic, handles SSL automatically
Docker Swarm — orchestrates containers, handles restarts
Web UI — single dashboard to manage everything

Schéma : Internet → Traefik → Container 1 / Container 2 / Container 3

---
 <!-- A RELIRE ET VOIR SI C'EST INTERESSANT -->
Dokploy is built on top of three core technologies. 
First, Docker — every application is packaged and run as a container, which ensures isolation between apps. 
Second, Traefik — a reverse proxy that sits in front of all containers, routes incoming traffic to the right app, and handles SSL certificates automatically. 
Third, Docker Swarm — the orchestration layer that manages containers, ensures they stay running, and handles restarts if something crashes. 
On top of all this, Dokploy provides a single web dashboard to manage deployments, users, logs and configurations.

---

## Slide 10 — Deploying the Test App

RNN server — MNIST digit classifier exposed as a REST API
POST /predict · GET /metrics · POST /upload
Pipeline : Git push → Dokploy builds image → Traefik exposes URL

Schéma : GitHub repo → Dokploy → Docker container → rnn.dokploy.claveille.fr

---

To evaluate Dokploy, I needed a real application to deploy. 

I took a digit classification server based on a neural network trained on the MNIST dataset
It exposes a REST API with endpoints to predict digits from images, retrieve system metrics, and upload new models. 

<!-- C'est quoi mnist ? -->

The deployment pipeline is fully automated: 
I first had to write a Dockerfile to containerize the application, and a requirements.txt file to specify dependencies. 

Then, I push all the files to a GitHub repository, Dokploy detects the change, builds the Docker image from the Dockerfile, and Traefik exposes the service at a public URL. 
No manual intervention needed on the server, except for the initial setup.

---

## Slide 11 — [Chapter] Scaling Experiments
(slide de transition — juste le titre du chapitre)

---

"Now let's get into the core of the project — the scaling experiments. I ran four experiments to evaluate how well Dokploy handles increasing load."

---

## 12 — Performance Under Load

1 replica, stress test with increasing number of workers
Single instance uses ~50% CPU · ~70% RAM
Latency grows with workers → server saturates quickly

Graphe : latence moyenne + p95 en fonction du nombre de workers

---

The first experiment was simply to measure the performance of a single instance under load. 

I some stress tests by sending classification requests with an increasing number of parallel workers.
A worker is an independent thread that sends requests to the server — so more workers means more concurrent requests.

The results were clear — a single instance already consumes around 50% of the available CPU and 70% of the RAM. 
As the number of workers increases, latency grows significantly, which means the server starts queuing requests. 

This illustrates the limits of our infrastructure — with a single instance, we saturate quickly.

---

## Slide 13 — Horizontal Scaling

Schema 2 replicas avec traefik

---



---

## Slide 13 — Horizontal Scaling

1 → 2 → 3 replicas, 10 workers, 100 requests
2 replicas: latency ↓ 1458ms → 899ms ✓
3 replicas: CPU 96% · RAM 93% · latency p95 8257ms ✗
Sweet spot: 2 replicas

Graphe : latence moyenne + p95 pour 1 / 2 / 3 replicas

---

The second experiment was to test horizontal scaling — adding more instances of the server.

with one two then three replicas
A replica is an independent instance of the application running in its own container.

Going from 1 to 2 replicas reduces average latency from 1458 to 899 milliseconds, which makes sense since both vCPUs are now fully utilized. 
However, adding a third replica completely saturates the machine — CPU hits 96%, RAM hits 93%, and latency p95 jumps to over 8 seconds. 
The machine likely starts using swap at this point. So 2 replicas is the sweet spot on this infrastructure — beyond that, adding instances becomes counterproductive.

---

## Slide 14 — Autoscaling v1

External script polling CPU every 30s
CPU > 80% → add replica (max 2)
CPU < 30% → remove replica (min 1)
Spike on scale-up (~40s to deploy new container) then latency stabilizes

Graphe : CPU + replicas + latence dans le temps

---

"The third experiment was autoscaling. Since Dokploy has no native autoscaling, 
I built an external script that polls the CPU usage every 30 seconds and adjusts the number of replicas accordingly. 

If CPU goes above 80%, it adds a replica. 
If it drops below 30%, it removes one. 

The results show that the script reacts correctly — when load increases, a new replica is created
. 
There is a latency spike during the scale-up, which is expected since a new container is created. 
But once deployed, latency drops back to levels similar to the 2-replica configuration."

---

## Slide 15 — Autoscaling v2

Same as v1 + model swapping under extreme load
CPU > 80% + replicas == max → switch to lighter model
Result: 58% error rate · p95 16s · avg latency 1775ms
Conclusion: counterproductive in this context

Graphe : CPU + replicas + latence + model actif dans le temps

---

The fourth experiment added a model swapping mechanism on top of autoscaling. 
The idea was: if we're already at maximum replicas and CPU is still above 80%, instead of doing nothing, 
we switch to a lighter model that consumes fewer resources. 

In theory this sounds smart — but in practice it backfired. 

The error rate jumped to 58%, p95 latency reached 16 seconds, and the overall throughput was worse than with a fixed 2-replica setup. 

The model switching introduces additional latency on every request, and the constant reloading under load made things worse. 

<!-- The lesson here is that reactive autoscaling based on a single global metric like CPU is too coarse-grained for this kind of workload. -->

---

## Slide 16 — Discussion & Limits

Hardware — 2 vCPU / 4.2 GB RAM: no real elasticity, scaling redistributes fixed resources
Dokploy — no native autoscaling, metrics too coarse-grained (CPU only)
Autoscaling v2 — model swapping introduced more problems than it solved
Horizontal scaling ≠ more resources — it just spreads what you have

---

Let's step back and discuss what these results mean. The most fundamental limit is the hardware — with only 2 vCPUs and 4.2 gigabytes of RAM, there is no real elasticity. Horizontal scaling doesn't create new resources, it just redistributes the ones we have. Dokploy itself also has limits — there is no native autoscaling, and the only metric we can easily access is global CPU usage, which is too coarse to build a reactive system on. Finally, the model swapping experiment showed that adding complexity to work around hardware limits can make things worse. Sometimes the right answer is simply: more hardware.

---

## Slide 17 — Conclusion & Perspectives

Dokploy meets the pedagogical goals — deploy from Git, no sysadmin needed
Self-hosting works, but physical limits can't be abstracted away
Short term — bigger VPS (4 vCPU · 8 GB RAM)
Mid term — add a second node, true horizontal scaling
Long term — migrate to k3s if needs grow significantly

---

To conclude — Dokploy successfully meets the pedagogical goals of this project. A student can deploy an application from a Git repository without touching the underlying infrastructure. However, this project also illustrated a fundamental truth about self-hosting: unlike a public cloud, you cannot abstract away the absence of physical resources. The cloud makes elasticity feel infinite — on a VPS, you hit the wall quickly. Looking ahead, the most impactful short-term improvement would simply be upgrading the VPS. Mid-term, adding a second node would enable true horizontal scaling. And long-term, if the number of users or the criticality of applications grows significantly, a migration to k3s would be the natural next step. Thank you for your attention — I'm happy to take any questions.
