---
layout: post
title:  "Interpark - The briefly summary of Rest Api types"
date:   2020-07-15 10:00:00 +0900
categories: interpark spring bean injection
---

### GET


PUT 과 POST 를 이해하려면, idempotent 라는 개념의 도입이 필요하다. 한글로 직역하면 멱등의 정도 되시겠다. 수학적으로 이해하는 편이 쉬운데,

f(x) = f(f(x))

라 보면 된다. 다시 말해 몇 번이고 같은 연산 을 반복해도 같은 값이 나온다는 것. 이건 fault-tolerant API 를 디자인 하는데 있어서 굉장히 중요한 요소다.

이 때, 클라이언트가 원하는 operation 이 idempotent 하다면 다시 요청해도 상관 없다. 항상 같은 결과를 만드니까. 그러나 POST 는 idempotent 하지 않다.

### POST
따라서 이 연산을 수행하면 /dogs/2 에 생기고, 그 다음번엔 /dogs/3 등 매번 다른곳에 새로운 리소스가 생성될 수 있으므로, 이 연산은 idempotent 하지 않다.

### PUT
/dogs 의 프로퍼티가 name 과 age 뿐이라면, 이건 몇 번을 수행하더라도, 같은 결과를 보장한다. 다시 말해 idempotent 하다.

### PATCH
PUT 이 리소스의 모든 프로퍼티를 업데이트 하기 위해 사용된다면, PATCH 는 부분만을 업데이트하기 위해 사용한다. PUT 과 마찬가지로 리소스의 위치를 클라이언트가 알고 있을 때 사용한다

### DELETE