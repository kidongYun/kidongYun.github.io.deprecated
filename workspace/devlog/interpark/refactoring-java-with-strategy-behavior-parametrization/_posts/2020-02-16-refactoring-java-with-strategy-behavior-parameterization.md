---
layout: post
title:  "Interpark - Refactor java code using the strategy pattern and behavior parameterization in Java 8"
date:   2020-02-16 08:47:54 +0900
categories: interpark java8 java strategy pattern design
---

## 전략 패턴과 동작 파라미터화를 활용해서 자바 코드를 리팩토링 해보자

> 실무의 관점에서 코드를 올바르고 좋게 짠다는 것은 다양한 관점이 있겠지만 그 중 하나는 '확장성' 있는 코드를 만드는 것이다. 어떤 비즈니스가 어떠한 방향으로 새롭게 변경될지는 아무도 모르기 때문에 개발자의 입장에서 어떤 코드를 작성할 때에는 최대한 그 변화들을 수용할 수 있는 코드를 작성할 수 있어야 새로운 비즈니스가 들어왔을 때 필요한 비용이 획기적으로 적어진다. 여기서 이 '확장성'이라는 의미는 기존의 코드를 수정하지 않음을 포함한다. 실무를 경험해본 이들은 모두 아시다시피 이 전에 작성된 코드를 수정하는 것은 정말 어렵다. 파악하기가 어려운 것도 맞는 말이고 또 그 코드를 수정했을 때 잘 돌아가고 있던 서비스가 문제가 발생할 수도 있기 때문에 개발자들은 새로운 코드를 추가할 때 기존의 코드는 최대한 건드리지 않게 된다. 즉 결과적으로 나도 모르는 사이에 어느 순간 코드들은 더러워지게 된다. 

> 그렇다면 사과장수라는 한가지 예를 들어서 어떻게하면 확장성을 가지는 자바 코드를 구현할 수 있는지 전략 디자인 패턴과 동작 파라미터화 개념을 활용해 생각해보자.

```java

class Apple {
    private String color;
    private int weight;

    public String getColor() {
        return this.color;
    }
    public int getWeight() {
        return this.weight;
    }
}

class Melon {
    private String color;
    private int weight;

    public String getColor() { 
        return this.color; 
    }
    public int getWeight() { 
        return this.weight; 
    }
}

enum Color { RED, GREEN }

```

>  위의 자바코드는 아래에서 진행할 이해를 위한 예시에 필요한 기본 코드다. 사과를 표현하는 _'Apple'_ 객체와 멜론을 표현하는 _'Melon'_ 객체 그리고 색의 값들을 가지고 있는 _'Color'_ 열거형 객체다.

### 초록색을 구분하려고 하는 사과장수

> 어떤 사과장수가 온라인에서도 사과를 팔고 싶어해 우리에게 프로그램 제작을 의뢰했다. 사과장수의 한가지 요구사항은 초록색 사과를 구분할 수 있는 기능을 가져야 한다는 것이다. 그렇기에 우리는 아래와 같은 코드를 구현했다.

```java

class Main {

    public List<Apple> filterGreenApples(List<Apple> inventory) {
        List<Apple> result = new ArrayList<>();

        for(Apple apple: inventory) {
            if(Color.GREEN.equals(apple.getColor())) {
                result.add(apple);
            }
        }

        return result;
    }

    public void main() {
        List<Apple> inventory = new ArrayList<>();
        List<Apple> greenApples = filterGreenApples(inventory);
    }

}

    
```

> _'filterGreenApples()'_ 함수는 초록색을 구분하는 자바코드이고 _'main()'_ 함수에서 사용 예시를 보여주고 있다. _'filterGreenApples()'_ 함수는 파라미터로 전체 사과리스트를 받고 반복문을 돌려 초록색을 가진 사과들만 새로운 _'result'_ 라는 리스트에 넣어서 반환하고 있다. 이 코드는 초록색을 구분해준다는 기능의 관점에서는 아무런 문제가 없을 것 같다. 다만 이 코드가 정말 확장성이 있을지는 아래의 새로운 요구사항을 보면서 고민해보자.

