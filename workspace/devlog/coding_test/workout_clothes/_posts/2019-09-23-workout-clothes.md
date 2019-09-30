---
layout: post
title:  "Coding Test - Workout Clothes / Greedy"
date:   2019-08-11 11:21:54 +0900
categories: coding_test greedy
---

## Core
```


    Greedy 접근법의 핵심은 해당 문제에 대한 근시안적 방법이 최선의 해결책임을 증명하는 것이다.


```

## Question
> 점심시간에 도둑이 들어, 일부 학생이 체육복을 도난당했습니다. 다행히 여벌 체육복이 있는 학생이 이들에게 체육복을 빌려주려 합니다. 학생들의 번호는 체격 순으로 매겨져 있어, 바로 앞번호의 학생이나 바로 뒷번호의 학생에게만 체육복을 빌려줄 수 있습니다. <br><br> 예를 들어, 4번 학생은 3번 학생이나 5번 학생에게만 체육복을 빌려줄 수 있습니다. 체육복이 없으면 수업을 들을 수 없기 때문에 체육복을 적절히 빌려 최대한 많은 학생이 체육수업을 들어야 합니다. <br><br> 전체 학생의 수 n, 체육복을 도난당한 학생들의 번호가 담긴 배열 lost, 여벌의 체육복을 가져온 학생들의 번호가 담긴 배열 reserve가 매개변수로 주어질 때, 체육수업을 들을 수 있는 학생의 최댓값을 return 하도록 solution 함수를 작성해주세요.

```
    input : int n, int[] lost, int[] reserve
    output : int[] answer
```
[문제 보기](https://programmers.co.kr/learn/courses/30/lessons/42862){: target="_blank"}

## Solution
>  이 문제를 Greedy하게 풀 수 있음을 나타내는 부분은 바로 체격의 조건이다. 여벌의 체육복을 가지고 있는 학생이 지원할 수 있는 범위는 자신의 앞 번호와 뒷 번호 그 둘로 제한되어 있다. <br><br> 이제 문제를 가장 잘 해결하기 위한 자료구조를 선정해야 한다. 앞 번호와 뒷 번호를 명확히 보이게 하기 위해 각 학생들을 번호순으로 일렬로 나열시키고 체육복의 개수를 나타내게 하자. 즉 int[] 배열에 학생 번호 순서대로 각 학생들이 가지고 있는 체육복 개수를 넣는다. <br><br> 맨 앞번호 부터 끝번호까지 체육복이 없는 사람이 있다면 여유가 있는 앞 뒤 학생이 빌려주도록 반복한다.


### Data Structure
> 각 학생들의 체육복의 개수를 나타내기 위한 int[] 자료형을 사용한다.

```java

    /* 
        Data Structure : int[]
        각 값들은 학생이 가지고 있는 체육복의 개수를 의미
    */
    int[] students;

```

### Algorithm
> 체육복이 없는 학생의 경우 그 앞, 뒤에 있는 학생이 여벌이 있다면 빌려주도록 하자. 최종적으로 students 배열에 1이상의 수를 세면 정답이 된다. 

```java

	for(1 ~ students.length) {
		if(students[i] == 0) {
			if(students[i-1] == 2) {
				students[i-1]--; students[i]++;
			} else if(students[i+1] == 2) {
				students[i+1]--; students[i]++;
			}
		}
	}

```