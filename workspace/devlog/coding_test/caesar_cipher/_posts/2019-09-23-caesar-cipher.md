---
layout: post
title:  "Coding Test - Caesar Cipher / Modulus, ASCII"
date:   2019-08-11 11:21:54 +0900
categories: coding_test modulus ascii
---

## Core
```

    Character 자료형을 가지고 노는 문제는 ASC 코드를 활용할 확률이 높다.
    문자들이 순환되어져야 한다면 Modulus 연산을 활용하자.

```

## Question
> 어떤 문장의 각 알파벳을 일정한 거리만큼 밀어서 다른 알파벳으로 바꾸는 암호화 방식을 시저 암호라고 합니다. 예를 들어 AB는 1만큼 밀면 BC가 되고, 3만큼 밀면 DE가 됩니다. z는 1만큼 밀면 a가 됩니다. 문자열 s와 거리 n을 입력받아 s를 n만큼 민 암호문을 만드는 함수, solution을 완성해 보세요.

```
    input : String s, int n
    output : String answer
```
[문제 보기](https://programmers.co.kr/learn/courses/30/lessons/12926){: target="_blank"}

## Solution
>  ASC 코드를 활용하여 알파벳을 밀어내는 경우를 구현할 수 있다. 대문자와 소문자의 ASC코드값은 다름으로 둘은 구분해서 구현 해야한다. <br><br> 'Z' -> 'A' 갈 수 있도록 하기 위해 Modulus 연산을 활용해야 한다. 총 알파벳의 개수는 26임으로 26으로 나누어 27 부터는 다시 1로 돌아갈 수 있도록 만든다.

### Data Structure
> 특별한 자료구조가 필요하지 않다.

### Algorithm
> 대문자, 소문자, 공백을 구분하고 각각에 대해 Modulus 연산을 활용해 n만큼 숫자를 밀어준다.

```java

for(int i=0; i<s.length(); i++) {
	if(s.charAt(i) >= 97 && s.charAt(i) <= 122) {
		int value = ((s.charAt(i) - 97 + n) % 26) + 97;
		answer += (char)value;
	} else if(s.charAt(i) >= 65 && s.charAt(i) <= 90) {
		int value = ((s.charAt(i) - 65 + n) % 26) + 65;
		answer += (char)value;
	} else {
		answer += " ";
	}
}

```