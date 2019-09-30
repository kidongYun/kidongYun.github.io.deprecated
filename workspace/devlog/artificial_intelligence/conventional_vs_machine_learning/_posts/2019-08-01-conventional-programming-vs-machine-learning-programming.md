---
layout: post
title:  "Machine Learning - Conventional programming vs Machine Learning programming"
date:   2019-08-01 11:21:54 +0900
categories: artificial_intelligence
---

### What is Conventional Programming ?

> Conventional의 말 뜻 그대로 이 프로그래밍 방법론은 Learning Programming 이전에 프로그래머들이 줄곧 사용해왔던 개발 패턴을 의미한다. 프로그램을 개발하는 것은 물길을 만드는 것에 비유할 수 있는데 Conventional Programming의 경우 사람이 이 모든 물길을 생각하고 설계한다. Conventional Programming 방법은 고정적인 입력과 그에 따른 프로세스가 한정적일 경우에 적용하기 적합하다. 그러나 발생할 수 있는 예외들이 무수히 많은 프로그램을 개발해야 한다면 사람이 전지전능하지 못함으로 완벽히 개발한다는 것은 거의 불가능에 가깝다.

### What is Machine Learning Programming ?

> Machine Learning Programming은 Data를 통해 프로그램을 설계한다. 다시 말하면 개발자들은 Machine Learning 방법론을 채택한 시스템에 가능한 모든 물길을 만들어 두고 데이터의 특징들을 학습하여 만들어진 길을 기반으로 프로그램이 구현된다. 모든 물길에는 노즐과 같은 것이 있어 데이터의 학습을 통해 물을 차단하거나 제어할 수 있음이 Convetional Programming과 다르다. 프로그램이 구현해야하는 길의 개수가 Convetional Programming 기법보다 훨씬 많기 때문에 Computer Resource가 많이 필요하다. 사람이 모든 예외에 대해 대비하여 설계하지 못할 정도로 예외가 무수히 많은 서비스의 경우 (음성인식, 이미지인식) Machine Learning 방법을 사용하는 것이 좋다.

### White Box Test vs Black Box Test

> Conventional Programming과 Machine Learning Programming의 두드러지는 차이점은 바로 테스트시에 나타난다. Conventional Programming 방법은 결국 사람이 모든 프로그램의 길을 만들어내고 설계했기 때문에 버그가 발생한다면 어느 Logic에서 문제가 생겼는지 어느정도 유추할 수 있고 보다 쉽게 개선이 가능하다. 이렇게 Logic 자체를 확인할 수 있는 경우의 검사 방법을 White Box Test 라고 한다. Machine Learning Programming 방법의 프로그램의 구현은 데이터가 담당했기 때문에 개발자가 알 수 있는 것은 입력 대비 출력 정도이다. Logic을 직접 확인이 불가하기 때문에 입력, 출력을 가지고 문제점을 찾아내야 한다. 이러한 경우를 Black Box Text 라고 한다.

### Why do we use the Machine Learning ?
> Actually, This way has a big strength unlike Conventional thing. We always consider about the exception of program when we build the system. but Let's try to suppose that this program has a lof of the exception innumerable. then It's impossible to make the program using Conventional Programming way because We can't know all of the exception. In this case, Machine Learning programming way is more proper former.

> For example, If we make the program for recognizing the handwriting which figure many various using Convetional thing, We have to know the figure of handwriting by all over the people because It's always different.