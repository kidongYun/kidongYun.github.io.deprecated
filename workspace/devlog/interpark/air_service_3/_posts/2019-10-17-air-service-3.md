---
layout: post
title:  "Interpark - Summary of the study of Air Service (3/3)"
date:   2019-10-17 08:47:54 +0900
categories: interpark
---

### GDS 종류

```

    1. Amadeus - Topas

    2. Galileo - Travelport

    3. Sabre - Asiana Sabre

```

### SEG FEE가 가장 높은 GDS는 Galileo

> Segment는 여정에서 각 항공노선 하나 하나를 의미함.

```

    ICN - NRT - OSA = 2Segment

```

### Tariff 책자에 운임정보를 반영할 때 변수가 될 수 있는 요인은 _거리_ 와 _수요_

> ex) 거리가 멀어도 수요가 더 많기 때문에 더 싼 경우가 있음.

### CODE SHARING

> 게이트가 없거나 해당 노선에 운항이 없을 경우 항공사 간의 제휴를 맺는 공동운항이 있음.

### IATA의 역할

```

    1. 노선 운임 결정.

    2. 대리점 가입 (OTA)

    3. BSP (Billing Settlement Plan) 정산 / ATR이 아닌 경우 정산은 IATA 주관
        - OTA & Airline
        - Airline & Airline

```

### OTA의 수입원

```

    1. VI (항공사 측의 인센티브)
    
    2. SEG FEE

    3. 발권, 취소 수수료

```

### ACM은 흑자난 경우 ADM는 적자난 경우

> ADM은 예약할때와 결제할때 금액이 다르거나, 수동 결제 실수 시 발생한다.

### 독일항공 / LH / 루프트한자

### NDC (New Distribution Capability)

> GDS는 항공편 스케줄, 좌석 예약만 가능한 예전 버전 NDC는 IATA에서 추진하는 항공상품 판매 표준화 기술로 보다 더 다양한 정보(수하물 추가요금, 좌석 지정, 기내식 주문) 를 제공할 수 있다.

### Shopping 개념 도입 (요금 + 스케줄)

```

    1. Galileo : e-pricing
    
    2. Amadeus : master price

    3. Sabre : BFM

```

> Tariff 책자보다 Query 수가 적다. Traffic을 줄이기 위해서 최적의 검사만 진행

### @Controller, @Service, @Repository

> Class에 Controller라는 것을 명시하는 Annotation <br><br> @Controller는 웹어플리케이션에서 컨트롤러 역할을 하는 클래스에 적용, @Service 로직을 수행할 클래스에 적용, @Repository DAO같은 보통 데이터베이스와 관련된 클래스에 적용 <br><br> bean 등록

### @SuppressWarning

> 컴파일러가 일반적으로 경고하는 내용을 제외 시킬때 사용

### @XStreamAlias

> XML 에서 Java Object 변환을 위한 라이브러리

### SLF4J

> Java Logging 모듈들의 추상체

### LOMBOK Annotation

> Model (DTO, VO, Domain) Object를 만들때, 멤버 필드에 대한 Getter, Setter, toString, Generator 관련된 코드를 자동 생성해주는 라이브러리

### VO (Value Object)

> DTO와 동일한 개념이지만 Read-Only 속성을 가진다.

### MyBatis

> 자바의 관계형 DB 프로그래밍을 좀 더 쉽게 할 수 있게 도와주는 개발 프레임워크. / JDBC는 재사용성이 안좋은 단점 존재

### Spring Batch 

> 단발성으로 대용량의 데이터를 처리하기 위한 프레임워크

### Spring MVC

> 비지니스 로직을 최대한 효율적으로 구현하기 위한 프레임워크

### @Autowired, @Resource

> 어플리케이션에서 필요로하는 자원을 자동 연결시 사용

### ElasticSearch

> Inverted Index

### Marshalling

> 객체의 메모리 구조를 저장하거나 전송을 위해서 적당한 자료형태로 변형

### Serialization

> 객체를 Byte Stream으로 변환

### JAXB (Java Architecture for XML Bind)