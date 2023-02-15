const Filter = (props) => {
    const {value, setState} = props;
    return (
        <div> 
            filter shown with <input value={value} onChange={(event) => setState(event.target.value)}/>
        </div>
    )
}

export default Filter;