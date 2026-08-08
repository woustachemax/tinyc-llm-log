---
title: Day 05, Neural Net in C!
date: 2026-08-08
tags: C, Deep Learning, Neural Networks
---

## Building a Neural Net in C!

Building a whole Neural Network in C! Right after I just brushed up on C!? Crazy, right? Wrong. As overwhelming as it sounds, if you didn't read the previous entry, you failed to realise that a Neural Network, no matter how complicated or easy the data is, is basically building layers of neurons that do the job bit by bit (roughly). My previous entry focused on a Neural Network that would use data from the MNIST database to detect numbers from 0-9 in a pixelated image, that example, however, is a bit more complex than what I'm building today, considering I wanna stay at this for a while and build this end to end, let's start easy!

## Usecase

The Neural Network for today focuses on XOR data, which in simple words would be able to determine the outputs of certain inputs using the XOR function, i.e.

| Input A   | Input B   | Output |
|---------  |---------  |--------|
| 0         | 0         | 0      |
| 0         | 1         | 1      |
| 1         | 0         | 1      |
| 1         | 1         | 0      |

It's a bit hard to explain how it'll work without code, so let me just walk you through it, in code!

## Building the network

Before we implement any XOR, the network needs weights and biases to start from, since starting all at zero would mean every neuron learns the same thing.

```c
double sigmoid(double x) {
    return 1.0 / (1.0 + exp(-x));
}

double sigmoid_derivative(double x) {
    return x * (1.0 - x);
}

double random_weight() {
    return ((double)rand() / RAND_MAX) * 2.0 - 1.0;
}
```

`sigmoid` is the same squashing function from the other day's neural net section, to put it simply, it keeps outputs between 0 and 1. `sigmoid_derivative` is the thing my earlier entries skipped, since it's needed for backprop, which isn't quite important for the inference engine's use case, and `random_weight` gives back something between -1 and 1 to seed things with.

```c
double inputs[4][2] = {{0,0}, {0,1}, {1,0}, {1,1}};
double targets[4] = {0, 1, 1, 0};

double w1[2][2], w2[2], b1[2], b2;
for (int i = 0; i < 2; i++) {
    for (int j = 0; j < 2; j++) {
        w1[i][j] = random_weight();
    }
    b1[i] = random_weight();
    w2[i] = random_weight();
}
b2 = random_weight();
```

This is the architecture, with 2 inputs, 2 hidden neurons, and 1 output. `w1` are the input-to-hidden weights, `w2` are hidden-to-output. Why a hidden layer at all, and not just inputs straight to output? Because XOR isn't linearly separable, no single straight line can split the 4 XOR points into correct 0s and 1s, a single-layer network mathematically cannot learn this, so the hidden layer's not optional here.

## Forward pass

```c
double h[2];
for (int i = 0; i < 2; i++) {
    h[i] = sigmoid(x0 * w1[0][i] + x1 * w1[1][i] + b1[i]);
}

double output = sigmoid(h[0] * w2[0] + h[1] * w2[1] + b2);
```

This is what I talked about already in the previous entry, weighted sum into a sigmoid, but here it happens twice, once to get the hidden layer's activations from the raw inputs, once more to turn those hidden activations into the final output.

## The backward pass

```c
double error = target - output;
double d_output = error * sigmoid_derivative(output);

double d_hidden[2];
for (int i = 0; i < 2; i++) {
    d_hidden[i] = d_output * w2[i] * sigmoid_derivative(h[i]);
}
```

This is backprop, working backward from how wrong the output was. `d_output` is the output's error scaled by how sensitive the sigmoid is at that point. `d_hidden` pushes that same error backward through `w2` to figure out how much each hidden neuron is to blame.

```c
for (int i = 0; i < 2; i++) {
    w2[i] += lr * d_output * h[i];
}
b2 += lr * d_output;

for (int i = 0; i < 2; i++) {
    w1[0][i] += lr * d_hidden[i] * x0;
    w1[1][i] += lr * d_hidden[i] * x1;
    b1[i] += lr * d_hidden[i];
}
```

This is the final step, all the weights get nudged a little in the direction that reduces error, scaled by the learning rate `lr`. We can train this on our tabular outputs over 1000 iterations for it to understand and give us the correct outputs.

## EOD

Pretty average day overall, that's what happens when you're new to something. This day wasn't as productive, since I used a lot of resources to learn and understand all of this, especially this video by [Nicolai Nielsen](https://www.youtube.com/watch?v=LA4I3cWkp1E&t=797s). But staying consistent and working on GPT, watching Karpathy's video, might fix this.

**tl;dr**: built a small XOR neural net in C, first real hands-on backprop, forward pass, backward pass, weight updates, the whole loop. Slower day than planned, learned more than I shipped, Karpathy's video is next.
