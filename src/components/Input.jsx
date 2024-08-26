
function Input({type,placeholder,min=0,max=30,onChange,name,valeur=undefined}) {
  return (
    <input type={type} placeholder={placeholder} className="input" minLength={min} maxLength={max} onChange={onChange} name={name}
    defaultValue={valeur}
    />
  )
}

export default Input