### 빨간색도 구분하려고 하는 사과장수.

> 이번에는 이 사과장수가 빨간색도 구분하고 싶다고 한다. 초록색처럼 동일하게 구현하면 되겠다고 생각한 우리 팀 초보 자바개발자는 아래와 같이 코드를 구현했다.

```java

class Main {

    public List<Apple> filterGreenApples(List<Apple> inventory) {
        List<Apple> result = new ArrayList<>();

        for(Apple apple : inventory) {
            if(Color.GREEN.equals(apple.getColor())) {
                result.add(apple);
            }
        }

        return result;
    }

    public List<Apple> filterRedApples(List<Apple> inventory) {
        List<Apple> result = new ArrayList<>();

        for(Apple apple : inventory) {
            if(Color.RED.equals(apple.getColor())) {
                result.add(apple);
            }
        }

        return result;
    }

    public void main() {
        List<Apple> inventory = new ArrayList<>();

        List<Apple> greenApples = filterGreenApples(inventory);
        List<Apple> redApples = filterRedApples(inventory);
    }

}

```

> 자 여기서 무엇이 확장성의 관점에서 문제가 될지를 확인해보자. 내 생각에 확장성을 따질 때 고려해야할 사항은 아래와 같다.

```

    1. 코드의 중복의 정도

    2. 기존 코드를 수정해야 하는 정도.

```

> 중복된 코드가 많으면 코드에 수정이 일어날 때 이 코드들을 모두 수정해야 하는 이슈가 발생한다. 그런 의미로 '코드의 중복'은 확장성의 관점에서 좋지 않다. 그렇기에 지금 짜여진 _'filterGreenApples()'_, _'filterRedApples()'_ 함수들을 중복을 제거해서 코드를 구현해보도록 하자.

```java

class Main {

    public List<Apple> filterApplesByColor(List<Apple> inventory, Color color) {
        List<Apple> result = new ArrayList<>();

        for(Apple apple : inventory) {
            if(color.equals(apple.getColor())) {
                result.add(apple);
            }
        }

        return result;
    }

    public void main() {
        List<Apple> inventory = new ArrayList<>();

        List<Apple> greenApples = filterApplesByColor(inventory, Color.GREEN);
        List<Apple> redApples = filterApplesByColor(inventory, Color.RED);
    }

}

```

> 색이라는 값을 파라미터로 전달해 _'filterApples()'_ 함수가 색에 따라서 유연하게 대처할 수 있도록 했다. 이제 이 사과장수는 어떤 색이 오더라도 이 함수를 활용해 구분할 수 있을 것이다.

### 무게도 구분하고 싶어하는 사과장수

> 자 이제 _'filterApplesByColor()'_ 함수가 확장성에서 또 어떤 한계점을 가지는지 확인해보자. 사과장수가 이번에는 '150g' 이상의 사과들을 무거운 사과로 구분할 수 있는 기능을 가지고 싶다고 한다. 여기서 우리는 색과 동일한 구조로 무게를 위한 함수를 구현할 수 있을 것이다.

```java

class Main {

    public List<Apple> filterApplesByColor(List<Apple> inventory, Color color) {
        List<Apple> result = new ArrayList<>();

        for(Apple apple : inventory) {
            if(color.equals(apple.getColor())) {
                result.add(apple);
            }
        }

        return result;
    }

    public List<Apple> filterApplesByWeight(List<Apple> inventory, int weight) {
        List<Apple> result = new ArrayList<>();

        for(Apple apple : inventory) {
            if(apple.getWeight() > weight) {
                result.add(apple);
            }
        }

        return result;
    }

    public void main() {
        List<Apple> inventory = new ArrayList<>();

        List<Apple> greenApples = filterApplesByColor(inventory, Color.GREEN);
        List<Apple> redApples = filterApplesByColor(inventory, Color.RED);
        
        List<Apple> heavyApples = filterApplesByWeight(inventory, 150);
    }

}

```

