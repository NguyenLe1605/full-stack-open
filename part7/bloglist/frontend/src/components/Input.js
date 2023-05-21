import Form from "react-bootstrap/Form";
const Input = (props) => {
  const { id, type, value, handleChange, name } = props;
  return (
    <Form.Group>
      <Form.Label htmlFor={id}>{name}</Form.Label>
      <Form.Control
        type={type}
        id={id}
        value={value}
        name={name}
        onChange={handleChange}
      />
    </Form.Group>
  );
};

export default Input;
