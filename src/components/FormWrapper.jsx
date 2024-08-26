
function FormWrapper({label,children}) {
  return (
    <div className="form-wrapper">
      <label htmlFor="" className="form-wrapper__label">
        {label}
      </label>
      {children}
      
    </div>
  );
}

export default FormWrapper;
