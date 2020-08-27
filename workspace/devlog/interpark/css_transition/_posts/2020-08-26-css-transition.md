---
layout: post
title:  "Interpark - How to use the Redux with Hook technique."
date:   2020-08-26 10:00:00 +0900
categories: interpark css transition
---

### 1. the properties of the transition attribute.

#### transition

> whenever you put down your cursor on this object, It would be larger 3 times than now.

```css

    div.keyboard {
        width: 100px;
        -webkit-transition: width 1s;
        transition: width 1s;
    }

    div.keyboard:hover { 
        width: 300px; 
    }

```

> We can control multiple attributes of the transition at a once. It's width and height in this example.

```css

    #resize {
        height: 100px;
        width: 150px;
        -webkit-transition: width 1s, height 3s;
        transition: width 1s, height 3s;

    }

    #resize:hover { 
        width: 300px; 
        height: 500px; 
    }

```

#### transition-timing-function

> It's for controling the velocity per times when it's strated or finished.

```

1. linear : 전환(transition) 효과가 처음부터 끝까지 일정한 속도로 진행됩니다.
2. ease : 기본값으로, 전환(transition) 효과가 천천히 시작되어, 그다음에는 빨라지고, 마지막에는 다시 느려집니다.
3. ease-in : 전환(transition) 효과가 천천히 시작됩니다.
4. ease-out : 전환(transition) 효과가 천천히 끝납니다.
5. ease-in-out : 전환(transition) 효과가 천천히 시작되어, 천천히 끝납니다.
6. cubic-bezier(n,n,n,n) : 전환(transition) 효과가 사용자가 정의한 cubic-bezier 함수에 따라 진행됩니다.

```

```css
    div {
        width: 100px;
        -webkit-transition: width 1s;
        transition: width 1s;

    }

    #div_01 {
        -webkit-transition-timing-function: linear;
        transition-timing-function: linear;

    }

    #div_05 {
        -webkit-transition-timing-function: ease-in-out;
        transition-timing-function: ease-in-out;

    }

    div:hover { 
        width: 300px; 
    }

```

#### transition-delay

Having you set this attribute, It should be started after this delay time.

```css
    #resize {
        height: 100px;
        width: 150px;
        -webkit-transition: width 1s, height 2s;
        transition: width 1s, height 2s;
        -webkit-transition-delay: 1s;
        transition-delay: 1s;
    }

    #resize:hover { 
        width: 300px; 
        height: 300px; 
    }
```

#### transition-duration

#### transition-property