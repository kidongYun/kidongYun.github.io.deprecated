---
layout: post
title:  "CSS - BEM Methodology"
date:   2019-10-13 08:47:54 +0900
categories: css
---

## Block(블록)

> 재사용 할 수 있는 기능적으로 독립적인 페이지 구성 요소. HTML에서 블록은 class속성으로 표시된다. <br><br> 형태(red, big)가 아닌 목적(menu, button)에 맞게 결정해야 한다. <br><br> 블록은 환경에 영향을 받지 않아야 한다. 즉 여백이나 위치를 설정하면 안된다. <br><br> 태그, id 선택자를 사용하면 안된다. <br><br> 블록은 서로 중첩해서 작성할 수 있다. 

```css

    header { ... }

    menu { ... }

    search-form { ... }
```

## Element(요소)

> 블록안에서 특정 기능을 담당하는 부분. <br><br> block__element 형태로 사용 (Double Under Bar) <br><br> 형태(red, big)가 아닌 목적(item, text, title)에 맞게 결정해야 한다. <br><br> 요소는 중첩해서 작성할 수 있다. <br><br> 요소는 블록의 부분으로만 사용할 수 있고 다른 요소의 부분으로 사용할 수 없다. <br><br> 모든 블록에서 요소는 필수가 아닌 선택적으로 사용한다. 즉 블록안에 요소가 없을 수도 있다.

```css

    menu__item { ... }

    header__title { ... }

```

## Modifier(수식어)

> 블록이나 요소의 모양(color, size..), 상태(disabled, checked)를 정의한다. <br><br> block__element--modifier, block--modifier 형태로 사용(Double hyphen) <br><br> 수식어는 단독으로 사용할 수 없다. 즉 기본 블록과 요소에 추가하여 사용해야 한다. <br><br> 수식어의 boolean 타입과 key-value 타입이 있다.

```

    boolean type : 수식어가 있으면 true라고 가정한다. ex) form-button--disabled

    key-value type : key, value를 hyphen으로 연결하여 표시한다. ex) color-red, theme-ocean

```

