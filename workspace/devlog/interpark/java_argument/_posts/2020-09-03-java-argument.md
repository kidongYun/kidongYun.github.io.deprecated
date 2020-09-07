---
layout: post
title:  "Interpark - Java aruments"
date:   2020-09-03 10:00:00 +0900
categories: interpark java arguments
---

Jvm argument : -D 로 시작. jvm 설정에 관련된 argument
ex. java -jar -Dfoo heumsi-springboot.jar
Application argument : -- 로 시작. 어플리케이션 설정에 관련된 argument
ex. java -jar --bar ... heumsi-sprinboot.jar

Properties
resources 디렉토리 안에 있는 application.properties 파일에 키 = 값 형태로 일종의 설정 값들을 따로 구분하여 저장해놓을 수 있다.
이를 코드에서는 @Value("${key}") 로 가져올 수 있다.
예를 들면 다음과 같다.

// application.properties
heumsi.name = heumsi
// SampleRunner.java

@Value("${heumsi.name}")
private String name; // name 에 heumsi 가 바인딩 됨.
...

Environment
Environment 객체를 가져와 .getProperty("key") 메쏘드로 설정 값을 가져올 수 있다.

@Autowired
Environment environment;

private String name = environment.getProperty("heumsi.name"); 
// name 에 heumsi 가 바인딩 됨.
...