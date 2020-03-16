---
layout: post
title:  "Interpark - Java8 Reduce and Collector"
date:   2020-03-16 14:30:54 +0900
categories: interpark java java8 stream collector reduce
---

### 4. What is the Collector ?

#### reduce()


> It's the Reduce Computation already made from Java Developers. If you don't use this about the normal problem, then you always should create the logic for that. Collectors occurs the samples computation for the normal computation like getting the max value, getting the summing of the all values.

#### maxBy()

#### minBy()

#### summingInt()

#### joining()

#### groupingBy()

#### partitioningBy()

> 리듀싱 연산은 모든 스트림 요소들을 처리해서 어떠한 컬렉션, 리스트, 배열따위가 아닌 값으로써 반환을 한다. 함수형 프로그래밍에서는 폴드(Fold)연산이라고도 부르는데 그 이유는 값으로써 추출하는 과정이 종이를 계속 접는 것과 유사하게 연상되기 때문이다.

```java

    /** 리듀싱 연산 예시 1 */
    int sum = numbers.stream().reduce(0, (a, b) -> a + b)

    /** 리듀싱 연산 예시 2 */
    int sum = numbers.stream().reduce(0, Integer::sum)

```
> reduce 함수 안에 들어가는 두 파라미터 중 첫번째는 초기값을 의미하며, 두번째로 오는 함수는 이 초기값을 어떻게 지속으로 연산할지에 대한 정의를 보여준다. 초기값 파라미터를 생략할 수도 있는데 이럴 경우 초기값을 모를 경우에 대한 예외를 처리할 수 없음으로 결과는 Optional 클래스로 반환된다.

```java

    /** 초기값이 없는 경우의 리듀싱 연산 예시 */
    Optional<Integer> sum = numbers.stream().reduce((a, b) -> a + b);

```

> 외부반복을 활용해서 합산하는 코드를 구현하는 것과 리듀싱 연산을 사용하는 것은 가독성의 면에서도 차이가 두드러지지만 그것보다도 중요하게도 성능면에서 큰 차이를 보인다. 외부반복으로 구현된 코드는 병렬성을 가지기 어렵지만 리듀싱 연산을 활용한다면 손쉽게 병렬성의 장점을 얻어낼 수 있다.


### Collection, Collector, Collet

> Collection은 컬렉션 프레임워크를 의미하고 컬렉터는 collect() 함수 안에 들어가는 인스턴스. Collect는 collect() 함수를 의미한다.

> groupingBy를 활용해서 Map 형태를 구현할 수 있다.