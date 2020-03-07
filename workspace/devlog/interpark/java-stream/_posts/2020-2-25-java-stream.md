---
layout: post
title:  "Interpark - Java8 Stream"
date:   2020-01-19 11:21:54 +0900
categories: interpark graphql typescript node
---

### 리듀싱 연산

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

### 기본형 특화 스트림.

> 아래의 사례를 보면 원시타입으로 값을 가져올 때에는 스트림을 사용하는 것에 항상 박싱 비용이 존재한다.

```java

    /** Integer::sum 함수 부분에서 비용 발생 */
    int calories = menu.stream().map(Dish::getCalories).reduce(0, Integer::sum)

```

> 이러한 경우를 위해 기본형을 위한 스트림들이 존재한다.

```java

    int calories = menu.stream().mapToInt(Dish::getCalories).sum();

```

> 일반적인 스트림 중간연산들이 Stream<T> 타입을 반환하는 것과 다르게 기본형을 위한 스트림들은 IntStream과 같이 각 기본형에 맞는 Stream을 특화되어 반환한다. 만약 이 원시타입의 스트림을 다시 박싱하고 싶다면 기본형 스트림들이 가지고 있는 _'boxed()'_ 함수를 사용하면 된다.

```java

    Stream<Integer> ... = IntStream.boxed();

```

### 다양한 스트림 생성 방법

#### 값으로 스트림 만들기

> 값을 가지고 스트림을 만들 수 있다.

```java

    Stream<String> stream = Stream.of("Modern ", "Java ", "In ", "Action");
    stream.map(String::toUpperCase).forEach(System.out::println);

```

#### 배열로 스트림 만들기

> 배열을 가지고 스트림을 만들 수 있다.

```java

    int[] numbers = {2, 3, 5, 7, 11, 13};
    int sum = Arrays.stream(numbers).sum();

```

#### 파일로 스트림 만들기

> 생략

#### 함수로 무한스트림 만들기

> _iterate()_ 메서드를 활용해서 무한생성되는 스트림을 만들 수 있다. 당연히 이를 제한하기 위해 무한스트림 다음 중간연사는 _limit()_ 이 오는 것이 일반적이다. 아래의 코드는 0 부터 2씩 계속 더하며 10번 반복한 결과들을 출력한다.

```java

    Stream.iterate(0, n -> n + 2).limit(10).forEach(System.out::println);

```

> _generate()_ 메서드를 활용해서 임의로 생성되는 스트림을 만들 수 있다. 아래의 코드는 임의의 숫자를 5개 생성해 출력한다.

```java

    Stream.generate(Math::random)
        .limit(5)
        .forEach(System.out::println)

```

> Lazy 연산은 스트림 파이프라인을 최적화시키면서 계산과정을 짧게 생략할 수 있다.

> 명령형 프로그래밍에 비해 함수형 프로그래밍은 단순히 원하는 바를 코딩함으로써 원하는 결과물을 얻어낼 수 있다.

> 훌륭하게 설계된 함수형 API들은 확실히 명령형에 비해 높은 수준의 조합성과 재사용성을 가진다.

### Collection, Collector, Collet

> Collection은 컬렉션 프레임워크를 의미하고 컬렉터는 collect() 함수 안에 들어가는 인스턴스. Collect는 collect() 함수를 의미한다.

> groupingBy를 활용해서 Map 형태를 구현할 수 있다.