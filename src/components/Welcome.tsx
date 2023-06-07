import React from 'react'

interface Self{
  self:string,
}

export default function Welcome({self}:Self) {
  return (
    <div>Welcome  {self}</div>
  )
}
