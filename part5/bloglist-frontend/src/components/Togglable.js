import { useState } from "react"
const Togglable = (props) => {
    const [visible, setVisibility] = useState(false)
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={() => {setVisibility(true)}}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={() => {setVisibility(false)}}>cancel</button>
            </div>
        </div>
    )
}

export default Togglable