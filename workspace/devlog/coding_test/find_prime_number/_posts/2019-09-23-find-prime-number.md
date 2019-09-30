---
layout: post
title:  "Coding Test - find Prime number / Prime Number"
date:   2019-08-11 11:21:54 +0900
categories: coding_test mathematical_formula
---

## Core
```

    소수 찾기 문제는 두가지의 형태로 구분된다.

    Q.  어떤 숫자 범위에 소수의 개수 구하기.
        Solution) '에라토스테네스의 체' 알고리즘 활용

    Q.  하나의 수 n이 소수인지 판별하기.
        Solution) Math.sqrt(n)까지 까지 반복문을 돌려 나누어지는 경우가 있는지 확인

```

## Question
> 1부터 입력받은 숫자 n 사이에 있는 소수의 개수를 반환하는 함수, solution을 만들어 보세요. <br> 소수는 1과 자기 자신으로만 나누어지는 수를 의미합니다. <br><br> (1은 소수가 아닙니다.)

```
    input : int n
    output : int answer
```
[문제 보기](https://programmers.co.kr/learn/courses/30/lessons/12921){: target="_blank"}

## Solution
>  숫자 n까지의 소수의 개수를 구하는 문제임으로 '에라토스테네스의 체' 알고리즘을 활용하여 해결한다. <br><br> 이는 n까지의 숫자 중에 각 소수들의 배수에 해당하는 수들을 제거하고 최종적으로 남는 수들을 소수로 판단하는 방법이다.

### Data Structure
> 각 수들이 소수인지 아닌지를 구분하기 위하여 boolean[]을 생성한다. 각 인덱스는 수를 의미하며 0번째 인덱스는 사용하지 않는다.

```java

// Data Structure : boolean[]
boolean[] primeArr = new boolean[n+1];

```

### Algorithm
> 2부터 Math.sqrt(n)까지 반복하며 각 수의 배수들은 소수가 아님으로 prime = false 해준다. 최종적으로 남은 true값들이 소수가 된다.

```java

for(int i=2; i*i<prime.length; i++)
    for(int j=2; j*i<prime.length; j++)
        prime[j*i] = false;

```