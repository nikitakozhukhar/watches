import { useState } from "react"
import { useEffect } from "react"
import './watch.css'


export function Watch({watch, handleRemove}) {
  
  const defTime = {
    hours: 0,
    minutes: 0,
    seconds: 0
  }

  const defArrow = {
    hours: {},
    minutes: {},
    seconds: {}
  } 

  const [time, setTime] = useState(defTime)
  const [arrow, setArrow] = useState(defArrow)

  const getTime = () => {
    const date = new Date()
    const currentTimezoneOffset = date.getTimezoneOffset() / 60
    const offset = currentTimezoneOffset + watch.timezone

    date.setHours(date.getHours() + offset)

    return {
      hours: date.getHours(),
      minutes: date.getMinutes(),
      seconds: date.getSeconds(),
    }
  }

  const getArrowStyle = deg => {
    return {transform: `translate(-50%, -100%) rotate(${deg}deg)`}
  }

  const changeTime = () => {
    const time = getTime()
    
    setTime(time)
    
    setArrow({
      hours: getArrowStyle(time.hours * 30 + time.minutes / 2),
      minutes: getArrowStyle(time.minutes * 6),
      seconds: getArrowStyle(time.seconds * 6)
    })
    
  }

  useEffect(() => {
    changeTime()
    console.log(time)
    const diff = 1000 - new Date().getMilliseconds()
    let interval;

    setTimeout(() => {
      interval = setInterval(() => changeTime(), 1000)
    }, diff)
   
    return () => clearInterval(interval)
  }, [])

  const formatTime = digit => digit > 0 ? digit: `0${digit}`
  // console.log(time)
  return (
   <div className={'watches__item item-watches'}>
        <div className={'item-watches__title'}>{watch.title}</div>
        <div className={'item-watches__main'}>
          <div className={'item-watches__time-digit'}>
            {formatTime(time.hours)}:{formatTime(time.minutes)}:{formatTime(time.seconds)}
          </div>
          <div className={'item-watches__clock-face clock-face'}>
            <div className={'clock-face__hand clock-face__hour-hand'} style={arrow.hours}></div>
            <div className={'clock-face__hand clock-face__minute-hand'} style={arrow.minutes}></div>
            <div className={'clock-face__hand clock-face__second-hand'} style={arrow.seconds}></div>
          </div>
  
          <button className={'item-watches__btn-remove'} onClick={() => handleRemove(watch)}>
            <span className={'_visually-hidden'}>Удалить</span>
          </button>
        </div>
      </div>
  )
}