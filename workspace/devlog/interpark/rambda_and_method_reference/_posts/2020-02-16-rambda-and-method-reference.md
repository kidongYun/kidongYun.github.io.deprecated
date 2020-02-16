---
layout: post
title:  "Interpark - Rambda and Method Reference"
date:   2020-02-16 08:47:54 +0900
categories: interpark java8 java rambda method-reference
---

### 자바에서의 함수

> 자바에서 함수, 메소드는 독립적으로 존재할 수 없는 개체이다. 하지만 함수형 프로그래밍이 대두됨에 따라서 _'Java8'_ 에서는 함수를 독립적으로 사용하기 위해서 _'FunctionalInterface'_ 이라는 방법을 제공한다.

```java

@FunctionalInterface
interface DummyInterface {
    int doSomething(String string);
}

```

> 위 코드는 _'doSomething()'_ 이라는 함수를 Java에서 구현하기 위한 방법이다. 실제로 함수만 따로 존재할 수 없기 때문에 위와 같은 단 하나의 함수만 가질 수 있는 제한된 인터페이스를 활용해 함수를 구현한다. 

### 람다

> Java8의 람다식은 함수 자체를 표현하는 방법 중 하나이며 이 람다식이 중요하게되는 근본적인 이유는 Java8에서 바로 이 함수를 값으로 받을 수 있기 때문이다. Java8 이전의 Java에서는 _'String'_ 타입의 값을 _'int'_ 타입으로 변환하여 저장하는 기능을 구현하기 위해서는 아래의 함수를 구현하고 각 필드에 따라서 이 함수를 사용해야 했다.

```java

public int stringToInt(String string) {
    return Integer.parseInt(string);
}

public void main() {
    int number = stringToInt("20");
}

```

> 기존의 Java 에서는 _'stringToInt()'_ 함수 자체를 저장하기 위한 방법이 존재 하지 않았지만 Java8 이후에서는 이 _'stringToInt()'_ 함수 자체를 값으로써 저장이 가능해진다. 다만 이를 위해서는 람다식을 사용해야한다.

```java

public void main() {
    ToIntFunction<String> stringToInt = (String string) -> Integer.parseInt(string);
}

```

> _'ToIntFunction<T>'_ 객체는 int 타입을 반환하는 함수들을 위한 타입이라고 보면된다. 다시 말하면 int가 정수를 위한 타입이라면 이 _'ToIntFunction<T>'_ 객체는 함수를 위한 타입이다. 함수를 값으로 줄 때 가장 중요하게 다뤄야 할 부분은 바로 파라미터의 형태와 반환 형태이다. 이를 Java8 에서는 '함수 디스트립터' 라고 부르는데 쉽게 함수의 모양이라고 생각하면 된다.

### 메소드 참조

> 람다는 기존 자바에서 익명 클래스와 비슷하다. 별도로 선언하지 않고 필요한 코드블록에서 함수 디스크립터가 동일한 구조의 람다식을 제공하면 그 함수 자체가 값에 저장이 되어진다. 그렇다면 함수를 만약에 명시적으로 사용하고 싶다면 어떻게 해야할까. 바로 메소드 참조를 사용한다. 우선 _'FunctionalInterface'_ 를 활용해 함수를 위한 제한된 인터페이스 하나를 구현하고 이를 메소드 참조 연산자를 활용해 호출하면 된다.

```java
```

> 여기 좀 더 공부해서 보강해야 할 듯.

### 람다의 타입 검사, 추론, 제약

#### 타입 검사

> 람다식을 사용할 때 사용된 함수 디스크립터가 맞는지 아닌지를 어떻게 확인 할 수 있을까. 위의 예를 활용해 확인해보자.

```java 

public void main() {
    ToIntFunction<String> stringToInt = (String string) -> Integer.parseInt(string);
}

```

> 람다식은 _'ToIntFunction<String>'_ 의 함수 디스크립터를 확인해서 타입 검사를 한다.

#### 타입 추론

> ToIntFunction<String> 의 함수 디스크립터를 활용해 람다식의 함수 디스크립터를 추론할 수 있다. 따라서 필요한 경우 파라미터의 타입은 생략이 가능하다.

```java

public void main() {
    ToIntFunction<String> stringToInt = (string) -> Integer.parseInt(string);
}

```

#### 제약사항

> 람다식은 익명 클래스와 유사하게 동작하기 때문에 람다식이 구현된 코드블록 외부에 있는 변수에도 접근이 가능하다. 이렇게 외부에 있는 변수를 람다식 안에 쓸수 있도록 하는 것을 람다 캡처링이라고 한다.

```java

class Main {
    public void main() {
        String str1 = "10";
        ToIntFunction<String> stringToInt =(str2) -> Integer.parseInt(str1 + str2);
    }
}

```

> 위의 예에서 _'str1'_ 은 람다식 외부에 있는 변수임에도 접근이 가능하다. 하지만 중요한 점은 이 _'str1'_ 변수는 final 로 선언이 되거나 수정이 되지 않는 변수여야 한다. 

> 람다 캡처링을 할 때 람다식은 외부에 있는 이 지역변수를 쓸수 있도록 공유 가능한 힙 메모리로 올리는데 이 때 복사본이 올라가게 된다. 람다식에서 이 값을 쓰고 그 이후에 지역 변수가 값을 수정하게되면 서로 상이하게 됨으로 람다 캡처링을 위한 지역변수는 수정을 하지 않는 값이여야 한다.

### 메모리 참조

> 아래와 같은 세가지 타입이 존재.

```java

    // Rambda
    (args) -> ClassName.staticMethod(args)

    // Method Reference
    ClassName::staticMethod

```

```java

    // Rambda
    (arg0, rest) -> arg0.instanceMethod(rest)

    // Method Reference
    ClassName::instanceMethod

```

```java

    //Rambda
    (args) -> expr.instanceMethod(args)

    // Method Reference
    expr::instanceMethod

```
