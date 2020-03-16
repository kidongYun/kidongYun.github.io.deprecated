### 일정부분 고정영역으로 채우고 남은 여백을 채우는 CSS 방법

```css
    display: inline-block;
    position: absolute;
    width: 100%;
    top: 70px; bottom: 0;

    margin: auto;
`;

```

> display: inlink-block, position: absolute 속성을 필수로 넣고 width, height 중 필요없는 부분은 원한느 사이즈 만큼 주고 필요한 속성에 절대값으로 top-bottom, left-right를 준다. flex로도 할수 있는거 같은데 flex-grow, flex-basis 알아보자. 왜냐며는 이 방법은 flex랑 같이 겸용하여 사용할수가 없음.


### intellij에서 한글 인코딩 windows-949 이런 에러 뜰때

> 컴파일러 옵션에 UTF-8 인코딩 설정을 주면됨.

```
    File -> Settings -> Compiler -> Java Compiler -> Additional command line parameters

    부분에

    -Dfile.encoding=UTF8

    추가
```