## State 만드는 법

1. import { useState }
2. useState(보관할 자료)
3. let [작명, 작명]

### Destructing 문법

한 배열에서 각각의 값을 변수에 할당하고 싶을 때

```jsx
let num = [1, 2];
let a = num[0];
let b = num[1];
```

와 같이 만들어야 하는데 이를 보다 편리하게 작성하는 방법이 있다.

```jsx
let [a, b] = [1, 2];
```

이렇게 해주면 위의 세 줄로 표현한 것과 같다. 이것이 Destructing 문법이다.

이를 응용해서 useState 를 만들어줄 수 있다.

```jsx
let [a, b] = useState(’보관할 자료’);
// useState 값으로 ['보관할 자료', 함수]가 들어오게 된다.
```

그래서 state 문법을 어디에 써먹지? 왜 씀?

기존에 할당되어 있던 변수가 변경될 일이 생긴다면, 해당 변수를 활용하던 HTML 또한 변경해줘야 할 것이다.

state 문법을 활용하면 state로 할당된 부분이 알아서 재렌더링되면서 자동으로 변경사항을 반영해준다.

즉, 관리의 편의성을 위해 활용된다.

그러니 자주 바뀔 수 있는 부분을 state 로 활용하면 좋지 않을까?

---

state 사용 예시))

```jsx
function App(){
 
  let post = '강남 우동 맛집';
  let [글제목, 글제목변경] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  let [따봉, 따봉변경] = useState(0);

  return (
    <div className="App">
      <div className="black-nav">
        <div>개발 blog</div> 
      </div>
      <div className="list">
        <button onClick={ () => {
// 데이터는 항상 원본대신 사본을 사용한다.
          let 사본 = [...글제목];
          사본[0] = '여자 코트 추천';
          글제목변경(사본); 
          } }>글 수정</button>
// state 변경할 때는 반드시 변경함수를 사용해야 한다.  { () => { 변경함수(변경값) } } 
        <h4>{ 글제목[0] } <span onClick={ () => { 따봉변경(따봉+1) } }>👍</span> { 따봉 } </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ 글제목[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ 글제목[2] }</h4>
        <p>2월 17일 발행</p>
      </div>

    </div>
  )
}

export default App;
```

[ state 변경함수 특징 ]

기존 state === 신규 state 일 경우, 실행되지 않음

[ array/object 특징 ]

array / object 담은 변수엔 화살표만 저장됨

---

## 컴포넌트 만드는 법

1. function 만들기
2. return() 안에 html 담기
3. <함수명></함수명> or <함수명/>쓰기 함수명의 첫글자는 반드시 대문자여야함.

### 어떤걸 컴포넌트로 만들면 좋은가?

1. 반복적인 html 축약할 때
2. 큰 페이지들
3. 자주 변경되는 것들

컴포넌트를 너무 만들다 보면 스테이트를 사용할 때 문제가 생긴다. 
변수가 적용되는 범위가 함수 안에 한정되어 있기 때문.

---

## [동적인 UI 만드는 step]

1. html css로 미리 디자인 완성
2. UI의 현재 상태를 state로 저장
3. state에 따라 UI가 어떻게 보일지 작성

컴포넌트에 조건식을 넣을 때는 {} 사이에 삼항연산자 형식으로 활용하도록 하자.

jsx 문법에서는 html 형식을 띄기 때문에 js 문법을 활용해주려면 {} 를 사용해야 함.

---

```jsx
<h4 onClick={ () => { setModal(!modal) } }>{ 글제목[2] }</h4>
          { 
            modal == true ? <Modal></Modal> : null
          }
```

---

map() 특징

1. array 자료 개수만큼 함수안의 코드 실행함
2. 함수의 파라미터는 array안에 있던 자료임
3. return에 뭐 적으면 array에 담아줌

```jsx
{
  글제목.map(function (a, i) {
    return (
      <div className="list">
        <h4>{ 글제목[i] }</h4>
        <p>2월 17일 발행</p>
      </div>
    )
  })
}
```

---

## props 사용법(state 전송하고 싶을 때)

state 전송은 무조건 부모에서 자식 컴포넌트로만 가능하다.

