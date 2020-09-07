---
layout: post
title:  "Interpark - Dockerfile"
date:   2020-08-24 00:00:00 +0900
categories: interpark docker dockerfile
---

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