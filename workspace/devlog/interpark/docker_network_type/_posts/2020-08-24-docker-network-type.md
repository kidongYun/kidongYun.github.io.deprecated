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

eth0 의 ip 정보 가져오기
ifconfig | grep -A 1 'eth0' | sed -n '2, 2p' | cut -c 14-25

Docker 컨테이너는 단지 명령만 실행하고 그 결과만 보여주는 기능을 수행한다.[1]

즉, 앞의 예제에서는 우분투의 docker image에서 설정된 default 실행 명령[2]인 "/bin/bash" 를 실행하고 그 결과를 출력하고 종료된 것이다. "/bin/bash" 명령은 표준 출력(STDOUT) 또는 표준 에러(STDERR)로 아무것도 출력을 하지 않기 때문에 사용자가 보기에는 실행이 안된 것과 같은 느낌으로 다가 온다. 다음을 실행해보면 무엇을 말하는 것인지 알 수 있다.

$ docker run --name ubuntu_test ubuntu "env"
PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
HOSTNAME=52c48f363166
no_proxy=*.local, 169.254/16
HOME=/root


ENTRYPONINT 설정을 해주면 해당 컨테이너가 뜰때 거기에 설정된 쉘 스크립트가 실행된다.


 리눅스 배포판의 유저 랜드만 설치된 파일을 베이스 이미지라고 하는데, 베이스 이미지에 프로그램 실행에 필요한 라이브러리, 소스를 설치한 뒤 하나의 파일로 만든 것을 docker 이미지라고 합니다
 
 컨테이너는 이미지 파일을 실행한 상태입니다
 
 dockerfile -> docker image -> docker container
 
 가상 머신 자체는 완전한 컴퓨터이기 때문에 이미지 안에 OS가 포함되어 이미지 용량이 커집니다. 또한 이미지를 생성하고 실행하는 기능만 있을 뿐 배포와 관리 기능이 부족하다는 단점도 있습니다.
 
 
 
 
  그러나 다음과 같은 상황에서는 완전히 의존성을 제거한 단일 파일만 넣은 Image는 만드는 것이 거의 불가능에 가깝다.
 
 범용의 Application Package에 대한 Container화
 범용의 Web Framework을 사용하는 Web Application의 Container화
 범용의 Interpreter를 사용하는 Script로 작성된 Application의 Container화
 범용 Application이나 Framework 등은 대체로 특정 시스템을 Target으로 한 미리 Compile된 Binary Package를 제공하게 되는데, 이런 경우 대부분의 경우에 해당 Target System에 대한 Library 의존성을 갖게 된다. 이렇게, 일반적인 Application을 Container화 하기 위해서는 Framework, Interpeter는 물론, 이들의 실행 의존성을 제공할 기반환경을 함께 Image에 담을 필요가 있다.
 
 docker run -h CONTAINER
 
 CONTAINER 라는 호스트이름을 가진 컨테이너를 띄울수 있다.
 

[docker@tourDNDCvm71 launcher]$ docker inspect tour-air-api-product | grep IPAddress
            "SecondaryIPAddresses": null,
            "IPAddress": "172.17.0.2",
                    "IPAddress": "172.17.0.2",
inspect 에서 보여주는 자세한 정보중 grep을 활용해 필요한 정보만 필터링.


[docker@tourDNDCvm71 launcher]$ docker diff tour-air-api-product
C /tmp
D /tmp/hsperfdata_atom
A /tmp/hsperfdata_atom/1
D /tmp/undertow-docbase.7650229104013131703.38080
D /tmp/undertow.2647153786427301565.38080
C /var
C /var/log
D /var/log/tour-air-api-product
C /webapp
C /webapp/config/scouter.conf

컨테이너 내부에서 변경된 파일들의 목록들이 나타난다.

docker run 할때 -d 를 안주면 백그라운드에서 실행이 되지 않으니 바로 쉘이 해당 컨테이너의 쉘로 들어가게 된다.



Docker file

FROM busybox:latest
-> busybox:latest 라는 이미지로 부터 라는 뜻인거 같다.

빌드 컨텍스트란 빌드하는 영역 을 말하는거 같은데 보통 디렉토리를 제공.

ENV: Dockerfile에서 사용할 환경변수를 설정합니다. 설정한 환경변수는 ${ENV_NAME} 또는 $ENV_NAME의 형태로 사용할 수 있습니다. 

