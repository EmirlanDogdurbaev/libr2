import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Redirect({where}) {
  const navigate = useNavigate()
  useEffect(()=>{
    navigate(where)
  })
  return (
    <></>
  )
}
