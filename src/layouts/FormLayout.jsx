function FormLayout({ title, onSubmit,children }) {
  return (
    <form onSubmit={onSubmit}>
      <div className="form">
        <div className="form__title">{title}</div>
        <div className="form__container">{children}</div>
      </div>
    </form>
  );
}

export default FormLayout;
