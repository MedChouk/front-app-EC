import React from 'react'
import  Layout  from '../../components/Layout';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { login } from '../../actions';
import { useDispatch } from 'react-redux';

function Signin(props) {

  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();
    
    const user = {
      email:'chouk@gmail.com',
       password: '123456'
    }
    dispatch(login(user));
  }
  return (
  <Layout>
    <Container>
      <Row style={{ marginTop: '50px' }}>
        <Col md={{span: 6, offset: 3}}>
          <Form onSubmit={userLogin}>
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
