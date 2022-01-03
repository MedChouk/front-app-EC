import React from 'react';
import  Layout  from '../../components/Layout';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Input from '../../components/UI/Input';

function Signup(props) {
  return (
    <Layout>
    <Container>
      <Row style={{ marginTop: '50px' }}>
        <Col md={{span: 6, offset: 3}}>
          <Form>
            <Row>
{/*                 <Col md={6}>
                  <Form.Group className="mb-3" controlId="formBasicFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter first name " />
                  </Form.Group>
                </Col> */}
                <Col md={6}>
                  <Input 
                    label="First Name"
                    placeholder="Enter First Name"
                    value=""
                    type="text"
                    onChange={ () => {

                    }}
                  />
                </Col>
                <Col md={6}>
                  <Input 
                      label="Last Name"
                      placeholder="Enter Last Name"
                      value=""
                      type="text"
                      onChange={ () => {

                      }}
                    />
                </Col>
            </Row>

            <Input 
              label="Email"
              placeholder="Enter Email"
              value=""
              type="email"
              onChange={ () => {

              }}
            />

            <Input 
              label="Password"
              placeholder="Enter Password"
              value=""
              type="password"
              onChange={ () => {

              }}
            />

            <div className="d-grid gap-2 mt-2">
            <Button variant="outline-secondary" type="submit">
              Submit
            </Button>
            </div>

          </Form>
        </Col>
      </Row>
    </Container>
  </Layout>
  )
}

export default Signup
