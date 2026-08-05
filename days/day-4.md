---
title: Day 04, Deep Learning
date: 2026-08-04
tags: Deep Learning, Neural Networks
---

## Not the beginning

Full disclosure, as appealing as the clickbait-y intro made it, I'm not an absolute beginner when it comes to Neural Networks, mind you, I'm still a beginner but a beginner that knows how Neural Networks work. To know it yourself, follow the [3b1b series](https://www.3blue1brown.com/?topic=neural-networks) or for a high-level explanation feel free to read my [blog](https://blog.siddharththakkar.xyz/blog-13). Whatever you do, make sure you have a rough idea of how Neural Networks work before reading this, cause boy is this going to be full of jargon!

## Neural Networks

I know your lazy asses wouldn't have redirected themselves to any of those resources, as a matter of fact, 90% of people who opened the devlog aren't even reading at this point, to hell with them. Since you didn't read about Neural Networks, here's a brief intro to them.

Neural Networks are mathematical calculations that draw inspiration from the design of the human brain, to put it simply, they're a network of multiple neurons. These neurons can now be considered as nodes that carry a number, this number is called their activation number. Imagine an image recognition program that tells what number between 0-9 the pixels highlighted on the image show. Now think that the image has 28 * 28 pixels, i.e. a total of 784 pixels. This is our first layer of neurons, each being highlighted by an activation number which is based on how bright the pixel is. Now these go through layers of such neurons where each neuron would have connections with every neuron in the next layer, for now let's imagine there are 2 layers, one layer that identifies the edges and the other that pieces those edges together to form the shape of the number. How is this information travelled though? So each neuron's activation number gets multiplied by something called a weight, and the weighted sum of all the neurons in the previous layer determines the activation of the next neuron. But what if the weighted sum isn't deterministic enough for us to understand whether the neuron is active or not? For that we use something called a sigmoid, a sigmoid is applied to the weighted sum to make sure the output is between 0 and 1. But there's still a problem, what if we want to explicitly adjust according to our own thresholds? Well, for that we use something called a bias. Mathematically, this can be easily explained by this sigmoid: sigmoid(w1a1 + w2a2 + w3a3 + .... + wnan - bias). This is the simplest, yet most effective explanation needed for Neural Networks, I of course didn't write about forward pass, backpropagation, etc., but that's because it'll make the entry more verbose, and if you've read this far, I hope you'll be a bit more adhoc and tinker around with that yourself.

## What are Transformers

I wanted to begin by referencing the book-ish definition of Transformers, referring to "Attention is all you need" and what not. But I'd much rather keep it casual and simple (KISS). A transformer in our case is a tool that lets us predict the next token, in a very derogatory way, it can be best explained as something that facilitates "fancy autocomplete," but there is more to it than just autocomplete.

### Inside a Transformer

First thing that happens is tokenization, which in simple words is breaking text one feeds in into small pieces, called tokens, which are usually a word or a piece of one, not full sentences like one would assume. Each of these tokens then becomes a vector, and this vector is supposed to capture some idea of what that token means. Words that mean similar things end up being closer to each other in this number-space.

From here these vectors go through the same two things, over and over, attention and then an MLP (which if you read the Neural Networks section above is just the same weighted sum plus sigmoid). Attention's job, in the least jargon-y way I can put it, every token gets to have a sneak peek at every other token in the sentence and decide who's actually relevant to it. This is the bit that lets something as simple as "bank" mean two different things depending on whether you said "river bank" or "savings bank."

This attention-then-MLP repeats multiple times, even dozens of times sometimes, and each new pass lets a token pick up more nuance from its surroundings than the last. By the time one is at the last layer, the model runs the last token through a probability over every token it knows (softmax, if you want the fancy word), and picks the best one. That picked token gets stuck onto the end of one's input, and the cycle repeats to pick the next one. This, one token at a time method, is the reason ChatGPT responses stream in word by word (FACT BOMB).

## EOD

This was one of the few days in a very long time where I just took information in and didn't do anything about it, considering the banger of a day yesterday was, this feels kinda underwhelming, but, to make up for it, tomorrow's gonna be a grind. I'll implement a neural net in C in the first half of the day and the other half, I'll watch Karpathy code GPT from scratch and maybe code along, we'll see.

**tl;dr:** brushed up on neural net fundamentals, then went through transformers, tokenization, attention and MLP. Only input day, no code, C neural net + Karpathy starts tomorrow.

