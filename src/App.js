import './App.css';
import { React, useState } from 'react';

function App() {
 
  let [arr, setArr] = useState(['남자 코트 추천', '강남 우동 맛집', '파이썬 독학']);
  let [like, setLike] = useState([0,0,0]);
  let [modal, setModal] = useState(false);
  let [title, setTitle] = useState(0);
  let [value, setValue] = useState('');
  
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
              setModal(!modal);
              setTitle(i); 
            }}
            > { arr[i] } 
              <span onClick={ (e) => {
                e.stopPropagation(); 
                let copy = [...like];
                copy[i] = copy[i] + 1;
                setLike(copy) } }
              > 👍
              </span> 
            { like[i] } 
            </h4>
            <p>2월 17일 발행</p>
            {/* 삭제 버튼  누르면 해당 글만 삭제되어야 함 */}
            <button onClick={(e)=>{
              let copy = [...arr];
              copy.splice(i, 1);
              setArr(copy);
            }}>삭제</button>
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

    <input onChange={(e)=>{ setValue(e.target.value); }} /> 
    <button onClick={()=>{  
      let copy = [...arr]; 
      copy.unshift(value);
      setArr(copy); }}>
      입력
    </button> 
    {
      modal === true ? <Modal title={title} setArr={setArr} arr={arr}></Modal> : null
    }
  </div>
  );
};
function Modal(props) {
  return (
    <div className="modal">
      <h4>{props.arr[props.title]}</h4>
      <p>날짜</p>
      <p>상세내용</p>
      <button onClick={() => { props.setArr(['여자 코트 추천', '강남 우동 맛집', '파이썬 독학']) }}>글 수정</button>
    </div>
  );
}; 

export default App;

