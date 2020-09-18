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