import React from 'react'
import { useSelector } from 'react-redux'

function Welcome() {
    const state = useSelector((state) => state);
    console.log(state);
  return (
    <div>Welcome</div>
  )
}

export default Welcome