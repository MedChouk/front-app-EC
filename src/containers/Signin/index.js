import React from 'react'
import  Layout  from '../../components/Layout';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Input from '../../components/UI/Input';


function Signin(props) {
  return (
  <Layout>
    <Container>
      <Row style={{ marginTop: '50px' }}>
        <Col md={{span: 6, offset: 3}}>
          <Form>
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
            <Button variant="outline-primary" type="submit">
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

export default Signin
