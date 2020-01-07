---
layout: post
title:  "Coding Test - Skill Tree / DFS"
date:   2019-08-11 11:21:54 +0900
categories: coding_test dfs
---

## Core
```

    1. 기본으로 제공되는 자료형으로 구현하기 어려울 때는 Class를 통해 새로운 객체를 만들자.

    2. Java Collection Framework에서 제공하는 Queue 혹은 Stack 자료구조는 중간에 있는 값들에 접근을 할 수가 없다.
    즉 중간에 존재하는 값들과 비교연산이 불가능 함으로 필요한 경우에는 List 구조를 사용하도록 하자. 

```

## Question
> 일반적인 프린터는 인쇄 요청이 들어온 순서대로 인쇄합니다. 그렇기 때문에 중요한 문서가 나중에 인쇄될 수 있습니다. <br> 이런 문제를 보완하기 위해 중요도가 높은 문서를 먼저 인쇄하는 프린터를 개발했습니다. 이 새롭게 개발한 프린터는 아래와 같은 방식으로 인쇄 작업을 수행합니다.

```

1. 인쇄 대기목록의 가장 앞에 있는 문서(J)를 대기목록에서 꺼냅니다.
2. 나머지 인쇄 대기목록에서 J보다 중요도가 높은 문서가 한 개라도 존재하면 J를 대기목록의 가장 마지막에 넣습니다.
3. 그렇지 않으면 J를 인쇄합니다.

```

> 예를 들어, 4개의 문서(A, B, C, D)가 순서대로 인쇄 대기목록에 있고 중요도가 2 1 3 2 라면 C D A B 순으로 인쇄하게 됩니다. <br><br> 내가 인쇄를 요청한 문서가 몇 번째로 인쇄되는지 알고 싶습니다. 위의 예에서 C는 1번째로, A는 3번째로 인쇄됩니다. <br><br> 현재 대기목록에 있는 문서의 중요도가 순서대로 담긴 배열 priorities와 내가 인쇄를 요청한 문서가 현재 대기목록의 어떤 위치에 있는지를 알려주는 location이 매개변수로 주어질 때, 내가 인쇄를 요청한 문서가 몇 번째로 인쇄되는지 return 하도록 solution 함수를 작성해주세요.

```
    input : int[] priorities, int location
    output : int[] answer
```
[문제 보기](https://programmers.co.kr/learn/courses/30/lessons/42587){: target="_blank"}

## Solution
>  priorities 배열을 바꿔가다 보면 location 변수가 지칭하는 값이 어떤 녀석인지 잃게 된다. 이를 위해 location 값을 priorities 배열이 변형을 일으킬 때마다 맞추어서 값을 바꿔주는 방법도 있지만. 여기서는 보다 심플하게 새로운 자료형을 만든다. <br><br> Document 라는 객체는 location값과 priority값을 가지고 있는 자료형이다. <br><br> 문제에서 제시된 방법대로 printer를 동작시키기 위해 Queue와 유사하게 동작하는 List를 하나 구현한다. 타입은 Document이다.

### Data Structure
> Document라는 새로운 자료형을 만든다 그리고 priorities를 문제에 제시된 방법처럼 동작시키기 위해 List 하나 구현하여 priorities 배열의 내용을 넣는다.

```java

// Document라는 새로운 자료형.
class Document {
	int loc;
	int prior;
		
	public Document(int loc, int prior) {
		this.loc = loc;
		this.prior = prior;
	}
}

// List
List<Document> list <- new Document(priorities, index);

```

### Algorithm
> list가 아무것도 없을 때까지 반복문을 돌리고 매 값에 대해서 가장 높은 priority를 가졌는지 확인 한다. 그럴 경우 인쇄를하고, 그렇지 않으면 poll() 한다음 다시 list의 가장 끝으로 집어 넣는다.

```java

while(!list.isEmpty()) {
	int prior = list.get(0).prior;
	if(isImportant(prior, list)) {
		result.add(list.get(0));
		list.remove(0);
	} else {
		list.add(list.get(0));
		list.remove(0);
	}
}

```