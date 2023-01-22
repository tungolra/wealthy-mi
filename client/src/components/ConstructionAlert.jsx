import React, { useEffect, useRef, useState } from "react";
import { Fade } from "react-bootstrap";

function ConstructionAlert(props) {
  const showRef = useRef(false);
  const [show, setShow] = useState(showRef.current);

  const hiddenStyle = "d-none pe-none user-select-none";
  const showStyle =
    "alert alert-primary d-flex justify-content-center position-absolute start-50 top-50 translate-middle w-100 ";

  // wrap set show to update ref as well
  const updateShow = (val) => {
    showRef.current = val;
    setShow(val);
  };

  // return set state for callback
  useEffect(() => {
    props.onMount(updateShow);
  }, []);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        showRef.current = false;
        setShow(false);
      }, 2000);
    }
  }, [showRef.current]);

  return (
    <Fade in={show}>
      <div
        className={show ? showStyle : hiddenStyle}
      >
        This functionality is still under construction. Stay tuned for more!
      </div>
    </Fade>
  );
}

export default ConstructionAlert;