FROM ubuntu:14.04 ENV test /home WORKDIR $test // WORKDIR /home RUN touch $test/mytouchfile

VOLUME
빌드된 이미지로 컨테이너를 생성했을 때 호스트와 공유할 컨테이너 내부의 디렉터리를 설정합니다. 
[]배열형태도 되면 뒤로 쭉 나열해도 됩니다. 

FROM ubuntu:14.04 RUN mkdir /home/volume VOLUME /home/volume

ARG
build명령을 실행할 때 추가 입력을 받아 Docker 내에서 사용될 변수의 값을 설정합니다. build시에 --build-arg를 통해 설정할 수 있습니다. my_arg처럼 build할 때 입력받을 수도 있지만 my_arg2처럼 기본값으로 설정할 수 있습니다. 

FROM ubuntu:14.04 ARG my_arg ARG my_arg2=value2 RUN touch ${my_arg}/mytouch build시에 docker build --build-arg my_arg=/home -t myarg:0.0 ./

USER
USER로 컨테이너 내에서 사용될 사용자 계정의 이름이나 UID를 설정하면 그 아래의 명령어는 해당 사용자 권한으로 실행됩니다. 일반적으로 사용자의 그룹과 계정을 생성한 뒤 사용합니다. 루트 권한이 필요하지 않다면 USER를 사용하는 것이 좋다. 

COPY
COPY는 로컬 디렉터리에서 읽어 들인 컨텍스트로부터 이미지에 복사하는 역할을 합니다. 

ADD
ADD는 COPY와 같은 역할을 합니다. 그러나 COPY는 로컬의 파일만 이미지에 추가하는 반면에 ADD는 외부 URL, tar파일 에서도 파일을 추가할 수 있습니다. 

ENTRYPOINT
CMD와 같이 컨테이너가 시작할 때 수행할 명령어를 지정한다는 점에서 같습니다. 그러나 ENTRYPOINT는 cmd를 인자로 받아 사용할 수 잇는 스크립트의 역할을 할 수 있다는 점에서 다릅니다. 
entrypoint: 없음, cmd: /bin/bash
docker run -it --name no_entrypoint ubuntu:14.04 /bin/bash 

entrypoint: echo, cmd: /bin/bash
docker run -it --entrypoint="echo" --name yes_entrypoint ubuntu:14.04 /bin/bash
첫경우에는 entrypoint 옵션이 없이 실행하였다. 그래서 cmd 명령어만 실행되었다. 그러나 두번째 경우에는 echo를 entrypoint로 지정해주었다. 그래서 container를 만들어보면 echo /bin/bash로 실행되어 shell로 들어가는 것이 아닌 /bin/bash로 출력된다. 


위와 같이 명령어를 실행시킬 수 있을 뿐만 아니라 script 파일을 실행시킬 수 있습니다. 

docker run -it --name entrypoint_sh --entrypoint="/test.sh" ubuntu:14.04
해당 파일이 컨테이너에 존재해야합니다. 그리고 Dockerfile에 작성하여 실행하는 방법도 있습니다. 

FROM ubuntu:14.04 
RUN apt-get update 
RUN apt-get install apache2 -y 
ADD entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh // 실행할 수 있도록 권한 부여
ENTRYPOINT ["/bin/bash", "/entrypoint.sh"]
주의할 점 

배열과의 일반 명령어의 차이 

CMD echo test
-> /bin/sh -c echo test //실제 실행되는 명령어 

ENTRYPOINT /entrypoint.sh
/bin/sh -c /entrypoint.sh //실제 실행되는 명령어 

CMD ["echo", "test"]
-> echo test
ENTRYPOINT ["/bin/bash", "/entrypoint.sh"]
-> /bin/bash /entrypoint.sh

CMD
container가 만들어질 때 실행할 명령어를 설정한다.

RUN

WORKDIR
명령어등을  실행할 폴더를 지정합니다.  

FROM
FROM instruction을 사용하여 base image를 지정한다. 주로 ubuntu 같은 OS를 지정하게 된다. Base image를 지정할때는 ubuntu:16.04 처럼 OS와 버젼까지 정확히 지정해주는것이 좋다.
태그를 지정하지 않으면 latest가 DEFAULT
