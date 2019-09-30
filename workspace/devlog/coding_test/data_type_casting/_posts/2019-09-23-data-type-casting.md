---
layout: post
title:  "Coding Test - Data Type Casting"
date:   2019-08-11 11:21:54 +0900
categories: coding_test basic
---

## Data Type Casting
```java
    Java8 이상에서 제공하는 자료형들의 데이터 타입 변환을 위한 함수들을 정리한다. 
```

### String -> char[]
```java
String str = "something";
char[] chs = str.toCharArray();
```

### char[] -> string
```java
char[] chs = {'s', 'o', 'm', 'e', 't', 'h', 'i', 'n', 'g'};
String str = new String(chs, 0, chs.length);
```

### String -> int
```java
String str = "72";
int num = Integer.parseInt(str);
```

### int -> String
```java
int num = 72;
String str = 72 + "";
```

### char -> int
```java
char ch = '8';
int num = Integer.parseInt(ch + "");
```

### int -> char
```java
int num = 8;
char ch = Character.forDigit(num, 10); // forDigit 2번째 파라미터는 10진법을 의미 
```

### int[] -> Integer[]
```java
int[] num1 = {1, 2, 3, 4};
Integer[] num2 = Arrays.stream(num1).boxed().toArray(Integer[]::new);
```

### Integer[] -> int[]
```java
Integer[] num1 = {1, 2, 3, 4};
int[] num2 = Arrays.stream(num1).mapToInt(Integer::intValue).toArray();
```

### String -> Character[]
```java
String str = "something";
Character[] ch = str.chars().mapToObj(c -> (char)c).toArray(Character[]::new);
```

### Character[] -> String
```java
Character[] ch = {'s', 'o', 'm', 'e', 't', 'h', 'i', 'n', 'g'};
String str = Arrays.stream(ch1).map(String::valueOf).collect(Collectors.joining());
```

### char[] -> Character[]
```java
char[] ch1 = {'s', 'o', 'm', 'e', 't', 'h', 'i', 'n', 'g'};
Character[] ch2 = new String(ch1, 0, ch1.length).chars().mapToObj(c -> (char)c).toArray(Character[]::new);
```

### Character[] -> char[]
```java
Character[] ch1 = {'s', 'o', 'm', 'e', 't', 'h', 'i', 'n', 'g'};
char[] ch2 = Arrays.stream(ch1).map(String::valueOf).collect(Collectors.joining()).toCharArray();
```

### T[] -> List<T>
```java
T[] arr;    // Generic임으로 T에 primitive 자료형은 사용 불가
List<T> list = Arrays.asList(arr);
```

### List<T> -> T[]
```java
List<T> list; // Generic임으로 T에 primitive 자료형은 사용 불가
T[] arr = list.toArray(new T[list.size()]);
```