> 자 이제 위의 코드를 다시 확장성의 관점에서 보자. 아까 색과 관련해 리팩토링했던 것과 같이 비슷한 코드의 형태가 나타나고 있다. 이번에는 이 코드들의 중복을 어떻게 하면 제거할 수 있을지, 어떻게 하면 확장성 있는 코드를 짤 수 있을지 고민해보자.

### 전략패턴을 활용하자.

> 우리는 왜 _'filterApplesByColor()'_, _'filterApplesByWeight()'_ 두 함수가 유사한 구조를 가진다고 판단했을까? 이는 두 함수가 공통된 사항을 가지고 있기 때문이다. 다시 말하면 이 함수들은 결과적으로 함수 내부적으로 어떠한 기준(색, 무게)에 따라서 각 사과들을 참과 거짓으로 구분하고 있다는 점이다. 이 사과가 빨간색인지 아닌지 혹은 150g 이상인지 아닌지처럼 말이다. 우리는 무언가를 구분한다는 공통된 요소들을 하나의 인터페이스화 하기 위해서 전략패턴을 사용할 것이다.

> 전략패턴이란 한 함수에서 비즈니스적인 부분과 알고리즘적인 부분을 서로 구분하여 구현하는 방법론이다. 

```java

    // algorithm
    public boolean algorithmForColor1(Apple apple, Color color) {
        if(color.equals(apple.getColor())) {
            return true;
        } else {
            return false;
        }
    }

    // algorithm
    public boolean algorithmForColor2(Apple apple, Color color) {
        if(!color.equals(apple.getColor())) {
            return false;
        } else {
            return true;
        }
    }

    // business
    public List<Apple> filterApplesByColor(List<Apple> inventory, Color color) {
        List<Apple> result = new ArrayList<>();

        for(Apple apple : inventory) {
            if(algorithmForColor1(apple, color)) {
                result.add(apple);
            }
        }

        return result;
    }

```

> 위의 예시처럼 사과의 색을 구분한다는 _'filterApplesByColor()'_ 비즈니스 함수에서 실제 색을 구분하는 부분은 별도의 알고리즘 함수를 제공해서 구현하고 있다. 이렇게 구현을 해두면 필요에 따라 다른 알고리즘을 선택해 비즈니스 영역을 구현할 수 있다. 일반적으로 기존의 코드를 수정하게 되는 경우는 비즈니스가 변경되는 경우가 많은데 이렇게 구현을 해두면 알고리즘 부분은 건드리지 않고 비즈니스 영역 코드만 수정하면 됨으로 중복의 관점의 문제점도 해결이 가능하다.

> 혹시나 위와 같이 비즈니스와 알고리즘을 굳이 예시처럼 구현해야하나 라는 생각이 들수 있지만 이는 지금 알고리즘 내용이 비교적 매우 간단하기 때문이다. 만약 어떤 비지니스가 최단거리를 탐색하는 알고리즘을 써야하는 경우라면 이를 DFS를 커스터마이징하여 구현할 수도 있고, Dijkstra, A* 등 다양한 형태로 구현이 가능하다. 이렇게 비지니스 적인 부분과 알고리즘적인 부분을 구분해서 코딩하는 것은 '확장성' 면에서 굉장히 중요하다.

### 알고리즘 영역을 위한 코드를 인터페이스로 묶자.

> 위처럼 알고리즘 부분을 별도의 함수로 구분하게 되면 이 알고리즘 코드들은 굉장히 유사해진다. 입력되어지는 값과 출력해야하는 값의 구조가 동일하기 때문이다. 이 공통적인 부분을 인터페이스를 활용해 묶어보도록 하자.

