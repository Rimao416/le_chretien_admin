function Select({name,onChange,children}) {
  return (
      <select name={name} onChange={onChange} id="" className="input">
      {children}
      </select>
  );
}

export default Select;
