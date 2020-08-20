---
layout: post
title:  "Interpark - The sort of Spring Bean injections"
date:   2020-07-15 10:00:00 +0900
categories: interpark spring bean injection
---

@Autowired, @Resource, @Inject 어노테이션으로만 자동적으로 객체를 주입할 경우 컨테이너에서 주입할 대상이 여러개여서 의존성을 주입하지 못하는 경우가 발생할 수 있다

@Primary로 같은 우선순위로 있는 클래스가 여러개가 있을 시 그 중 가장 우선순위로 주입할 클래스 타입을 선택할 수 있다.