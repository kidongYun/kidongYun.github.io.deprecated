---
layout: post
title:  "Interpark - Summary of the study of Air Service (1/3)"
date:   2019-10-15 08:47:54 +0900
categories: interpark
---

### IATA (International Air Transport Association)

> 국제항공운송기구

### 대한민국의 민간항공 역사는 3가지의 패러다임으로 나뉜다.

```

    1. 대한국민항공사 ~ 대한항공

    2. 대한항공 ~ 아시아나

    3. 아시아나 ~ 지금

```

### Package 여행의 주요 구성요소

```
q
    // 여기서 항공 빼면 시체다.

    1. 항공
    2. 호텔
    3. 이용권 (eurail, bus, lesure ...)
    4. 가이드 = land
    5. 보험

```

### Package 여행이 쌀 수 있는 이유

```

    1. Group 항공권
    2. Deposit
    
    // Deposit은 여행사가 항공사에게 일정 항공석을 대량으로 싸게 구매하고 이를 여행사에서 판매하는 것
    
```

### B2B

> 기업과 기업 사이의 거래를 기반으로 하는 비즈니스 모델

### B2C

> 기업과 개인 다수들과의 거래를 기반으로 하는 비즈니스 모델

### CRS (Computer Reservation System)

> CLI 기반으로 만들어진 항공 예약 시스템, 미국의 세비어가 시초이며 지금에 이르러서는 항공뿐만 아니라 호텔 및 렌터카, 정보 제공 등으로 영역을 확대해 _'여행에 관한 종합적인 서비스를 제공하는 전산 예약 시스템'_

```

    1. 예약 기능 수행
    2. 판매망으로의 기능
    3. 항공사의 수익제고 수단
    4. 시장 지배의 유력한 수단

```

### 대한항공의 CRS는 TOPAS

### GDS (Global Distribution System)

> 유럽, 동남아시아 기반의 항공사들이 연합한 CRS ex) 유럽의 아마데우스..

### Proxy

> GDS, CRS 서비스는 전세계적으로 이루어져야 하기 때문에 중계기의 역할을 하는 서버가 필요한데 이를 Proxy Server라고 하고 Cache의 역할이라고 보면된다. <br><br> 그러나 단일 시스템에서 Cache Coherence를 맞추기 위해 Snoopy, Directory based Protocol들을 사용하듯이 Proxy Server를 많이 사용하게 되면 실제 서버와 데이터가 불일치 하는 경우가 생김으로 실제 비즈니스에서 문제가 발생할 수도 있다. <br><br> 그렇기 때문에 보다 빠른 업데이트를 위해 항공사의 인지도, 역량에 따라 CRS, GDS의 점유도가 다른것도 현실.

### Polling

> 하나의 장치가 충돌 회피 또는 동기화 처리 등을 목적으로 다른 장치의 상태를 주기적으로 검사하여 일정한 조건을 만족할 때 송수신 등의 자료처리를 하는 방식.

### Guide - Land사

> 항공권을 제외한 다른 여행 상품들을 Land사에서 미리 준비해두고 여행사와 제휴같은 걸 해서 상품 판매를 한다. <br><br> 특산품을 항상 사러가는 것은 이러한 Land사와 그 특산품 가게와 모종의 거래가 있다.

### 과거의 항공 프로세스

```

    Client -> Call -> Query -> Booking -> Payment -> Ticketing -> DM

```

### 과거의 항공 프로세스에서 변한 부분

```

    1. offline -> online
    2. 스케줄 + 요금을 동시에 보여줌
    3. booking + payment + ticketing 한번에
    4. DM -> e-ticket

```

### MCT (Minimum Connecting Time)

> 환승의 경우 두 항공기 연결에 필요한 최소한의 시간을 규정해 두는 것.

### PNR (Passenger Name Record) 

> 승객의 최소한의 정보를 CRS의 형식에 맞도록 예약전산시스템에 기록하는 행위

### 비행시간 = 도착지 GMT - 출발지 GMT

### 항공권의 양도는 불가하다.

### Booking Class

```

    R.  Supersonic
    F.  First Class
    C.  Business Class
    K.  Economy Class / Excursion
    G.  Economy Class / Group
    P.  First Class Premium
    J.  Business Class premium
    Y.  Economy Class / Normal
    M.  Economy Class / Promotional

```

### Booking Status

```

    OK - Confirmed
    RQ - Request
    NS - No-Seat
    SA - 예약 불가, 잔여좌석이 있는 경우

```

### 운임의 적용

> 항공운임은 출발지 국가의 통화로 공시되어 방향에 따라 운임이 달라짐.

### 운임마디 (Fare Component)

### 통화규정

> 여러 구간으로 구성된 여정의 경우 운임 산출을 위해 공통적인 단위로 환산할 필요가 생김.

### NUC = 출발지국 통화운임 / ROE

### ROE (IATA Rate of Exchange)

> 출발지 국가 통화로 되어있는 운임을 NUC로 환산시 사용되는 수치. IATA에 의해 1년에 4회 수정

### Tariff

> 항공운송업에서 Tariff란 항공운임과 그와 관련된 규정을 의미.

```

    1. Air Tariff (AT) : 전세계적으로 많은 항공사에서 공식 Tariff 책자로 사용.
    
    2. Airline Passenger Tariff (APT) : 유럽에서 많이 쓰는 Tariff.

    3. ATPCO Passenger Tariff Set : Squire Tariff 사에서 발간하는 Tariff. 미국, 캐나다 지역의 국내선 운임의 수록, 책자가 아닌 전산 Tape형태로 제공.
```

### Add-On (부가운임)

> 비교적 요객 운송량이 적은 도시로의 여행, Tariff 책자에 Fare에 대해서 공시되지 않은 경우 적용.


### MPM

> 두 지점 간의 공시운임으로 여행할 수 있는 최대 허용 거리. 실제 거리보다 15% ~ 20% 높게 산정한다.

### TPM

> 실제거리

### TPM Deduction

> 특정도시는 EMS 계산시 Total TPM에서 일정 거리를 공제한 후 MPM과 비교.

### EMS (Excess Mileage Surcharge)

> 승객이 여러 지점을 경유하여 전체 구간거리 Total TPM이 MPM보다 큰 경우 적용. 일종의 할증

### IATA 기준 3개의 영역

```

    Area 1 : 북미, 중미, 남미, 카리브 해

    Area 2 : 유럽, 중동, 아프리카

    Area 3 : 한국/일본, 동남 아시아, 남아시아 대륙, 남서 태평양

```

### 여정의 종류

```

    1. 편도여정 (OW One Way)
    2. 왕복여정 (RT round-trip)
    3. 일주여정 (CT circle-trip)
    
```