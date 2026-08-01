---
title: Day 01, Re-learning C!
date: 2026-07-28
tags: C 
---
## Scaffolding 

Day 1, always one of the toughest ones, huh!? Before diving headfirst into Day 1, I had a Day 0 to brainstorm the project. For the life of me, I couldn't make myself understand, in technical terms, what I was building: is it a mini-GPT like shown in Karpathy videos, or an LLM that could be moulded into an autocomplete? I just knew I was building something that required several days of dedication and resilience. 

## Problem

Plainly, I'm building an inference engine, the thing that runs a trained model and spits out text. Except I'm writing that part myself in C instead of importing something. An AI model at inference time is mostly matrix multiplication and a couple of math functions, done over and over in a loop. Normally PyTorch handles that but here I'm hand writing that loop in C, badly at first probably (definitely).

To double-check, I'll load the same real model into PyTorch too. Once (if) it works, it'll be slow, recomputing everything from scratch every single word isn't exactly snappy. So somewhere down the line I add a KV-cache, so it remembers what it already computed instead of redoing the same work every token. Lastly, I'll wrap it in FastAPI, to make it 'promptable' for people. And at the very end, I'll benchmark it against llama.cpp, to get a numerical comparision for my sanity.

## Day 1

As the title of this log suggests, I'll be relearning C today, which shouldn't be much of a problem, considering I'm an Electronics Engineer and I've written C without AI for almost 3 years of my life (at least that's what my diploma says). For the resource, I'm relying on 2, Let us C, the book by Yashvant Kanetkar and [Boot.dev's](https://www.boot.dev/courses/learn-memory-management-c) Learn Memory Management in C, course and exercises, to practice where  I'm rusty.

## Learnings

Relearning C from scratch wasn't a smooth ride at all, but I guess so is the case with most low-level languages. The early roadblocks were rather simple to handle since most of my errors were either due to me forgetting to use types where need be, for example: 

```c
#include "exercise.h"

float get_average(int x, int y, int z) {
  float average = (x + y + z) / 3.0;
  return average;
}
```

this was supposed to be a 'basic' exercise which I got wrong multiple times, either due to a missed semicolon somewhere (f*ck python and js for spoiling me) or just not being attentive enough while declaring the type for 'average'. This however, was just the beginning, I struggled, no I STRUGGLED with a lot of things including structs, pointers etc which led me to push the C Learning to two days, the initial plan was just 1 day of C and then moving on to 3blue 1brown for a recap on Back Propagation, Gradient Descent, and other ML jargon and then eventually implementing a mini GPT. 

## EOD

In hindsight, I should've just dove into the exercises as opposed to reading about why C or low-level languages exist, not saying it's useless but having programmed for a while, I wasn't oblivious to it's advantages and usecase. At the end of the day, the day in general wasn't satisfactory, considering I pushed the learnings a day ahead and didn't really get into Pointers, structs, stacks and heaps and chased syntactical expertise, but I guess that's how you learn. 

**tl;dr:** started re-learning C, had a few roadblocks coming from a TS, Python background, nevertheless, got used to the syntax and looking forward to re-discover the scary parts tomorrow!  