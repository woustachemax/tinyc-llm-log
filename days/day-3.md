---
title: Day 03, C What I made using C!
date: 2026-08-03
tags: C, Linear Algebra
---

## Preface?

This isn't quite the preface you'd expect, in that this isn't breaking down why the devlog is made, this is a preface for the day. If I'd already spent a couple of days on C, why didn't I move on to Deep Learning? Why this day? Am I getting stuck in tutorial hell? Well, to answer it simply, NO! For a detailed answer, I felt like C still felt rusty, I couldn't figure out when to use pointers and when not to, and I also wanted to be comfortable enough today that I could write C without AI autocomplete. So today's all about revisiting pointers, stacks and heaps (especially `malloc`, `calloc` and `realloc`), since these will be crucial for matmul, then creating a small digital clock in C that'd give me the confidence to move on to 3Blue1Brown's Linear Algebra lectures, which will then lead to me implementing the most basic version of matmul.

## Stack and Heap Again!

While on the surface the Stack and Heap concepts were clear for me, I wanted to go a tat bit deeper. I wanted to understand what malloc, calloc and realloc did, in code not just in principle. What I learnt was a bit complex, but to break it down simply, Malloc works like you give it a chunk of memory and it'll deal with what's in it kinda function, it hands you back a pointer to some number of bytes but doesn't clean them, so the garbage that was in there before is still in there until one overwrites it oneself.

Calloc does the same job, allocates memory, but zeroes it out first. Slightly slower for that reason, but one's not reading garbage if one forgets to initialize something, which, knowing me, I will. Realloc is tricky, it resizes memory one has already allocated, bigger or smaller, and it might just hand one back the same pointer if there's room to grow in place, or it might move the whole block somewhere else in memory and copy the old data over if there isn't. Which means one can never trust the old pointer after calling realloc, one has to reassign it to what realloc gives one back, or one will be pointing at memory that could be freed or garbage. (I know, too many 'one's' and too much jargon, but it's easier done than read)

## matmul

Boy did this take me back, I miss my engineering days, but we move. After re-understanding everything there was for me to hit the ground running, I dove into Linear Algebra, but by this time it was too late for me to watch the 3b1b video and ramp up, so I decided to wing it (which ironically took longer but I couldn't stand another video, I wanted to write code, by hand, in nvim, to remind myself of the genius I have). Before writing any code, it's crucial to understand that the size of a resultant matrix depends on the number of rows in the first matrix times the number of columns in the second matrix. You probably knew that but by now you must've realised that I love to dev-splain. What is more important to understand though is if the number of columns in the first matrix isn't equal to the number of rows in the second matrix, matrix multiplication CANNOT happen. How I implemented the matrix multiplication cannot be explained, well it can be, but I don't want to! But I will share the code snippet!

```c
#include <stdio.h>

void getMatrixElements(int matrix[][10], int row, int column) {

   printf("\nEnter elements: \n");

   for (int i = 0; i < row; ++i) {
      for (int j = 0; j < column; ++j) {
         printf("Enter a%d%d: ", i + 1, j + 1);
         scanf("%d", &matrix[i][j]);
      }
   }
}

void multiplyMatrices(int first[][10],
                      int second[][10],
                      int result[][10],
                      int r1, int c1, int r2, int c2) {

   for (int i = 0; i < r1; ++i) {
      for (int j = 0; j < c2; ++j) {
         result[i][j] = 0;
      }
   }

   for (int i = 0; i < r1; ++i) {
      for (int j = 0; j < c2; ++j) {
         for (int k = 0; k < c1; ++k) {
            result[i][j] += first[i][k] * second[k][j];
         }
      }
   }
}

void display(int result[][10], int row, int column) {

   printf("\nOutput Matrix:\n");
   for (int i = 0; i < row; ++i) {
      for (int j = 0; j < column; ++j) {
         printf("%d  ", result[i][j]);
         if (j == column - 1)
            printf("\n");
      }
   }
}

int main() {
   int first[10][10], second[10][10], result[10][10], r1, c1, r2, c2;
   printf("Enter rows and column for the first matrix: ");
   scanf("%d %d", &r1, &c1);
   printf("Enter rows and column for the second matrix: ");
   scanf("%d %d", &r2, &c2);

   while (c1 != r2) {
      printf("Error! Enter rows and columns again.\n");
      printf("Enter rows and columns for the first matrix: ");
      scanf("%d%d", &r1, &c1);
      printf("Enter rows and columns for the second matrix: ");
      scanf("%d%d", &r2, &c2);
   }

   getMatrixElements(first, r1, c1);

   getMatrixElements(second, r2, c2);

   multiplyMatrices(first, second, result, r1, c1, r2, c2);

   display(result, r1, c2);

   return 0;
}
```

## EOD

Super productive day overall, first 10/10 of many, hopefully. Haven't gotten much more to say since the day itself felt a bit verbose, next up is deep learning (rubs palms aggressively!)

**tl;dr:** went deeper on malloc/calloc/realloc, then winged matmul by hand instead of watching 3b1b, resultant matrix size is rows(A) x cols(B), cols(A) must equal rows(B) or it doesn't work. Deep learning starts tomorrow.