```java

interface ApplePredicate {
    boolean test(Apple apple);
}

class AppleHeavyWeightPredicate implements ApplePredicate {
    public boolean test(Apple apple) {
        return apple.getWeight() > 150;
    }
}

class AppleGreenColorPredicate implements ApplePredicate {
    public boolean test(Apple apple) {
        return Color.GREEN.equals(apple.getColor());
    }
}

class AppleRedAndHeavyPredicate implements ApplePredicate {
    public boolean test(Apple apple) {
        return Color.RED.equals(apple.getColor()) && apple.getWeight() > 150;
    }
}


class Main {

    public List<Apple> filterApples(List<Apple> inventory, ApplePredicate p) {
        List<Apple> result = new ArrayList<>();

        for(Apple apple : inventory) {
            if(p.test(apple)) {
                result.add(apple);
            }
        }

        return result;
    }

    public void main() {
        List<Apple> inventory = new ArrayList<>();

        List<Apple> greenApples = filterApples(inventory, new AppleGreenColorPredicate());
        List<Apple> heavyApples = filterApples(inventory, new AppleHeavyWeightPredicate());
        List<Apple> redAndHeavyApples = filterApples(inventory, new AppleRedAndHeavyPredicate());
    }

}

```

> 비즈니스 역할을 하는 _'filterApple()'_ 함수는 이제 공통된 인터페이스 _'ApplePredicate'_ 를 파라미터로 가짐으로 여러 개를 만들 필요가 없다. 그 안에 필요한 알고리즘 영역 _'(ApplePredicate)'_ 들만 필요한 때에 새로운 _'class'_ 를 만들어서 제공하면 된다. 

### 정말 코드가 좋아졌는가?

> 여기서 의문을 가져보자. 지금까지 전략패턴을 활용해서 비즈니스 영역과 알고리즘 영역의 코드를 구분하고 알고리즘 영역의 코드들의 공통 부분을 인터페이스로 묶어서 코드들을 구현했다. 이 코드가 맨 처음 리팩토링 하기 전 _'filter.....()'_ 함수를 계속 만들어 가는 코드보다 분명히 좋은 코드인지 궁금증을 가져보자.

#### 1. '코드의 중복'의 관점에서는 결국에는 개선되지 않았다. 

```java

class AppleHeavyWeightPredicate implements ApplePredicate {
    public boolean test(Apple apple) {
        return apple.getWeight() > 150;
    }
}

class AppleGreenColorPredicate implements ApplePredicate {
    public boolean test(Apple apple) {
        return Color.GREEN.equals(apple.getColor());
    }
}

class AppleRedAndHeavyPredicate implements ApplePredicate {
    public boolean test(Apple apple) {
        return Color.RED.equals(apple.getColor()) && apple.getWeight() > 150;
    }
}

```

> 아래의 3개의 알고리즘 영역 코드들을 보면 상당히 비슷해 보이는 코드들을 계속해서 사용하고 있다. 따라서 코드의 중복의 관점에서는 완전히 해결한것이라고 보기는 어렵다. 다만 이부분은 Java8 문법을 활용하면 말끔히 해결 할 수 있다. 즉 이 문제는 기존의 Java로는 해결이 불가능한 문제이다.

#### 2. '기존의 코드를 수정해야 하는가' 관점에서는 성공적이다.

> 맨 처음 리팩토링되기 전 _'filter....()'_ 함수들을 계속 생성하는 방법은 사실 기존의 코드를 수정할 필요는 없다. 계속 중복된 새로운 코드 만을 만들기 떄문이다. 다만 전체적인 구조를 바꿔야 하는 작업에서는 만들어진 모든 중복된 _'filter....()'_ 함수들을 개선해야 하는데 이것은 지금 리팩토링된 코드에서는 비즈니스 영역과 알고리즘의 영역이 구분되어져 있기 때문에 딱 하나 있는 _'filterApples()'_ 함수 만 변경하면 된다.(알고리즘 영역이 변경되는 드문 일이며 이를 개선해야하는 것은 애초에 알고리즘 영역에 비즈니스가 포함된건 아닌지 의심해야 한다. )

