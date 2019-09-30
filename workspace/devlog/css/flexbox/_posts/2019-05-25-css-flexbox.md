---
layout: post
title:  "CSS - How to use Flexbox basically"
date:   2019-05-25 08:47:54 +0900
categories: css
---

CSS에서 _flex_ 속성을 사용하는 기본적인 방법을 알아보자.

### 1. 기본 설정

우선 테스트를 위한 간단한 html 코드와 css 코드를 작성하자.

#### flex.html
```html
    <html>
        <head>
        </head>
        <body>
            <div class="parent">
                <div class="child1">
                </div>
                <div class="child2">
                </div>
                <div class="child3">
                </div>                
            </div>
        </body>
    </html>
```

flex 속성이 어떻게 반영되는지 알기 위해 _parent_ 와 _child_ 요소들에 색상과 크기를 정의해주자.

#### flex.css
```css
    .parent {
        width: 300px;
        height: 300px;
        background-color: #cccccc;
    }

    .child1 {
        width: 60px;
        height: 60px;
        background-color: #222222;
    }

    .child2 {
        width: 60px;
        height: 60px;
        background-color: #555555;
    }

    .child3 {
        width: 60px;
        height: 60px;
        background-color: #888888;
    }
```

<img src="/workspace/devlog/css/flexbox/res/1.png">

### 2. flex container, flex item

flex를 사용할 때는 요소가 크게 두가지로 나누어 지는데 

_flex.html_ 를 보면 알수 있듯이 부모요소와 자식요소로 이루어져 있다.

부모요소를 _flex container_, 자식요소는 _flex item_ 라고 부른다.

_flex_ 속성을 사용하기 위해서는 먼저 __부모 요소의 _display_ 에 _flex_ 속성을 주어야한다.__

#### flex.css
```css
    
    ...

    .parent {
        width: 300px;
        height: 300px;
        background-color: #cccccc;
        display: flex;                  // NEW CODE
    }

    ...

```

이렇게 되면 parent요소 안에 있는 자식 요소들은 flex 속성들을 사용할 수 있다.

<img src="/workspace/devlog/css/flexbox/res/2.png">

단순히 _display: flex;_ 속성을 준 것 만으로도 변화가 생긴 것을 볼 수 있다.

위에서 아래로 정렬되던 것이 왼쪽에서 오른쪽으로 바뀌었다.


### 3. flex-direction

__flex는 기본적으로 flex item들의 정렬을 왼쪽에서 오른쪽으로 진행한다.__

즉 flex의 정렬기준, 정렬방향을 담당하는 _flex-direction_ 속성이 기본적으로 _row_ 의 값을 가지고 있다.

만약 다시 위에서 아래로 정렬을 하고 싶다면 _flex-direction_ 속성을 _column_ 으로 바꾸면 된다.

```css
    
    ...

    .parent {
        width: 300px;
        height: 300px;
        background-color: #cccccc;
        display: flex;
        flex-direction: column;         // NEW CODE
    }

    ...

```

혹시나 오른쪽에서 왼쪽, 아래쪽에서 위로와 같이 정렬방식을 역으로 진행하고 싶다면.

_flex-direction_에 _row-reverse_ 속성이나 _column-reverse_ 속성을 적용해 주자.

```css
    
    ...

    .parent {
        width: 300px;
        height: 300px;
        background-color: #cccccc;
        display: flex;
        flex-direction: row-reverse;    // NEW CODE
    }

    ...

```

#### flex-direction: row
<img src="/workspace/devlog/css/flexbox/res/1.png">

#### flex-direction: column
<img src="/workspace/devlog/css/flexbox/res/2.png">

#### flex-direction: row-reverse
<img src="/workspace/devlog/css/flexbox/res/3.png">

#### flex-direction: column-reverse
<img src="/workspace/devlog/css/flexbox/res/4.png">

### 4. justify-content