1. <자식 컴포넌트 이름={state이름}>
2. props 파라미터 등록 후 props.이름 사용

<aside>
💡 자바스크립트 함수의 파라미터 이용하는 방법과 동일하다.

</aside>

<aside>
💡 이러한 state 사용상의 특징을 이유로 과도한 컴포넌트 생성은 자제하도록 한다.

</aside>

---

```jsx
import './App.css';
import { useState } from 'react';

function App() {
 
  let [arr, setArr] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  let [like, setLike] = useState([0,0,0]);
  let [modal, setModal] = useState(false); 

  return (
  <div className="App">

    <div className="black-nav">
      <div>개발 blog</div> 
    </div>

    <button onClick={ () => {
      let copy = [...arr];
      copy[0] = '여자 코트 추천'
      setArr(copy);
    }}>글수정</button>

    <button onClick={ () => {
      let copy = [...arr];
      copy.sort();
      setArr(copy);
    }}>가나다 순 정렬</button>

    {
      arr.map(function (a, i) {
        return (
          <div className="list" key={i}>
            <h4 onClick={()=> { 
              setModal(true) }}
            > { arr[i] } 
              <span onClick={ () => { 
                let copy = [...like];
                copy[i] = copy[i] + 1;
                setLike(copy) } }
              > 👍
              </span> 
            { like[i] } 
            </h4>
            <p>2월 17일 발행</p>
          </div>
        )
      })
    }
      {/* <div className="list">
        <h4>{ arr[0] } <span onClick={ () => { setLike(like+1) } }>👍</span> { like } </h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4>{ arr[1] }</h4>
        <p>2월 17일 발행</p>
      </div>
      <div className="list">
        <h4 onClick={ () => { setModal(!modal) } }>{ arr[2] }</h4>
        <p>2월 17일 발행</p>
      </div> */}
    { 
      modal === true ? <Modal setArr={setArr} arr={arr}></Modal> : null
    }
  </div>
  );
};
function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.arr[0]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
		  {/* <button onClick={() => { props.setArr(['여자 코트 추천', '강남 우동 맛집', '파이썬 독학']) }}>글 수정</button> */}
    </div>
  );
};

export default App;
```

주석 처리된 부분이 내 궁금증임

하드 코딩한 첫번째 주석을 컴포넌트 또는 반복문을 통해 표현하고 싶은데 어떻게 해야 좋을지 막막하다.

두번째 주석 부분은 해당 버튼을 클릭하면 props로 받은 배열 중에 ‘여자 코트 추천’ 부분만 ‘남자 코트 추천' 으로 바뀌게 하고 싶은데 이것도 아리송하다.

이건 다른 분한테 물어봐서 알아두자. 시간이 없으니까. 

---

### input 기능 구현

기본적으로 이벤트 핸들러는 자바스크립트 함수 개념을 따른다.

변수를 선언해두고 [e.target](http://e.target) 을 활용하여 불러오는 것처럼 state 만 변경하여 다루면 된다.

```jsx
let [value, setValue] = useState('');
<input onChange={(e)=>{ setValue(e.target.value); }} /> 

<button onClick={()=>{  
  let copy = [...arr]; 
  copy.unshift(value);
  setArr(copy); 
}}>
  입력
</button>

{/* 삭제 버튼  누르면 해당 글만 삭제되어야 함 */}
<button onClick={(e)=>{
  let copy = [...arr];
  copy.splice(i, 1);
  setArr(copy); 
}}>
	삭제
</button>
```

---

## class 컴포넌트를 활용한 문법 예시

```jsx
// (옛날 방식)class 컴포넌트를 활용한 문법 예시
class Modal2 extends React.Component {
  // constructor() { super() } render() {} 이 세가지를 채우고 시작해야함.
  constructor() {
    super()
    this.state = {
      // object 형식으로 데이터 저장
      name : 'kim',
      age : 20
    }
  }
  render() {
    return (
      <div>안녕 { this.state.age }
        <button onClick={()=>{
          this.setState({age : 21})
        }}>버튼</button>
      </div>
    )
  }
}

// App 컴포넌트 안에 class 로 만들어낸 모달을 넣어준다.
function App() {
<Modal2></Modal2>
}
```
