import React, { useState } from "react";
import { Button, ButtonGroup, Card, CardHeader, CardBody, CardTitle, Row, Col } from "reactstrap";
import { Line, Bar } from "react-chartjs-2";
import { chartExample1, chartExample2, chartExample3, chartExample4 } from "variables/charts.js";
import { useLocation } from "react-router-dom"; 

function Dashboard() {
  const [bigChartData, setBigChartData] = useState("data1");

  const location = useLocation();

  const inputValue = location.state ? location.state.inputValue : "";
  console.log(inputValue)
  console.log("inputValue en Dashboard:", inputValue); 
  const setBgChartData = (name) => {
    setBigChartData(name);
  };

  return (
    <>
      <div className="content">
        {inputValue && (
          <Row>
            <Col md="12">
              <Card className="card-alert card-warning">
                <CardBody>
                  <h4 className="card-title">¡Alerta!</h4>
                  <p>
                    Tienes productos con bajo stock, <a href="/inventario">reponlos aquí</a>!
                  </p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        )}

        <Row>
          <Col xs="12">
            <Card className="card-chart">
              <CardHeader>
                <Row>
                  <Col className="text-left" sm="6">
                    <h5 className="card-category">Total Shipments</h5>
                    <CardTitle tag="h2">Performance</CardTitle>
                  </Col>
                  <Col sm="6">
                    <ButtonGroup className="btn-group-toggle float-right">
                      {["Accounts", "Purchases", "Sessions"].map((item, index) => (
                        <Button
                          key={index}
                          color="info"
                          size="sm"
                          tag="label"
                          className={`btn-simple ${bigChartData === `data${index + 1}` ? "active" : ""}`}
                          onClick={() => setBgChartData(`data${index + 1}`)}
                        >
                          <span className="d-none d-sm-block">{item}</span>
                          <span className="d-block d-sm-none">
                            <i className={`tim-icons icon-${item.toLowerCase().replace(" ", "-")}`} />
                          </span>
                        </Button>
                      ))}
                    </ButtonGroup>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line data={chartExample1[bigChartData]} options={chartExample1.options} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Total Shipments</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-bell-55 text-info" /> 763,215
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line data={chartExample2.data} options={chartExample2.options} />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Daily Sales</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-delivery-fast text-primary" /> 3,500€
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Bar data={chartExample3.data} options={chartExample3.options} />
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col lg="4">
            <Card className="card-chart">
              <CardHeader>
                <h5 className="card-category">Completed Tasks</h5>
                <CardTitle tag="h3">
                  <i className="tim-icons icon-send text-success" /> 12,100K
                </CardTitle>
              </CardHeader>
              <CardBody>
                <div className="chart-area">
                  <Line data={chartExample4.data} options={chartExample4.options} />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Dashboard;
