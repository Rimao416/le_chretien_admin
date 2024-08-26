import React from 'react'

function Button({icon,className="btn-green",onClick}) {
  return (
    <span className={className} onClick={onClick}>{icon}</span>
  )
}

export default Button   
