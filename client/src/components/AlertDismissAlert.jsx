import React, { useState, useEffect } from 'react';
import { Alert } from 'react-bootstrap';


const AutoDismissAlert = ({message,variant, delay = 5000 }) => {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
    }, delay);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [delay]);

  if (!show) return null;
  //console.log(message,variant)
  return (
    <Alert variant={variant} onClose={() => setShow(false)} dismissible>
      {message}
    </Alert>
  );
};

export default AutoDismissAlert;
