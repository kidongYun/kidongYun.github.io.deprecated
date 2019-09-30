---
layout: post
title:  "Coding Test - Camouflage / Combination"
date:   2019-08-11 11:21:54 +0900
categories: coding_test mathematical_formula
---

## Core
```

    A + B + C + AB + AC + BC + ABC = (A+1)(B+1)(C+1) - 1

```

## Question
>  스파이들은 매일 다른 옷을 조합하여 입어 자신을 위장합니다. <br><br> 예를 들어 스파이가 가진 옷이 아래와 같고 오늘 스파이가 동그란 안경, 긴 코트, 파란색 티셔츠를 입었다면 다음날은 청바지를 추가로 입거나 동그란 안경 대신 검정 선글라스를 착용하거나 해야 합니다. 

```
    종류    이름
    얼굴    동그란 안경, 선글라스
    상의    파란색 티셔츠
    하의    청바지
    겉옷    긴 코트
```

> 스파이가 가진 의상들이 담긴 2차원 배열 clothes가 주어질 때 서로 다른 옷의 조합의 수를 return 하도록 solution 함수를 작성해주세요.

```
    input : String s, int n
    output : String answer
```
[문제 보기](https://programmers.co.kr/learn/courses/30/lessons/42578){: target="_blank"}

## Solution
> 옷의 개수는 1개 이상 입으면 옷을 입은 것으로 간주된다. 그리고 각 옷의 종류에 따라서 혼합하여 옷을 입을 수도 있다. 잠깐 생각해보면 복잡해 보일 수 있지만 이는 수학의 조합이라는 규칙을 가지고 있다. <br><br>
예를 들어 옷의 종류가 A, B, C가 있고 각 종류 마다 2, 3, 3 가지의 옷을 가지고 있다. <br><br> A만 입는 방법, B만 입는 방법, C만 입는 방법, A와 B를 혼합하여 입는 방법, A와 C를 혼합하여 입는 방법, A와 C를 혼합하여 입는 방법, A와 B와 C를 혼합하여 입는 방법이 존재한다.

```
    총 옷 입는 가짓 수 = A + B + C + AB + AC + BC + ABC
```

> 위의 수식이 일정한 규칙을 가지고 있지만. 이를 그대로 활용하여 코딩하기는 복잡하다. 따라서 수식을 아래와 같이 수정하여 진행한다.

```
    (A+1)(B+1)(C+1) - 1
```

> 두 수식은 동일한 값을 가지며 전개를 해보면 명확히 알 수 있다.

```
    A + B + C + AB + AC + BC + ABC = (A+1)(B+1)(C+1) - 1
```
### Data Structure
> 특별한 자료구조가 필요하지 않다.

### Algorithm
> 각 옷의 종류마다 옷의 개수를 알아내고 공식을 활용해 풀어낸다.