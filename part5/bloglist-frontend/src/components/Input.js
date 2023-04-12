const Input = (props) => {
    const {type, value, setState, name} = props;
    return (
    <div>
        <label htmlFor={name}>{name}</label>
        <input
            type={type}
            id={name}
            value={value}
            name={name}
            onChange={({target}) => setState(target.value)}
        />
        </div>
    )
}

export default Input