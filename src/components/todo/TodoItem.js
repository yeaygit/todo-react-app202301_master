import React, { useState } from 'react';
import { MdDone, MdDelete, MdUpdate, MdCheck } from 'react-icons/md';
import './css/TodoItem.css';
import cn from 'classnames';

const TodoItem = ({ todo, remove, update}) => {

  const {id, title, done} = todo;

  // 제목 수정 모드로 진입했는지 여부
  const [updateFlag, setUpdateFlag] = useState(false);
  // 할 일 완료 체크박스가 체크되었는지 여부
  const [checkFlag, setCheckFlag] = useState(done);
  // 수정시 제목변경처리를 위해 제목을 상태변수로 관리한다.
  const [titleValue, setTitleValue] = useState(title);

  // 서버에 삭제요청 클릭 이벤트핸들러
  const deleteClickHandler = e => {
    remove(id);
  };

  // 할 일 완료 수정 처리 이벤트 핸들러
  const doneCheckHandler = e => {
    
    if (updateFlag) return;

     // 서버쪽으로 현재 done값의 반대논리값을 전달하여 수정
     const modTodo = {
        ...todo,
        done: !done
     };
     // id, title, done 다 TodoTemplate에게 전달
     update(modTodo);
     setCheckFlag(modTodo.done);
  };

  // 제목수정 입력란이 변경될때 이벤트 처리
  const titleChangeHandler = e => {
    setTitleValue(e.target.value);
  };

  // 할 일 제목 수정 모드 진입 이벤트
  const modifyClickHandler = e => {
    if (checkFlag) {
      alert('완료된 할 일은 수정할 수 없어요!');
      return;
    }
    if (!updateFlag) {
      setUpdateFlag(true);
    } else {
      const modTodo = {
        ...todo,
        title: titleValue
      };
      // 무의미한 수정요청을 피하기위해 
      // 제목에 변화가 일어났을 때만 서버 통신을 보낸다.
      if (title !== titleValue) update(modTodo);
      setUpdateFlag(false);
    }
  };

  

  return (
    <li className="todo-item">
        <div 
            className={cn('check-circle', {active: done})}
            onClick={doneCheckHandler}
        >
            {done && <MdDone />}
        </div>
        {updateFlag 
        ? <input 
              className='text' 
              maxLength={10}
              value={titleValue} 
              onChange={titleChangeHandler} 
          />
        : <span className={cn('text', {finish: done})}>{title}</span>
        }
        <div className="modify" onClick={modifyClickHandler}>
            {updateFlag ? <MdCheck /> : <MdUpdate />}
        </div>
        <div className="remove" onClick={deleteClickHandler}>
            <MdDelete />
        </div>
    </li>
  );
};

export default TodoItem;