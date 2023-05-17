const Input = (props) => {
  const { id, type, value, handleChange, name } = props;
  return (
    <div>
      <label htmlFor={id}>{name}</label>
      <input
        type={type}
        id={id}
        value={value}
        name={name}
        onChange={handleChange}
      />
    </div>
  );
};

export default Input;
