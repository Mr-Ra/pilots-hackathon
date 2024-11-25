import React, { useState, useEffect } from "react";
import { Button, Card, CardHeader, CardBody, CardTitle, Input, Row, Col } from "reactstrap";
import { Link } from "react-router-dom"; 

function Integracion() {
  const [inputValue, setInputValue] = useState(""); 
  const [savedInputValue, setSavedInputValue] = useState(""); 
  const [showAlert, setShowAlert] = useState(false); 

  useEffect(() => {
    const storedValue = localStorage.getItem("inputValue");
    if (storedValue) {
      setSavedInputValue(storedValue); 
      setInputValue(storedValue); 
    }
  }, []);


  const handleInputChange = (e) => {
    setInputValue(e.target.value); 
  };


  const handleApplyClick = () => {
    setSavedInputValue(inputValue); 
    localStorage.setItem("inputValue", inputValue); 
    if (inputValue) {
      setShowAlert(true); 
    } else {
      setShowAlert(false); 
    }
  };

  return (
    <div className="content">
      <Row>
        <Col md="12">
          {showAlert && (
            <Card className="alert-card">
              <CardBody>
                <h5 className="alert-title">¡Poco Stock!</h5>
                <p>El stock de este producto es limitado. Visita el inventario para más detalles.</p>
                <Link to="/inventario">
                  <Button color="primary">Ver Inventario</Button>
                </Link>
              </CardBody>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle tag="h3">Integración</CardTitle>
            </CardHeader>
            <CardBody>
              <h4>Integración Pilot</h4>
              <Input
                value={inputValue} 
                onChange={handleInputChange} 
                placeholder="Escribe algo..."
              />
              <Button className="button-submit" onClick={handleApplyClick}>
                Aplicar
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default Integracion;
