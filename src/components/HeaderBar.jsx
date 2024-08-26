import Input from "./Input"

function HeaderBar({placeholder,onChange,name,children}) {
  return (
    <div className="authors__header">
      <Input type="text" placeholder={placeholder} onChange={onChange} name={name}/>
      {children}
    </div>
  )
}

export default HeaderBar
