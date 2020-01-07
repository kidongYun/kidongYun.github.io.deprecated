---
layout: post
title:  "Coding Test - Farthest Node / Dijkstra"
date:   2019-08-11 11:21:54 +0900
categories: coding_test graph dijkstra
---

## Core
```

    Dijkstra 알고리즘을 활용해 최단경로를 구하자.

```

## Question
>  n개의 노드가 있는 그래프가 있습니다. 각 노드는 1부터 n까지 번호가 적혀있습니다. 1번 노드에서 가장 멀리 떨어진 노드의 갯수를 구하려고 합니다. 가장 멀리 떨어진 노드란 최단경로로 이동했을 때 간선의 개수가 가장 많은 노드들을 의미합니다. <br><br> 노드의 개수 n, 간선에 대한 정보가 담긴 2차원 배열 vertex가 매개변수로 주어질 때, 1번 노드로부터 가장 멀리 떨어진 노드가 몇 개인지를 return 하도록 solution 함수를 작성해주세요. 

```
    input : int n, int[][] edge
    output : int answer
```
[문제 보기](https://programmers.co.kr/learn/courses/30/lessons/49189){: target="_blank"}

## Solution
> Dijkstra 알고리즘을 활용하여 각 노드마다 최단거리를 구하고 가장 긴 거리의 개수를 구하면 된다. 최단경로 알고리즘을 많이 접해본 경우 쉽게 해결할 수 있는 문제이다. <br><br> Dijkstra 알고리즘을 구현하기 위해 각 노드마다 거리 정보를 가지고 있는 int[] distances와 방문 여부를 확인하기 위한 boolean[] visits 그리고 간선 정보를 알기 위한 그래프 데이터가 필요하다. <br><br> Dijkstra 알고리즘은 매 스텝마다 거리 정보를 최적화하고 가장 가까운 노드를 찾아 재귀호출하는 것이 핵심이다. 

### Data Structure
> 각 노드의 거리 정보를 위한 int[] distances, 각 노드의 방문 여부를 확인하기 위한 boolean[] visits, 간선 정보를 저장하기 위한 map[][] 이 필요하다. <br><br> map은 그래프로 표현함으로 인접행렬, 인접리스트 두가지로 구현이 가능하다. 성능상으로 볼때 인접리스트가 더 효율적임으로 이 방법을 외워두도록 하자.

```java
    
    int n                       // 입력으로 들어온 노드의 개수
    int[] distances;            // 거리 정보 저장
    boolean[] visits;           // 방문 여부
    List<List<Integer>> map;    // 입력으로 들어온 간선 정보 만약 간선에 가중치 정보가 필요하다면 Class를 통해 새로운 자료형을 구현해야한다.

```

### Algorithm
> 우선 인접리스트를 활용해 간선 정보를 가지는 map 변수를 초기화 한다.

```java

List<List<Integer>> map = new ArrayList<>();

for(int i=1; i<n+1; i++)          // 노드 개수 만큼 0 인덱스는 고려하지 않고 1부터 계산한다.
    map.add(new ArrayList<>());

for(int i=0; i<edge.length; i++) {
    map.get(edge[i][0]).add(edge[i][1]);
    map.get(edge[i][1]).add(edge[i][0]);            // 무방향 그래프임으로 두 방향에서 값을 설정
}

```

> 핵심 dijkstra 알고리즘을 구현한다.

```java

dijkstra(int target) {
    int min = Interger.MAX_VALUE;
    int min_index = -1;

    visit[target] = true;
    count++;

    for(int i=0; i<map.get(target).size(); i++) {       // 방문하지 않고 인접한 노드의 경우 거리 정보를 업데이트
        if(!visits[map.get(target).get(i)]) {
            if(first) {
                distances[map.get(target).get(i)] = 1;      
            } else {
                if(distances[map.get(target).get(i)] > map.get(target).get(i) + 1)
                    distances[map.get(target).get(i)] = map.get(target).get(i) + 1;
            }
        }
    }

    for(int i=0; i<distances.length; i++) {     // 방문하지 않은 노드에 대하여 최소 거리를 가지고 있는 노드를 찾음
        if(!visit[i]) {
            if(min > distances[i]) {
                min = distances[i];
                min_index = i;
            }
        }
    }

    if(first)
        first = false;

    if(count != distances.length - 1)
        dijkstra(min_index);
}

```