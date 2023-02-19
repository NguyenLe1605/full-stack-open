const SearchField = (props) => {
    console.log(props);
    const {value, onChange} = props;
    return (
        <div>
            <span>find countries </span>
            <input value={value} onChange={onChange}></input>
        </div>
    )
}

export default SearchField;