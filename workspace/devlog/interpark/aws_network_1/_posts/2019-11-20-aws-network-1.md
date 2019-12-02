---
layout: post
title:  "Interpark - Configuration of Network for AWS (1/2)"
date:   2019-11-20 08:47:54 +0900
categories: interpark aws
---

## Configuration of AWS Network

<img src="/workspace/devlog/interpark/aws_network_1/res/0.png">

```
    Flow

    1. Enter AWS Website and Joining at there
    2. Create VPC
    3. Create Subnet
    4. Create Internet Gateway and Attach this to VPC
    5. Create NAT Gateway 
    6. Create Route Table
    7. Mapping with Subnet and Route Table
```

### 1. Access AWS Management Console

> Let's to sign in the below site

[AWS Management Console](https://ap-northeast-2.console.aws.amazon.com/console/home?region=ap-northeast-2#)

> Let's access the AWS Management Console Website via above link. If you are the first time about this, then you maybe face the login page. Let's start to make the your account of AWS, if you don't have it and especially You need any mastercard or visa card for joining there. If you don't use the premium service of this, then You don't worry about the any cost in this service, That's apparently free during 1 years partly. But You should remember the one thing what is The AWS take just 1 dollar from us for checking whether your card information is right or not. Eventually if you can see the below picture then yes! you were success. Additionally You are able to change the language at the bottom of this Website so If you are possible, I would like to recommend to use the english version of this. because as you know, AWS is really international service so It support many languages, but sometimes the article written by another languages except English isn't a latest version of description for AWS service.

<img src="/workspace/devlog/interpark/aws_network_1/res/1.png">

### 2. Create VPC

> VPC is acutally the abbreviation of _Virtual Private Cloud_ and It is the concept of the logical isolated space for the AWS customer. That is exactly similar thing with the house as you can put down everything in there if you want. Yes, You can configure any network, system, service in the VPC like the house. Only Difference is It's logical thing. Existing Cloud Services occur baiscally these service(Network, System). That's we can't control about those but AWS is really different about this point. You can directly configure all of things in your VPC including Network setting. so It' really important to configure with the secure for preventing any exposure the your resources. because All of AWS Resource are money. <br><br> below figures are for creating the VPC using AWS Management Console. Please keep going with me

<img src="/workspace/devlog/interpark/aws_network_1/res/2.png">

> Let's search _'VPC'_ at The Textfield bar located in Find Services

<img src="/workspace/devlog/interpark/aws_network_1/res/3.png">

> Press the _'Your VPCs'_ text at the left side menu tabs

<img src="/workspace/devlog/interpark/aws_network_1/res/4.png">

> Above is the screen for showing some status of VPC setting of currently account. We can see the one VPC already configured although you are first. We will make the new one for understanding the way of creating the VPC. <br><br> Let's press the button named _'Create VPC'_ located left above part.

<img src="/workspace/devlog/interpark/aws_network_1/res/5.png">

> Let's type the name and ip of VPC you want. below if my example. If you don't want to think about this then just follow me.

```
    Name tag : ip-99

    IPv4 CIDR block* : 10.0.0.0/16
```

> Press the _'Create'_ button when you finished.

<img src="/workspace/devlog/interpark/aws_network_1/res/6.png">

> Finally you complete creating the VPC if you see the label 'The following VPC was created : VPC ID ...' in the green box.

### 3. Create Subnet

> As the usage of Network is bigger, The needs of the network bandwidth expansion is appealed because of the limitation of IPv4 network capacity. Existing IP class is only divided 3 types like A, B, C. They indicate the network size exactly. but this way is too insensive, static, unflexible... so Many experts studied for solving this problem. the one solution among them is to divide more and more the IP class using the way named subnet maksing. It is the background of creating The concept of Subnet. and We usually use the subnet mask for applying subnet tech. If we use the subnet mask, then we can control the network bandwidth more sensitively than previous. Actually the IPv6 is a sure method for solving the lack of IP addresses, but It's little difficult to migrate from current IPv4 system to there. and We can't take any the need of IPv6 beacuse of many alternative solutions like Subnet, DHCP, NAT.

<img src="/workspace/devlog/interpark/aws_network_1/res/7.png">

> Let's press _'Subnets'_ button at the left menu. then you can see like above. You can see 3 configuration of subnet in your VPC. Let's make new subnet for your new VPC. Press the _'Create subnet'_

<img src="/workspace/devlog/interpark/aws_network_1/res/8.png">

```
    Name tag : public-a

    VPC : vpc-0274d58ad106c5933     // This number maybe is different to each people

    Availability Zone : ap-northeast-2a

    IPv4 CIDR block* : 10.0.1.0/24
```

> For creating the subnet, Let's type name, VPC, Availability Zonesubset(AZ), IPv4 address. in VPC, AZ case, You can see the available list when you press the textbox.

<img src="/workspace/devlog/interpark/aws_network_1/res/9.png">

> if you completed, then you can see the picture like above with the label 'The follwing Subnet was created: Subnet ID ...' in the green box. Let's create the subnets more using above way. The belows are information of each subnet.

```
    Name tag : public-c

    VPC : vpc-0274d58ad106c5933     // This number maybe is different to each people

    Availability Zone : ap-northeast-2c

    IPv4 CIDR block* : 10.0.2.0/24
```

```
    Name tag : private-a

    VPC : vpc-0274d58ad106c5933      // This number maybe is different to each people

    Availability Zone : ap-northeast-2a

    IPv4 CIDR block* : 10.0.11.0/24
```

```
    Name tag : private-c

    VPC : vpc-0274d58ad106c5933     // This number maybe is different to each people
    
    Availability Zone : ap-northeast-2c

    IPv4 CIDR block* : 10.0.12.0/24
```

<img src="/workspace/devlog/interpark/aws_network_1/res/10.png">

> If you have the 4 subnets totally like above picture, then you created the subnets successfully.