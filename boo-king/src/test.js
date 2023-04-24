import React from 'react'
import { useLocation } from 'react-router-dom'

const Test = () => {

    const location = useLocation()

    console.log('here the location ' , location)
  return (
    <div>test</div>
  )
}

export default Test