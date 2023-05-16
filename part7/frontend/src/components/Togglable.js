import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisibility] = useState(false);

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  };
  Togglable.displayName = "Togglable";

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };


  useImperativeHandle(ref, () => {
    return {
      toggleVisibility() {
        setVisibility(!visible);
      }
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => {setVisibility(true);}}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={() => {setVisibility(false);}}>cancel</button>
      </div>
    </div>
  );
});

export default Togglable;