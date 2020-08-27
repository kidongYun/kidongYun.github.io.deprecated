---
layout: post
title:  "Interpark - The sort of Docker network types"
date:   2020-08-24 00:00:00 +0900
categories: interpark docker 
---

> We would see totally 4 types of the Docker network.

> Having you wanted to see the specification of your docker network information, Let follow the below command.

```
    > docker network ls
```

> and the default setting of this is bridge.

### 1. bridge

docker의 기본 network 방식은 bridge 이다. 
docker daemon을 실행하면 먼저 docker0 라는 bridge가 생성된다. 
컨테이너 생성하게 되면, 각 컨테이너 마다 고유한 network namespace 영역이 하나씩 생성되며, 
이때 docker0 bridge에 container의 인터페이스들이 하나씩 binding 되는 구조이다. 

> The below command could get the detail of the bridge network setting specification.

```
    > docker network inspect bridge
```

### 2. host

host 방식으로 컨테이너를 생성하면, 컨테이너가 독립적인 네트워크 영역을 갖지 않고 host와 네트워크를 함께 사용하게 된다. 
(네트워크 외 다른 환경은 기존과 동일하다)

> It's the launching of the 'httpd' program with the '--net=host' option.

```
    > docker run --net=host httpd web01
```

> You can check using the below command whether your starting is right or not.

```
    > docker exec web01 ip addr show
```

### 3. container

기존에 존재하는 다른 컨테이너의 network 환경을 공유하게 된다. 

root@~~# docker run --name web02 -d httpd

e1b4a085348ec8084b1c32d106eb66383a1fe18aa80b821d30181064d704574a

root@~~#

root@~~#

root@~~# docker ps -a

CONTAINER ID        IMAGE               COMMAND              CREATED             STATUS              PORTS               NAMES

e1b4a085348e        httpd               "httpd-foreground"   3 seconds ago       Up 2 seconds        80/tcp              web02

```
> docker run --name web03 --net=container:e1b4a085348e -d httpd
```

bridge 를 확인해 봐도 web03 인터페이스는 찾아볼 수 없다. web03은 따로 네트워크 환경을 할당하지 않았기 때문이다. 

### 4. none

--net=none 옵션으로 컨테이너를 생성하면 격리된 네트워크 영역을 갖긴 하지만, 인터페이스가 없는 상태로 컨테이너를 생성하게 된다. 

```
> docker run --name web04 --net=none -d httpd
```

> You can see the information of the network status of your system using 'route' command, It's offered from Linux not Docker

```
> route
```

[docker@tourDNDCvm71 ~]$ route
Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
default         gateway         0.0.0.0         UG    0      0        0 eth0
link-local      0.0.0.0         255.255.0.0     U     1002   0        0 eth0
172.17.0.0      0.0.0.0         255.255.0.0     U     0      0        0 docker0
180.70.96.0     0.0.0.0         255.255.255.0   U     0      0        0 eth0
