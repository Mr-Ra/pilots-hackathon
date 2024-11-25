import React, { useState } from "react";

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";

function Tables() {

  const [products, setProducts] = useState([
    {
      sku: "001",
      name: "Producto 1",
      purchasePrice: "$10.00",
      salePrice: "$15.00",
      stock: 100,
    },
    {
      sku: "002",
      name: "Producto 2",
      purchasePrice: "$20.00",
      salePrice: "$30.00",
      stock: 50,
    },
    {
      sku: "003",
      name: "Producto 3",
      purchasePrice: "$5.00",
      salePrice: "$8.00",
      stock: 200,
    },
    {
      sku: "004",
      name: "Producto 4",
      purchasePrice: "$8.00",
      salePrice: "$12.00",
      stock: 75,
    },
    {
      sku: "005",
      name: "Producto 5",
      purchasePrice: "$12.00",
      salePrice: "$18.00",
      stock: 150,
    },
  ]);

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Lista de Productos</CardTitle>
              </CardHeader>
              <CardBody>
                <Table className="tablesorter" responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>SKU</th>
                      <th>Nombre de Producto</th>
                      <th>Precio Compra</th>
                      <th>Precio Venta</th>
                      <th>Stock Actual</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={index}>
                        <td>{product.sku}</td>
                        <td>{product.name}</td>
                        <td>{product.purchasePrice}</td>
                        <td>{product.salePrice}</td>
                        <td>{product.stock}</td>
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
