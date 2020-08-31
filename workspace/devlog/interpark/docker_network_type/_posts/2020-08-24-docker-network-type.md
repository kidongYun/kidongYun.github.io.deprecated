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


도커를 설치하게 되면 생기는 일
Docker를 설치한 후 Host의 네트워크 인터페이스를 살펴보면 docker0라는 가상 인터페이스가 생긴다.


[docker@tourDNDCvm71 ~]$ docker network ls
docker 네트워크 구성이 어떤것들이 있는지 보기위한 커맨드

[docker@tourDNDCvm71 ~]$ docker inspect CONTAINER_ID
해당 container 에 대한 많은 정보들을 볼수 있는데 여기에 IP정보도 포함되어있다.

docker env 라는 필드에 초기에 환경값을 넣어줄 수 있음. 여기에 호스트 IP값을 넘겨주고
그다음에 컨테이너 안에서는 이 env값을 참조. 그 후에 java에서는 초기에 톰캣 띄울때 -D 옵션으로 이 값을 주고
java 안에서 이 파라미터 값을 get

docker env
도커를 이용하여 컨테이너를 띄울 때, 각 컨테이너는 독립적.
기본적을 ㅗ달느 컨테이너의 정보를 몰긔때문에 ㅇDocker를 구동하는 호스트에서 환경 변수르 ㄹ통해 외부 정보를 알려줘야할 경우
이 ENV를 활용

DockerFile


[docker@tourDNDCvm71 ~]$ docker run --name test -e HOST_IP=180.70.96.71 -p 38082:38082 -d tour-air-api-product:dev
tour-air-api-product:dev 라는 이름의 이미지를 실행한다.
--name 컨테이너의 이름은 test 로 한다.
-e 환경변수 값으로 HOST_IP = 180.70.96.71 를 넘긴다.
-p 포트는 호스트 38082 대 컨테이너 38082 로 한다.
-d : 백그라운드 실행한다

ENTRYPOINT
컨테이너가 시작되었을 때 스크립트 혹은 명령을 실행합니다. 즉 docker run 명령을 ㅗ컨테이너를 생성하거나, docker start 명령으로 정지도니 커네티어늘 시작할 때 실행.
Dockerfile에서 단 한번만 사용 가능



[docker@tourDNDCvm71 dev]$ docker images
현재 로컬에 존재하는 docker image 들 출력


docker exec
docker exec 명령을 이용하면 된다.  docker exec 는 container에 특정 명령을 실행할 수 있는 것인데 이때 명령을 /bin/bash 라고 하면 된다. 

우리가 "접속" 하고 싶다는 의미는 해당 container 의 shell 에 접속하겠다는 의미이다. 

주의해야할 것은 docker exec 명령을 할때 옵션으로 -it 라고 덧붙여 주어야 한다. 이는 STDIN 표준 입출력을 열고 가상 tty (pseudo-TTY) 를 통해 접속하겠다는 의미이다. 



root@~~# docker exec -it  c456623003b1 /bin/bash

root@c456623003b1:~# 



위와 같이 hostname이 해당 container id로 바뀐 것을 볼 수 있다. 즉, container 내부에 접속한 상태라는 것이다. 
마지막으로 접속을 종료할때는 간단히 exit 명령을 통해 가능하다. 


도커에 톰캣


shell은 명령어 해석기로 시스템과 사용자간에 대화를 주고받을 수 있도록 도와주는 프로그램.
bash는 shell 중 하나.

docker exec -it CONTAINER_ID /bin/bash
는 결국 해당 컨테이너 안에있는 bash 프로그램을 실행시키는 명령어임.

