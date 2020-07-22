---
layout: post
title:  "Interpark - Usage of JUnit when it's private method."
date:   2020-07-22 08:47:54 +0900
categories: interpark spring junit
---

## How to test the private method in junit.

> Actually you can't access the methods declared private thing. so You have to use the another way to test the below code.

```java

    public class NaverConvertApi {

        /** It calculate the distances between two times taken from parameters */
        private String getTimeInterval(String dateTimeStr1, String dateTimeStr2) throws Exception {
            SimpleDateFormat dateFormat = new SimpleDateFormat("YYYYMMddHHmm");
    
            long dateTime1 = dateFormat.parse(dateTimeStr1).getTime();
            long dateTime2 = dateFormat.parse(dateTimeStr2).getTime();
    
            return Math.abs(dateTime1 - dateTime2) / 60000 + "";
        }         
    }


```

> Everythings are okay. but your code is declared as the private thing. I will use the reflection technique for solving it.

```java

    public class NaverConvertApiTest {
    
        NaverConvertApi naverConvertApi = new NaverCovertApi();

        @Test
        public void GetTimeInterval_ShouldBe60() throws Exception {
            String dateTimeStr1 = "202007221635";
            String dateTimeStr2 = "202007221735";

            Method method = naverConvertApi.getClass().getDeclaredMethod("getTimeInterval", String.class, String.class);
            method.setAccessible(true);
   
            String result = (String) method.invoke(naverConvertApi, dateTimeStr1, dateTimeStr2);

            assertThat(result, is("60"));
        }
    }

```

> I think it is little complicated so someday i would like to introduce the easier technique for solving it using library named 'PowerMock'