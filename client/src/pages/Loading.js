import React from 'react'
import s from './Loading.module.css';
function Loading() {
  return (
    <div className={s.container}>
      <div class={s.loading}>
      <div class={s.spinLoading}></div>
      </div>
    </div>
  )
}

export default Loading