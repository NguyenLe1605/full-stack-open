const Input = (props) => {
  const { id, type, value, setState, name } = props;
  return (
    <div>
      <label htmlFor={id}>{name}</label>
      <input
        type={type}
        id={id}
        value={value}
        name={name}
        onChange={({ target }) => setState(target.value)}
      />
    </div>
  );
};

export default Input;