#### 3. 컴파일러가 인식할 수 있다.

> 만약에 알고리즘의 영역 코드 (Predicate를 상속하고 있는 클래스들) 들이 수정되야 한다고 가정해보자. 그럼에도 이 코드들은 리팩토링 되기 이전의 코드보다 좋다. 왜냐하면 하나의 인터페이스로 공통화가 되어있기 때문에 수정되지 않은 코드블록이 있다면 이는 컴파일러가 인지할 수 있다. 단순히 _'filter....()'_ 형태로 만들게 되면 이 함수들은 서로 독립적이기 때문에 컴파일러는 각 함수들이 새로운 요구사항에 수정되어졌는지 아닌지 알수 없다. 즉 런타임 환경에서 에러를 확인해야 한다.

### 익명 클래스를 활용해 class 수를 줄여보자.

> 전략패턴을 활용해 알고리즘을 영역 코드들을 새로운 class를 만드는 방식으로 개선했다. 하지만 이 방법도 한계가 있는데 새로운 class를 계속 만들게 됨으로 너무 많은 class를 가지게되는 문제점이 있다. 이를 해결하기 위해 익명 클래스를 활용해 보자.

```java

interface ApplePredicate {
    boolean test(Apple apple);
}

class Main {

    public List<Apple> filterApples(List<Apple> inventory, ApplePredicate p) {
        List<Apple> result = new ArrayList<>();

        for(Apple apple : inventory) {
            if(p.test(apple)) {
                result.add(apple);
            }
        }

        return result;
    }

    public void main() {
        List<Apple> inventory = new ArrayList<>();

        List<Apple> greenApples = filterApples(inventory, new ApplePredicate() {
            @Override
            public boolean test(Apple apple) {
                return apple.getWeight() > 150;
            }
        });

        List<Apple> heavyApples = filterApples(inventory, new ApplePredicate() {
            @Override
            public boolean test(Apple apple) {
                return Color.GREEN.equals(apple.getColor());
            }
        });

        List<Apple> redAndHeavyApples = filterApples(inventory, new ApplePredicate() {
            @Override
            public boolean test(Apple apple) {
                return Color.RED.equals(apple.getColor()) && apple.getWeight() > 150;
            }
        });
    }

}

```

> 각 알고리즘 마다 새로운 클래스를 만들었던 이전의 방법과 달리 그 클래스들을 _'main()'_ 안에서 직접 생성하고 있다. 하지만 이 방법은 알고리즘 코드가 길다면 사용하기 어렵고 또 위와 같이 조금만 사용하는 양이 많아져도 가독성이 떨어지게 된다.

### Java8 함수의 혁신

> 위의 까지의 리팩토링은 Java8 이전에 가능한 방법이였다. 이제는 Java8의 람다식을 활용해서 더 좋은 코드를 만들어보자. 기존의 자바는 함수를 값으로 생각하는 함수형 프로그래밍을 제공하지 않았다. 즉 파라미터로 값을 전달할 때 기존의 자바가 가능했던 것은 필드값, 객체가 전부였다. 따라서 위의 익명 클래스 부분에 _'ApplePredicate'_ 객체를 보면 정작 필요한 것은 참과 거짓을 구분하는 _'test()'_ 함수 이지만 Java에서는 함수가 혼자 존재할 수 없음으로 새로운 익명 클래스를 만들고 그 안에서 _'test()'_ 함수를 구현하고 있다. 그러나 _typescript_, _swift_ 등 다양한 언어에서 이미 이 함수형 프로그래밍 언어의 장점을 보여주고 있어서 Java8에서는 이 함수형 프로그래밍 방법을 수용했다. 바로 이 함수 자체를 파라미터의 값으로 전달이 가능한 것이다.

