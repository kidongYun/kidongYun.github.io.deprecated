---
layout: post
title:  "Interpark - Docker Commands"
date:   2020-08-24 00:00:00 +0900
categories: interpark docker command
---

### Dockerfile vs Image vs Container

> I thought that they are really different things before, but It's not true. Actually they are like the concept of the program and process


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

Kernel IP routing table
Destination     Gateway         Genmask         Flags Metric Ref    Use Iface
default         gateway         0.0.0.0         UG    0      0        0 eth0
link-local      0.0.0.0         255.255.0.0     U     1002   0        0 eth0
172.17.0.0      0.0.0.0         255.255.0.0     U     0      0        0 docker0
180.70.96.0     0.0.0.0         255.255.255.0   U     0      0        0 eth0

```

#### bridge

> It's the default way of the docker network. This way always use the docker0 interface. It's the new virtual network area.
So They've been in the independent place. It means you cannot access them at anywhere, anytime. the docker0 network usually 
has the 172.17.0.0/16 network. and whenever you add the new host, their ip is increase from the 172.17.0.1. Every container has
the their own network area. so It's also impossible to communicate with each containers. in other words, The bridge network type is
that give to each containers independent network area.

> The below command could get the detail of the bridge network setting specification.
>
```
    > docker network inspect bridge
```

#### host

> This way share the network area the host and each containers are used this type. You have to use the option '--net=host'
like the below.

```
    > docker run --net=host httpd web01
```

> You can check using the below command whether your starting is right or not.

```
    > docker exec web01 ip addr show
```

#### 3. container

> This way share the network area with another container.

#### 4. none

> Having you picked this option, This container would have the isolated network, which is not with interface.
>
```
> docker run --name web04 --net=none -d httpd
```

[docker@tourDNDCvm71 ~]$ route




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
