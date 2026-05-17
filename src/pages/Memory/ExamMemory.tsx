/* eslint-disable react-hooks/exhaustive-deps */
import React, { useCallback, useState } from 'react'

type ChildButtonProps = {
  onClick: () => void
  label: string
}

const ChildButton = React.memo(({ onClick, label }: ChildButtonProps) => {
  const style = `
    color: ${label === '일반 함수' ? '#2ed573' : '#cfaeae'};
    font-weight: bold;
  `

  console.log(`%c[자식] ${label} 렌더링됨`, style)
  return (
    <button onClick={onClick} style={{ marginRight: '10px' }}>
      {label} 실행
    </button>
  )
})

// const ChildButton = ({onClick, label}: ChildButtonProps) => {
//   const style = `
//     color: ${label === '일반 함수' ? '#2ed573' : '#cfaeae'};
//     font-weight: bold;
//   `

//   console.log(`%c[자식] ${label} 렌더링됨`, style)
//   return (
//     <button onClick={onClick} style={{ marginRight: '10px' }}>
//       {label} 실행
//     </button>
//   )
// }

/* ================================================== */
/* ================================================== */
function ExamMemo() {
  const [count, setCount] = useState<number>(0)
  const [toggle, setToggle] = useState<boolean>(true)

  // [Case 1] 일반 함수
  // 부모가 리렌더링될 때마다 새로운 주소(Reference)를 가짐
  const Function = () => { console.log('함수 실행됨') }

  // [Case 2] 메모리제이션 함수
  // 의존성 배열이 변하지 않으면 '기존 주소'를 재사용
  const CallbackFuntion = useCallback(() => { console.log('메모리제이션 함수 실행됨') }, [count])

  return (
    <div style={{ padding: '20px', border: '1px solid #ccc', borderRadius: '1em' }}>
      <h2>useCallback</h2>
      {/* ========== TOGGLE ========== */}
      <div style={{ border: '1px solid red', padding: '10px', marginBottom: '10px' }}>
        <h4>함수와 상관없는 변화(Toggle)</h4>
        <button onClick={() => setToggle(!toggle)}>부모 리렌더링 유발: (Toggle: {toggle.toString().toUpperCase()})</button>
      </div>
      {/* ========== COUNT ========== */}
      <div style={{ border: '1px solid green', padding: '10px' }}>
        <h4>자식한테 함수 전달</h4>
        <ChildButton onClick={Function} label='일반 함수' />
        <ChildButton onClick={CallbackFuntion} label='메모리제이션 함수' />
      </div>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setCount(c => c + 1)}>Count 올리기: {count}</button>
      </div>
    </div>
  )
}

export default ExamMemo
