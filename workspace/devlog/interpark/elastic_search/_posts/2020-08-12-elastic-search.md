---
layout: post
title:  "Interpark - ElasticSearch"
date:   2020-08-12 08:47:54 +0900
categories: interpark ElasticSearch Kibana Logstash
---

> ELK 는 Elasticsearch + Logstash + Kibana 세개의 오픈 소스 프로젝트를 하나의 스택으로 쓰는 것

> 노드라는 걸 기반으로 데이터를 저장하고 한 데이터는 복사본, 원본 을 위해 여러개의 노드로 저장. 이 노드들이 유기적으로 연결되고 함으로써 확장성을 가진다고 함.

> 각 노드는 1개 이상의 데이터 원본과 보사본을 서로 다른 위치에 나누어 저장

> 인덱스 = RDBMS의 데이터베이스에 대응

> JSON DOCUMENT / RESTFUL API

> 하나의 클러스터는 여러개의 노드. 여러대의 서버가 하나의 클러스터를 구성할 수 있으며 그 반대도 가능.

> 노드는 마스터 노드와 데이터 노드로 구분, 마스터노드는 전체 클러스터 상태의 메타 정보를 관리. 데이터 노드는 실제 데이터가 저장되는 노드

> 9200번 부터 REST API를 위한 HTTP 통신 포트 할당.

> 9300번 부터 노드간 바인딩을 위한 포트로 할당.

> 일반적으로 데이터노드는 외부 접근을 차단

> 젠 디스커버리?

> 샤드는 데이터 검색을 위해 구분되는 최소 단위

> 멀티 테넌시를 활용하여 여러 인덱스를 동시에 검색 가능 인덱스들을 쉼표로 구분하여 입력.

> AND 와 OR를 사용하여 조건 명령 가능 앞 뒤에 공백을 넣어 지정 (%20)

> q 가 질의 부분

> sort 등의 옵션 사용 간ㅇ.

> URI 방식으로 검색을 할수도 있고 BODY 안에 DSL 이라는 쿼리 형태로 날릴수도 있다.

> Bulk API 라는걸 활용해서 데이터 Insert 하는것 같다.

> Query DSL 문법

> 모든 Document 를 출력한다 SELECT * FROM TABLE 같은 느낌.
```JSON
    {
        "query" : {            
            "match_all" : {}
        }
    }

```

```JSON
    {
        "query" : {            
            "match" : { "DATE" : "202008131200" }
        }
    }
```

```JSON
{
    "query" : {
        "bool" : {
            "must" : [
                { "match" : { "AIRLINE" : "TW" }}
            ]
        }
    }
}
```

```JSON
{
    "query" : {
        "bool" : {
            "must_not" : [
                { "match" : { "AIRLINE" : "TW" }}
            ]
        }
    }
}
```

```JSON
{
    "query" : {
        "bool" : {
            "must_not" : [
                { "match" : { "AIRLINE" : "TW" }}
            ]
        }
    }
}
```

```JSON
{
    "query" : {
        "bool" : {
            "must" : [
                { "match" : { "AIRLINE" : "RS" }},
                { "match" : { "TYPE" : "RetrieveRefund" }},
                { "match" : { "PNR" : "JY0S4" }}
            ],
            "filter" : {
            }
        }
    }
}
```
