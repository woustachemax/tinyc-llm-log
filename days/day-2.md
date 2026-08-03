---
title: Day 02, REALLY Re-learning C!
date: 2026-08-01
tags: C
---

## Confession

I felt behind, on the SECOND day! It was because I was in an interview loop, but no amount of excuses should let this be compromised, cause this is something that will (might) give me asymmetric results or not, who cares? Until it's giving me asymmetric happiness! So, I started off with reading my own devlog to see where I was at (narcissistic much?) and braced myself to just brush up on Structs, Enums, Unions, Stacks, Heaps and Pointers before I start coding the project!

## Structs

So before getting into structs, it is important, crucial as a matter of fact to realise, that C is the closest thing to a google translate for binary, so unlike in Python and JS/TS where data classes and Objects have methods, Structs in C are reserved just for Data. But in here, the order that we define our variables in matters, A LOT! Now, this is pretty much it for structs. Not that reading this would make you a master of them, but this is enough to start building and then ask the right questions to either AI or Stack Overflow (if you're a 100 y/o, that is, jk).

## Pointers

Tough one this, especially because before diving head-first into pointers one (wow 'one', guess we're not doing 'you's anymore) needs to understand how memory management works on a high level in C, and it boils down to these two statements: 1. Variables are human-readable names that refer to some data in memory, and 2. Memory is a big array of bytes, and data is stored in the array. (Not my own thoughts, got these from Boot.dev.) These variables stored have an 'address' that is usually a base 16 (hexadecimal) number, for example, something similar to: 0xfff8. However, the program doesn't directly have access to the address in the machine; it is connected using an abstraction layer called virtual memory.

Pointers are values that tell you the value of the address. Pointers should be considered just as addresses for data to make them less overwhelming, how pointers normally work can be best displayed with this example:

Consider we have a variable x and a variable y, in code that's `int x = 5;` and `int y = 6;`, both x and y have some address, in this case `0x7ffee23a1a1c` and `0x7ffee23a1a18` (these are made up).

Now say we want a pointer that points to x, that's `int *p = &x;`. The `&` here means "give me the address of," so p doesn't hold 5, it holds `0x7ffee23a1a1c`, the address where 5 lives. If you print p directly you get that hex number, not 5. To actually get 5 back out, you dereference it with `*p`, which tells the program "go to the address p is holding, and give me what's there." So `*p` gives you 5, and `*p = 10;` would change x itself to 10, since you're writing to the address x lives at, not to some copy of it.

That's it! Pointers!!

## Enums

Same as Python and JS/TS, though usually used with a `typedef` so you don't have to write `enum` (or any type, since this works for structs too!) every time you declare them. Sorry if you were expecting a paragraph on this, this whole log was started for folks who know programming and can easily ramp up and make their own 'inference engine', so it's a bit of 'dev-splaining' since I'm expecting no one to know C and all of them to be TS/Python bros like me. So writing more about Enums would be an insult to TS/Python bros, let alone the seasoned C/low-level bros.

## Unions

This is the datatype for all my Python friends, we finally found something for us! A union looks exactly like a struct syntax-wise, `union Foo { int i; float f; char c[4]; };`, but the difference is that a struct gives every field its own slot in memory, a union gives all its fields the same slot. So `sizeof(union Foo)` is just the size of its biggest member. It's the closest C gets to Python's "a variable can just be whatever," but here one has to remember which type one last put in there, the compiler won't stop one from reading the wrong type.

## Stack and Heap

Stack is simple to understand as every function call pushes its local variables onto it, and after the function returns, it cleans itself, which makes it fast as hell but small and short-lived because the memory dies with it (RIP).

Heap is what made me move away from Electronics Engineering, especially `malloc`. Stuff on the heap sticks until you explicitly `free` it. The downside is that it doesn't clean up after you, and forgetting to `free` leads to a leak.

## EOD

This was overwhelming, especially since I'm not using AI for this. In hindsight, I wasted a bit too much time on boot.dev's exercises, which, though put together amazingly, required a lot more time than I estimated for learning. I might just use Day 3 to write some code by hand before moving to 3Blue1Brown Deep Learning Math. Disappointing day again, it's hard to put value to just learning days, especially when jarring concepts have you thinking, "I'll forget this tomorrow," but we move. Looking forward to building something in C tomorrow, something adjacent to this so that I can reuse the code!

**tl;dr:** brushed up on structs, pointers, enums, unions, stack and heap, boot.dev's exercises ate more time than expected, still overwhelming but making it stick, C, day 3 tomorrow!
