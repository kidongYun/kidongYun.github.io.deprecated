---
layout: post
title:  "Interpark - Docker Commands"
date:   2020-08-24 00:00:00 +0900
categories: interpark docker command
---

> It's the summaries about the docker, which are gotten when i've struggled for getting the jvm option the java on the docker. 


### The useful command of Docker.

#### docker run

> This command is usually used when you want to create the docker image and runs it. It's a lot of the options so 
It's important to know about these options for using this command well.

> '-d' option is for executing your docker image on the background. 'd' spelling might means 'daemon'. 
Having you done this, You could see the process of the launching your image.

```
> docker run -d
```

> '-p' option is for setting the port of your docker container and host system. It is usually used like the below command
and first one is for the host system and the later is for the your container. they are connected each other.
so The data are shoot to the host port would be transferred to the container port was connected. 
38080 is for the host system and 38081 is for the container on the view of the below command.
 
```
> docker run -p 38080:38081
```

> '-e' option is for setting 'env' values. this values are often needed when you would like to get some data of outside of the container.
for example host's ip, host's name or the thing that we could not get in the container easily. and This spelling might means the 'environment variable'.

```
> docker run -e host.ip=123.123.123.123
```

> You can set the image name using '--name' option when you use the 'docker run' command. It will give the alias for your container
It might be needed well because the CONTAINER_ID are too difficult to remember. so Whenever you write your command on the docker CLI,
you could see yourself who would use the alias of the docker image. If you don't use this option, then your image alias will create automatically using the name pool.

```
> docker run -name kidongyun
``` 

> '-h' option is for giving the host name value to your container. Actually I don't know the default value but
I recommend use this option if you need to get the hostname of your host system in the docker container.

```
> docker run -h kidongyun
```

#### docker ps

> This command would be used a lot of the time, This command give to use the information related to the docker container.
for example the container name, id, the time when it's started, the execution status of the container and so on.
They are usually useful information to us. so Don't forget this command.

```
> docker ps
```

> Having you used '-a' option, It will give the all information about the containers included are not worked.
I've used this option when i need to remove the containers are not operated in my case.

```
> docker ps -a
```

#### docker stop

> You can stop your docker container using this command. after this, you might not be able to see this container on 'docker ps' command
for seeing this, you should attach the option '-a' when you use the 'docker ps' command.

```
> docker stop kidong yun
```

#### docker rm / docker rmi

> If you want to eliminate the docker container, then use this command. It's do similar with the linux command so You could get this easily.
and The second command is for removing the docker image not container.

```
> docker rm kidongyun
> docker rmi kidongyun
```

#### docker inspect [CONTAINER_ID] or [CONTAINER_NAME]

> Having you wanted to know about the detail of your docker container, This command will give them you want.
It has really a lot of the information like the status of network, environment variables, the information associated with host system
and the everything, which i think. 

```
> docker inspect kidongyun
```

#### docker exec -it [CONTAINER_ID] /bin/bash

> We can open the shell of the docker container using this command. '-it' options actually could be separated with '-i' and '-t'
but We usually use this like that. This options mean that I would like to interact with the my container and please open the tty
between host and the container. and We execute the /bin/bash program on the container and we could communicate using this shell named 'bash'

#### docker build --tag [IMAGE_ID]:[IMAGE_TAG] [DIRECTORY_PATH]

> You can create the images using this command. This command is needed the directory path included the DockerFile with the information 
related to the setting about the image. and You could also create the images differently as the tag name if you want.
in my company, This tag use as the release number of some business.

#### docker network ls

> We would see totally 4 types of the Docker network.

> Having you wanted to see the specification of your docker network information, Let follow the below command.

```
    > docker network ls
```

### The sort of network type.

> The communication way between host system and the containers is do similar with the concept of real network thing.
when you install the docker program, Your system would be installed new NIC(Network Interface Card might be virtual thing).
This NIC is called docker0 and you can see about these information at the below command.

```
    > route
```

#### bridge

> It's the default way of the docker network.

docker의 기본 network 방식은 bridge 이다. 
docker daemon을 실행하면 먼저 docker0 라는 bridge가 생성된다. 
컨테이너 생성하게 되면, 각 컨테이너 마다 고유한 network namespace 영역이 하나씩 생성되며, 
이때 docker0 bridge에 container의 인터페이스들이 하나씩 binding 되는 구조이다. 

> The below command could get the detail of the bridge network setting specification.
```
    > docker network inspect bridge
```

#### 2. host

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

#### 3. container

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

#### 4. none

--net=none 옵션으로 컨테이너를 생성하면 격리된 네트워크 영역을 갖긴 하지만, 인터페이스가 없는 상태로 컨테이너를 생성하게 된다. 


### dockerfile




> and the default setting of this is bridge.
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
