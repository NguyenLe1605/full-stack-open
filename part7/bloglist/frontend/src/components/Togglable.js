import { useState, forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/esm/Button";

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisibility] = useState(false);

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
  };
  Togglable.displayName = "Togglable";

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };
  const buttonStyle = {
    marginBottom: 15,
  };

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility() {
        setVisibility(!visible);
      },
    };
  });

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button
          style={{ ...buttonStyle, marginTop: 5 }}
          onClick={() => {
            setVisibility(true);
          }}
        >
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button
          style={buttonStyle}
          onClick={() => {
            setVisibility(false);
          }}
        >
          cancel
        </Button>
      </div>
    </div>
  );
});

export default Togglable;
