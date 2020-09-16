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