```java

class Main {

    public List<Apple> filterApples(List<Apple> inventory, ApplePredicate p) {
        List<Apple> result = new ArrayList<>();

        for(Apple apple : inventory) {
            if(p.test(apple)) {
                result.add(apple);
            }
        }

        return result;
    }

    public void main() {
        List<Apple> inventory = new ArrayList<>();
        
        List<Apple> greenApples = filterApples(inventory, (Apple apple) -> apple.getWeight() > 150);
        List<Apple> heavyApples = filterApples(inventory, (Apple apple) -> Color.GREEN.equals(apple.getColor()));
        List<Apple> redAndHeavyApples = filterApples(inventory, (Apple apple) -> Color.RED.equals(apple.getColor()) && apple.getWeight() > 150);
    }

}

interface ApplePredicate {
    boolean test(Apple apple);
}

```

> 위의 코드를 익명 클래스를 사용해 리팩토링한 코드와 한번 비교해보자. 이는 아래와 같다.

```java

List<Apple> greenApples = filterApples(inventory, new ApplePredicate() {
    @Override
    public boolean test(Apple apple) {
        return apple.getWeight() > 150;
    }
})


List<Apple> greenApples = filterApples(inventory, (Apple apple) -> apple.getWeight() > 150);

```

> Java8 이후에서는 함수가 클래스 안에 있지 않아도 되기 때문에 굳이 구현한 _'ApplePredicate'_ 객체 안에 _'test()'_ 함수를 _'(Apple apple) -> apple.getWeight() > 150'_ 한 줄로 끝내버릴 수 있게 되었다.

### Java8에서는 정말로 함수를 독립적인 단위로 가질수 있는가?

> 사실 답은 그렇지 않다. 지금까지 자바의 구조가 함수를 값으로써 인정하지 않았기 때문에 기존의 뿌리 구조를 흔들면서 함수를 값으로 볼수 있게 하는 것은 Java를 개발하는 개발자들도 굉장히 힘든일일 것이다. 그래서 Java8은 함수를 값으로 존재하기 위해 한가지 편법을 사용한다. 단순히 함수를 만들고 싶다면 Interface를 하나 만들고 거기에 오직 한 가지 함수를 존재하게 하자. 이렇게 되면 사용자가 이 interface의 함수를 단순히 함수로써 사용할 수 있게 된다. 이러한 형태의 interface를 함수형 인터페이스라고 칭하며 _'@FunctionalInterface'_ 어노테이션을 활용해 함수로써 사용하는 인터페이스라고 선언할 수 있다.

### 확장성을 위한 마지막 시도.

> 한번 사과장수인 사람은 영원히 사과장수 일까? 지금까지 우리의 확장성을 위한 노력은 사과를 구분할때 사용하는 'filter()' 함수를 중심으로 잡고 리팩토링을 진행했다. 그러나 이 코드들은 사과장수가 만약 멜론장수가 된다면 전혀 사용할 수 없게 된다. 그래서 제네릭 문법을 활용해서 최종적인 확장성을 위한 시도를 하자. 즉 어떤 대상이 와도 우리가 만든 _'filter()'_ 함수를 사용할 수 있도록 구현하는 것이다.

```java

@FunctionalInterface
interface Predicate<T> {
    boolean test(T t);
}

class Main {

    public <T> List<T> filterApples(List<T> inventory, Predicate<T> p) {
        List<T> result = new ArrayList<>();

        for(T t : inventory) {
            if(p.test(t)) {
                result.add(t);
            }
        }

        return result;
    }

    public void main() {
        List<Apple> inventory = new ArrayList<>();

        List<Apple> greenApples = filterApples(inventory, (Apple apple) -> apple.getWeight() > 150);
        List<Apple> heavyApples = filterApples(inventory, (Apple apple) -> Color.GREEN.equals(apple.getColor()));
        List<Apple> redAndHeavyApples = filterApples(inventory, (Apple apple) -> Color.RED.equals(apple.getColor()) && apple.getWeight() > 150);
    }

}

```

> 지금까지 전략패턴과 _'Java8'_ 에서 제공하는 동작 파라미터화를 활용하여 확장성있는 코드를 작성하는 방법에 대해 알아보았다.