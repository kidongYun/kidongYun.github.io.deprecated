---
layout: post
title:  "Interpark - Configuration of Network for AWS"
date:   2019-11-20 08:47:54 +0900
categories: interpark aws
---

## AWS Network 구성하기

<img src="/workspace/devlog/interpark/config_network_aws/res/0.png">

```
    구성 순서

    1. AWS 접속
    2. Create VPC
    3. Create Subnet
    4. Create Internet Gateway and Attach this to VPC
    5. NAT Gateway 생성 
    6. Create Route Table
    7. Subnet, Route Table 매핑
```

### 1. AWS Management Console 접속

> 링크에 접속하여 로그인

[AWS Management Console](https://ap-northeast-2.console.aws.amazon.com/console/home?region=ap-northeast-2#)

> 위 링크를 따라서 AWS Management Console 웹사이트를 접속하자. 처음 접속하게되면 아마도 로그인 화면이 뜰텐데, 본인의 계정이 있다면 그 계정을 사용하고 없다면 새롭게 만들도록 하자. 새롭게 만드는 경우 해외결제가 가능한 mastercard, visa 카드 정보가 필요하다. free version을 사용하게되면 실제적으로 결제가 되지는 않음으로 부담가질 필요는 없다. 다만 확인 용도로 처음에 1달러를 가져간다. 최종적으로 아래와 같은 화면으로 접속되었다면 성공이다. 추가적으로 웹사이트 하단 왼쪽부분에 언어를 바꿀수 있는데 가능하다면 영어를 사용하자. AWS는 국제적 서비스로 다양한 언어를 지원하지만 영어가 가장 빠르게 업데이트됨으로 다른 언어들은 보는 화면들의 내용이 최신이 아닐수도 있다.

<img src="/workspace/devlog/interpark/config_network_aws/res/1.png">

### 2. VPC 생성

> VPC는 Virtual Private Cloud의 약자이며 AWS 클라우드에서 고객에게 논리적으로 격리된 공간을 제공하는 개념이다. 즉 실제 세상에서 내가 집을 사면 그 집안에 내가 원하는 가구를 배치할 수 있듯 AWS라는 세상에서는 VPC라는 논리적 공간을 고객에게 제공해준다. 기존에 존재하던 서버 호스팅 서비스, 클라우드 서비스와는 다르게 AWS는 이 VPC의 네트워크 환경을 직접 설계할수 있도록 구성되어 있다. 실제로 우리가 네트워크를 구성하기 위하여 스위치 장비를 사서 각 터미널들을 물리고 외부 인터넷과 통신하기 위해서 라우터를 구성하듯 AWS는 이를 VPC라는 개념 아래에서 이들을 모두 구성해낼수 있다. <br><br> VPC을 사용하게되면 이는 특정 사용자의 리소스들이 논리적으로 격리된 네트워크에서 생성되기 때문에 다른 사람들은 접근이 불가능하다.

<img src="/workspace/devlog/interpark/config_network_aws/res/2.png">

> Find Services 검색란에서 VPC 검색

<img src="/workspace/devlog/interpark/config_network_aws/res/3.png">

> 왼쪽 메뉴에서 Your VPCs 선택

<img src="/workspace/devlog/interpark/config_network_aws/res/4.png">

> 위 이미지가 현재 로그인된 계정에 VPC 설정 상태를 보여주는 화면이다. 처음 가입했음에도 기본적으로 구성되어있는 VPC 하나가 이미 보인다. 우리는 VPC 생성 방법을 알기 위해 새로운 VPC를 만들것이다. <br><br> 왼쪽 상단에 Create VPC 버튼을 클릭하자.

<img src="/workspace/devlog/interpark/config_network_aws/res/5.png">

> 생성하려는 VPC의 name과 ip주소를 입력하자.

```
    Name tag : ip-99

    IPv4 CIDR block* : 10.0.0.0/16
```

> 입력을 다 했다면 오른쪽 하단에 Create 버튼 클릭

<img src="/workspace/devlog/interpark/config_network_aws/res/6.png">

> 초록색 화면에 'The following VPC was created: VPC ID ...' 이게 나오면 새로운 VPC 생성이 완료된것이다.

### 3. Subnet 생성

<img src="/workspace/devlog/interpark/config_network_aws/res/7.png">

> 왼쪽 메뉴에 Subnets 클릭하면 위의 화면이 보인다. 보면 처음에 생성되어 있던 VPC에 3개의 subnet이 구성되어있는 것을 볼 수 있다. 우리는 새로 만든 VPC를 위해 새로운 Subnet을 만들자. <br><br> 위의 화면에서 Create subnet 버튼 클릭

<img src="/workspace/devlog/interpark/config_network_aws/res/8.png">

```
    Name tag : public-a

    VPC : vpc-0274d58ad106c5933     // 사람마다 다르다. 새로 만든 VPC

    Availability Zone : ap-northeast-2a

    IPv4 CIDR block* : 10.0.1.0/24
```

> subset 생성을 위해 name, 새롭게 생성한 VPC, Availability Zone(보통 AZ라고 부름), 마지막으로 IPv4 주소를 위와 같이 입력하자. VPC와 Availability Zone의 경우 입력란을 클릭하면 드랍박스 형태로 사용 가능한 리스트가 나타난다. 추가적으로 Availability Zone은 우리가 구성하는 Subnet이 실제 물리적으로 위치할 공간을 의미하며 이들은 정전과 같은 에러에 대해 서로 독립적이다.

<img src="/workspace/devlog/interpark/config_network_aws/res/9.png">

> 잘 생성했다면 위와같이 초록색 박스에 The following Subnet was created: Subnet ID ... 라고 뜬다. <br><br> 위와 같은 방법으로 3개의 Subnet을 더 생성하자. 각 Subnet들의 정보는 다음과 같다.

```
    Name tag : public-c

    VPC : vpc-0274d58ad106c5933     // 사람마다 다르다. 새로 만든 VPC

    Availability Zone : ap-northeast-2c

    IPv4 CIDR block* : 10.0.2.0/24
```

```
    Name tag : private-a

    VPC : vpc-0274d58ad106c5933      // 사람마다 다르다. 새로 만든 VPC

    Availability Zone : ap-northeast-2a

    IPv4 CIDR block* : 10.0.11.0/24
```

```
    Name tag : private-c

    VPC : vpc-0274d58ad106c5933     // 사람마다 다르다. 새로 만든 VPC
    
    Availability Zone : ap-northeast-2c

    IPv4 CIDR block* : 10.0.12.0/24
```

<img src="/workspace/devlog/interpark/config_network_aws/res/10.png">

> 위와 같이 새로운 Subnet 4개가 생성되었다면 성공적으로 Subnet 생성도 마무리되었다.

### 4. Internet Gateway 생성

>  VPC의 구성요소로 인터넷에 접속할 수 있도록 하는 일종의 게이트웨이이다. 실제 네트워크 구성에서 격리된 각각의 네트워크들을 연결하기 위해서 라우터를 설치하고 이 라우터를 구성하게 된다. 한 단말기에서 다른 네트워크에 있는 단말기로 데이터를 송신하기 될 때 이 라우터를 거치게 되는데 이 때 라우터를 하나의 문으로 생각해 보통 게이트웨이라는 개념을 쓴다. 여기서의 Internet Gateway는 우리가 만든 VPC 네트워크가 범용적으로 사용되어지는 Internet이라는 네트워크로 나가기 위한 문으로 이해하자. 즉 Internet Gateway를 구성하게 되면 Internet을 사용할 수 있는 모든 단말기에서 이론적으로 이 VPC로 접근이 가능해진다.

<img src="/workspace/devlog/interpark/config_network_aws/res/11.png">

> 위 그림은 왼쪽메뉴에서 Internet Gateways를 누르면 볼수 있다. 보면 이미 하나의 Internet Gateway가 생성되어 있는것을 볼수 있고 이는 계정 생성 부터 만들어져 있던 VPC에 붙어있는 것을 알수 있다.  새로운 Internet Gateway 생성을 위해 Create internet gateway 버튼을 클릭하자.

<img src="/workspace/devlog/interpark/config_network_aws/res/12.png">

> 단순히 Name tag만 입력하면 internet gateway를 생성할 수 있다. 여기서는 ip-99 VPC의 internet gateway라고 하여 ip99-igw 라고 하겠다.

```
    Name tag : ip99-igw
```

> 입력이 끝나면 Create 버튼을 눌러 생성하자.

<img src="/workspace/devlog/interpark/config_network_aws/res/13.png">

> 성공적으로 생성되었다면 위와같은 초록색 박스에 The following internet gateway was created : Internet gateway ID ... 라는 화면이 뜬다.

<img src="/workspace/devlog/interpark/config_network_aws/res/14.png">

> 기존에 쓰이던 internet gateway 를 제외하고 하나 더 생성된 ip99-igw를 보면 state란에 detached라고 적혀있는걸 볼수 있다. 현재 연결되어 있는 VPC가 없기 때문에 그런것임으로 우리가 만든 ip-99 VPC에 연결해주자.

<img src="/workspace/devlog/interpark/config_network_aws/res/15.png">

> Actions 버튼을 눌러 Attach to VPC 클릭하게되면 VPC를 선택하는 화면으로 이동하게 된다.

<img src="/workspace/devlog/interpark/config_network_aws/res/16.png">

> ip-99에 해당하는 VPC를 선택하고 Attach 버튼을 누르자.

<img src="/workspace/devlog/interpark/config_network_aws/res/17.png">

> 최종적으로 우리가 만든 ip99-igw internet gateway가 ip-99에 해당하는 VPC에 붙은것을 확인할 수 있다.

### 5. NAT Gateway 생성

<img src="/workspace/devlog/interpark/config_network_aws/res/18.png">

> 왼쪽 사이드 메뉴에서 _NAT Gateways_ 를 클릭하게 되면 위와 같은 화면이 나타난다. _Create NAT Gateway_ 버튼을 클릭하자.

<img src="/workspace/devlog/interpark/config_network_aws/res/19.png">

> Subnet 부분에 앞서 설정한 public-a에 해당하는 subnet을 구성하고 Elastic IP Allocation ID 부분에는 Create New EIP 버튼을 눌러 새로운 IP를 갱신한다.

<img src="/workspace/devlog/interpark/config_network_aws/res/20.png">

<img src="/workspace/devlog/interpark/config_network_aws/res/21.png">

> _Create a NAT Gateway_ 버튼을 누르면 아래와 같은 화면들이 뜬다.

<img src="/workspace/devlog/interpark/config_network_aws/res/22.png">

<img src="/workspace/devlog/interpark/config_network_aws/res/23.png">

### 6. Route Table 생성

<img src="/workspace/devlog/interpark/config_network_aws/res/24.png">

> 왼쪽 사이드 메뉴에서 Route Tables 클릭 후 Create route table 버튼 클릭

<img src="/workspace/devlog/interpark/config_network_aws/res/25.png">

> Name tag에 rt-public 입력, VPC에는 ip-99 입력 

```
    Name tag : rt-public

    VPC : ip-99
```

<img src="/workspace/devlog/interpark/config_network_aws/res/26.png">

<img src="/workspace/devlog/interpark/config_network_aws/res/27.png">

> 잘 만들어졌다면 한 개 더 만든다.
```
    Name tag : rt-private

    VPC : ip-99
```

<img src="/workspace/devlog/interpark/config_network_aws/res/28.png">

> 최종적으로 아래와 같이 Name rt-private, rt-public을 가진 두개의 route table이 추가되어야 한다.

<img src="/workspace/devlog/interpark/config_network_aws/res/29.png">

```
    rt-public의 route table 클릭 > 아래의 Route 메뉴 클릭 > Edit routes 버튼 클릭
```

<img src="/workspace/devlog/interpark/config_network_aws/res/30.png">

> Add route 버튼 클릭하고 Destination에 0.0.0.0/0 입력 Target에 igw-.. 입력하면 자동추천 뜬다 그거 입력하고 save routes 클릭

```
    // rt-public 

    Destination : 0.0.0.0/0

    Target : igw-....
```

<img src="/workspace/devlog/interpark/config_network_aws/res/31.png">

> 위의 과정과 동일하게 rt-private의 route 테이블에 any를 의미하는 0.0.0.0/0을 추가한다. 다만 nat gateway를 설정하자.

```
    // rt-private

    Destination : 0.0.0.0/0

    Target : nat-....
```

<img src="/workspace/devlog/interpark/config_network_aws/res/32.png">

### 7. Subnet, Route table mapping

> 왼쪽 사이드 메뉴에서 Subnets 클릭하고 internet gateway를 설치한 public에는 rt-public을 연결하고 NAT gateway를 설치한 private에는 rt-private를 연결하자

```
    public-a 클릭 > 하단에 Route Table 탭 클릭 > Edit route table association 버튼 클릭
```

<img src="/workspace/devlog/interpark/config_network_aws/res/33.png">

> Route Table ID에 rt-public으로 수정하고 Save

<img src="/workspace/devlog/interpark/config_network_aws/res/34.png">

> 같은 방법으로 남은 subnet들도 모두 route table를 매핑해주자. private subnet 들은 rt-private route table을 설정하는것을 잊지 말자. 이렇게 까지하면 네트워크 기본 구성은 끝이난다.