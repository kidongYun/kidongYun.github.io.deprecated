---
layout: post
title:  "Interpark - The summary of the query on oracle"
date:   2020-9-9 00:00:00 +0900
categories: interpark db oracle query
---

### UNION
> It would resort when your select queries are merged.

```

SELECT DCI_TKT_CAR, DCI_USE_YN, DCI_CLASS, DCI_CLASS_DESC FROM DOM_CLASS_INFO WHERE LENGTH(DCI_CLASS) = 1 AND DCI_TKT_CAR = 'LJ'
UNION
SELECT DCI_TKT_CAR, DCI_USE_YN, DCI_CLASS, DCI_CLASS_DESC FROM DOM_CLASS_INFO WHERE LENGTH(DCI_CLASS) != 1 AND DCI_TKT_CAR = 'LJ' AND DCI_CLASS_DESC = '할인석'
UNION
SELECT DCI_TKT_CAR, DCI_USE_YN, DCI_CLASS, DCI_CLASS_DESC FROM DOM_CLASS_INFO WHERE LENGTH(DCI_CLASS) != 1 AND DCI_TKT_CAR = 'LJ' AND DCI_CLASS_DESC = '특가석'

```

### UNION ALL
> It should keep the sorting status each the result of queries.

> And You should remember just one thing, which you couldn't use the 'order by' keyword for each select queries when 
you want to use the 'union' or 'union all' keyword.

```

SELECT DCI_TKT_CAR, DCI_USE_YN, DCI_CLASS, DCI_CLASS_DESC FROM DOM_CLASS_INFO WHERE LENGTH(DCI_CLASS) = 1 AND DCI_TKT_CAR = 'LJ'
UNION ALL
SELECT DCI_TKT_CAR, DCI_USE_YN, DCI_CLASS, DCI_CLASS_DESC FROM DOM_CLASS_INFO WHERE LENGTH(DCI_CLASS) != 1 AND DCI_TKT_CAR = 'LJ' AND DCI_CLASS_DESC = '할인석'
UNION ALL
SELECT DCI_TKT_CAR, DCI_USE_YN, DCI_CLASS, DCI_CLASS_DESC FROM DOM_CLASS_INFO WHERE LENGTH(DCI_CLASS) != 1 AND DCI_TKT_CAR = 'LJ' AND DCI_CLASS_DESC = '특가석'

```

### LENGTH([FIELD_NAME])
> Having you wanted to know the length of some field, You can use this.

```
    LENGTH('A') = 1         // It would be true. 
``` 

### COUNT(*) AS CNT
```java

DBResultSet rset = db.executeQuery(sql.toString(), new Object[] { prId });

if(rset.next()){
    return rset.getInt("CNT");
}

```

### INSTR()

오라클에서

내가 원하는 컬럼의 값에 내가 원하는 구문이 포함되어 있는 여부를 확인할 때 사용한다.
그냥 포함되어 있는 여부를 확인하고 싶다면 'LIKE' 함수를 사용하면 되지만,
만약 포함되어 있고, 포함되어 있는 위치가 어디인지 알고 싶다면?

그럴때 사용하는 함수가 'INSTR()' 함수이다.
사용하는 방법은 생각외로 아주 간단하다
INSTR('비교할 대상', '비교하고자하는 값', 비교를 시작할 위치, 검색된 결과의 순번)

SELECT INSTR('TEST SAMPLE CODE', 'E', 1, 1) AS INSTR_RS FROM DUAL
- 'TEST SAMPLE CODE'라는 구분에서 'E'를 찾는데 1부터 시작을 해서 1번째 찾아지는 'E'의 위치는 어디인가?

출처: https://joke00.tistory.com/97 [Smile virus]

### TO_CHAR(SYSDATE, 'D')

> D 만 주면 요일이 번호 순으로 나온다. 일 -> 1, 월 -> 2 ...



### PIVOT

### PIVOT XML

### AS ""

### WITH


### Dynamic Query. (Procedure)

### PL/SQL

PL/SQL (Procedural Language extension to SQL)

 - SQL을 확장한 절차적 언어(Procedural Language)이다. 

 - 관계형 데이터베이스에서 사용되는 Oracle의 표준 데이터 엑세스 언어로, 프로시저 생성자를 SQL과 완벽하게 통합한다.
 
 블록 단위의 실행을 제공한다. 이를 위해 BEGIN과 END;를 사용한다. 그리고 마지막 라인에 /를 입력하면 해당 블록이 실행된다.
 
  - 변수, 상수 등을 선언하여 SQL과 절차형 언어에서 사용
 
  - 변수의 선언은 DECLARE절에서만 가능하다. 그리고 BEGIN 섹션에서 새 값이 할당될 수 있다.
 
  - IF문을 사용하여 조건에 따라 문장들을 분기 가능
 
  - LOOP문을 사용하여 일련의 문장을 반복 가능
 
  - 커서를 사용하여 여러 행을 검색 및 처리
 
  - [ PL/SQL에서 사용 가능한 SQL은 Query, DML, TCL이다. ]
 
    DDL (CREATE, DROP, ALTER, TRUNCATE …), DCL (GRANT, REVOKE) 명령어는 동적 SQL을 이용할 때만 사용 가능하다.

ECLARE (선언부)

PL/SQL에서 사용하는 모든 변수나 상수를 선언하는 부분으로서 DECLARE로 시작


=> 변수/상수/커서 등 을 선언 

옵션

 BEGIN (실행부)	
 절차적 형식으로 SQL문을 실행할수있도록 절차적 언어의 요소인 제어문, 반복문, 함수 정의 등 로직을 기술할수있는 부분이며 BEGIN으로 시작

필수

 EXCEPTION (예외 처리부)

PL/SQL문이 실행되는 중에 에러가 발생할수있는데 이를 예외 사항이라고 한다.


이러한 예외 사항이 발생했을때 이를 해결하기 위한 문장을 기술할수있는 부분 

옵션

 END (실행문 종료)

 	
필수

-- 프로시저 output 매개변수 사용하기

    => 프로시저를 실행하여 특정결과값을 out변수에 저장하여 보냄. (프로시저에서 실행환경으로 값을 전달(반환)) 

 

-- out있는 프로시저 작성방법

 

     CREATE PROCEDURE 프로시저이름(

     변수이름 IN 데이터타입, 변수이름 IN 데이터타입, .... --in 생략가능

    변수이름 OUT 데이터타입, 변수이름 OUT 데이터타입 ...----프로시저를 호출하는곳으로 값을 보낸다.

 

     )

     IS

     [

     변수이름 데이터타입;  -- 프로시저내에서 사용할 변수선언

     변수이름 데이터타입;

     변수이름 데이터타입;

      ..

      ]

      BEGIN

       기능 구현;

      END;


### EXEC 오류

SQL PLUS에서는 EXEC SCOTT.PROC_TEST;

를 수행할 시 에러가 뜨지 않고 정상적으로 수행된다

 

이게 왜 이러냐면 

EXEC는 SQL PLUS에서만 사용 가능한 명령어이기 때문에

DBeaver 같은 툴에서 쓰려고 하면 에러가 뜨는 것이다


### DBMS_OUTPUT.Put_line

### ALTER TABLE 테이블 명 MODIFY(필드명 VARCHAR2(4000));

### CONCAT(SUBSTR(DCI_CLASS, 1, 1), LPAD(SUBSTR(DCI_CLASS, 2), 2, '0'))