---
layout: post
title:  "Interpark - Create Custom AMI"
date:   2019-11-27 00:20 +0900
categories: interpark aws
---

### Create Custom AMI

> 이전에 만들었던 인스턴스 설정을 가지고 새로운 나만의 AMI를 생성할 수 있다.

<img src="/workspace/devlog/interpark/aws_create_ami/res/1.png">

> 아래와 같이 수정하고 Create Image 버튼 클릭

```

    Image name : web9

    Image description : web9

    No reboot : check 

```

<img src="/workspace/devlog/interpark/aws_create_ami/res/2.png">

<img src="/workspace/devlog/interpark/aws_create_ami/res/3.png">

> 위의 화면은 이미지가 생성되었음을 알려준다.

<img src="/workspace/devlog/interpark/aws_create_ami/res/3.png">

```
    Name : web9
```

> 왼쪽 사이드 메뉴에서 AMIs 로 들어간 다음 이번에 만든 AMI에 Name을 위와 같이 수정한다.