flex에서 _justify-content_ 속성은 수평 방향의 정렬 방식을 설정하는 속성이다.

앞, 뒤, 가운데 등 어디에 배치 할지 혹은 여유공간은 어떻게 둘지 등을 설정할 수 있다.

flex container에 이 속성을 적용하게 되면 flex item 들이 해당 정렬 방식대로 적용된다.

```

    justify-content: flex-start;    // 앞쪽을 기준으로 배치 (기본값)
    justify-content: flex-end;      // 뒤쪽을 기준으로 배치
    justify-content: center;        // 가운데를 기준으로 배치
    justify-content: space-between; // flex item 요소들 사이에만 동일한 여유 공간을 두고 배치
    justify-content: space-around;  // 모든 여백에 동일한 여유 공간을 두고 배치

```

주로 위의 5개 속성을 주로 사용하며 아래와 같이 _parent_에 적용해보자.

```css
    
    ...

    .parent {
        width: 300px;
        height: 300px;
        background-color: #cccccc;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;        // NEW CODE
    }

    ...

```

#### justify-content: flex-start
<img src="/workspace/devlog/css/flexbox/res/2.png">

#### justify-content: flex-end
<img src="/workspace/devlog/css/flexbox/res/5.png">

#### justify-content: center
<img src="/workspace/devlog/css/flexbox/res/6.png">

#### justify-content: space-between
<img src="/workspace/devlog/css/flexbox/res/7.png">

#### justify-content: space-around
<img src="/workspace/devlog/css/flexbox/res/8.png">

### 4. align-items

_justify-content_ 가 수평에 대한 정렬방식이라면 _align-items_ 는 수직적인 정렬방식을 설정할 수 있다. 

```

    align-items: stretch;           // flex item이 flex container의 높이와 같고 연이어 배치 (기본값)
    align-items: flex-start;        // 위쪽 기준으로 배치
    align-items: center;            // 가운데 기준으로 배치
    align-items: flex-end;          // 아래쪽 기준으로 배치

```

_justify-content_ 와 마찬가지로 parent 요소에 적용해보자.

```css
    
    ...

    .parent {
        width: 300px;
        height: 300px;
        background-color: #cccccc;
        display: flex;
        flex-direction: row;
        align-items: stretch;
    }

    ...

```

#### align-items: stretch
<img src="/workspace/devlog/css/flexbox/res/9.png">

#### align-items: flex-start
<img src="/workspace/devlog/css/flexbox/res/2.png">

#### align-items: center
<img src="/workspace/devlog/css/flexbox/res/11.png">

#### align-items: flex-end
<img src="/workspace/devlog/css/flexbox/res/10.png">

다만 stretch는 중요하게도 flex item의 높이 값이 flex container와 같아진다.

그래서 child 요소들에 height값을 넣어두면 stretch가 우선순위에 밀려 적용되지 않는다.

따라서 stretch 속성은 다른것들과 별개로 적용시 아래처럼 child 요소들의 height 속성을 제거해주자.

```css

    .parent {
        width: 300px;
        height: 300px;
        background-color: #cccccc;
        display: flex;
        flex-direction: row;
        align-items: stretch;
    }

    .child1 {
        width: 60px;
        // height: 60px;
        background-color: #222222;
    }

    .child2 {
        width: 60px;
        // height: 60px;
        background-color: #555555;
    }

    .child3 {
        width: 60px;
        // height: 60px;
        background-color: #888888;
    }
    
```

flexbox를 사용하는 방법은 더욱 더 다양하고 조금 더 깊게 연구 해볼 필요가 있다.

그러나 위에 있는 기본적인 내용들을 숙지하고 프로젝트에 들어간다면 스스로 고민해보면서

다양한 형태의 UI의 레이아웃들을 구성할 수 있을 것이다.

그리고 flexbox가 왜 이렇게 까지 대중화 되었는지도 이해할 수 있을 것이다.