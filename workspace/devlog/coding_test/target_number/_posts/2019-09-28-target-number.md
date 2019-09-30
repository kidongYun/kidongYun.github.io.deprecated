---
layout: post
title:  "Coding Test - Target Number / PowerSet"
date:   2019-08-11 11:21:54 +0900
categories: coding_test mathematical_formula
---

## Core
```

	부분집합을 구하는 PowerSet 알고리즘 구현 형태를 외워두자.

```

## Question
> n개의 음이 아닌 정수가 있습니다. 이 수를 적절히 더하거나 빼서 타겟 넘버를 만들려고 합니다. 예를 들어 [1, 1, 1, 1, 1]로 숫자 3을 만들려면 다음 다섯 방법을 쓸 수 있습니다.

```
-1+1+1+1+1 = 3
+1-1+1+1+1 = 3
+1+1-1+1+1 = 3
+1+1+1-1+1 = 3
+1+1+1+1-1 = 3
```

> 사용할 수 있는 숫자가 담긴 배열 numbers, 타겟 넘버 target이 매개변수로 주어질 때 숫자를 적절히 더하고 빼서 타겟 넘버를 만드는 방법의 수를 return 하도록 solution 함수를 작성해주세요.

```
    input : int[] numbers, int target
    output : int answer
```
[문제 보기](https://programmers.co.kr/learn/courses/30/lessons/43165){: target="_blank"}

## Solution
>  각 자리 수는 +, - 값을 가질 수 있다.  경우의 수를 따지면 총 수가 n개 일때 가능한 조합의 수는 2의 n승 가지 이다. 즉 이 조합 방법은 부분집합을 구하는 형태와 같으며 이 문제는 powerSet 알고리즘을 활용하면 모든 경우의 수에 대해 접근할 수 있다. <br><br> powerSet 알고리즘은 재귀형태로 구현하는 것이 가장 간단하다. 이를 위해 powerSet() 함수를 구현하며 또 각 자릿 수의 +, -를 확인하기 위한 boolean[] 타입의 flags 변수를 선언한다.

### Data Structure
> 각 자리의 수 정보를 담겨 있는 int[] numbers 배열을 그대로 사용하며, 각 자리의 +, -를 확인하기 위한 boolean[] flags를 선언한다. 배열의 크기는 numbers의 크기와 동일하다.

```java

	int[] numbers;
	boolean[] flags = new boolean[numbers.length];

```

### Algorithm
> powerSet 알고리즘을 재귀적으로 구현한다. 이는 배열의 앞자리부터 +, - 두 방향으로 계속 분기해 나간다.
마침내 배열의 끝자리까지 도달하게 되면 특정한 +, -가 생성됨으로 이를 활용하여 요구되어지는 작업을 수행한다.

```java

powerSet(0);

public void powerSet(int depth) {
	if(depth == length) {
		// numbers와 flags를 활용해 target과 같은 수가 있으면 answer++ 한다.
	}

	numbers[depth] = false;
	powerSet(depth+1);
	numbers[depth] = true;
	powerSet(depth+1);
}
```