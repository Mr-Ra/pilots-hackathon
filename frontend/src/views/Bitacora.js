import React, { useState } from "react";
import { Card, CardHeader, CardBody, CardTitle, Table, Row, Col, Button } from "reactstrap";

function Tables() {
  
  const [logEntries, setLogEntries] = useState([
    {
      action: "Acción 1",
      performedBy: "Usuario A",
      timestamp: "2024-11-23 10:30:00",
    },
    {
      action: "Acción 2",
      performedBy: "Usuario B",
      timestamp: "2024-11-23 10:45:00",
    },
    {
      action: "Acción 3",
      performedBy: "Usuario C",
      timestamp: "2024-11-23 11:00:00",
    },
  ]);

  
  const downloadLogEntry = (entry) => {
    const logText = `Fecha: ${entry.timestamp}\nAcción: ${entry.action}\nRealizado por: ${entry.performedBy}\n`;

    
    const blob = new Blob([logText], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${entry.action.replace(/\s+/g, '_')}_bitacora.txt`; 
    link.click();
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Bitácora de Acciones</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Fecha</th>
                      <th>Acción</th>
                      <th>Realizado por</th>
                      <th className="text-center">Hora</th>
                      <th className="text-center">Descargar</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logEntries.map((entry, index) => (
                      <tr key={index}>
                        <td>{entry.timestamp.split(" ")[0]}</td> {/* Fecha */}
                        <td>{entry.action}</td>
                        <td>{entry.performedBy}</td>
                        <td className="text-center">{entry.timestamp.split(" ")[1]}</td> {/* Hora */}
                        <td className="text-center">
                        
                          <Button color="primary" onClick={() => downloadLogEntry(entry)}>
                            Descargar
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}

export default Tables;
