const Input = ({text, value, setState}) => (
    <div>
        {text}: <input value={value} onChange={(event) => setState(event.target.value)}/>
    </div>
)

const PersonForm = (props) => {
    const {handleForm, inputFields} = props;
    return (
        <form onSubmit={handleForm}>
        {
            inputFields.map(
                field => <Input key={field.text} text={field.text} value={field.value} setState={field.setState} />
            )
        }
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
} 

export default PersonForm;