import React, { useState } from 'react';
import  Layout  from '../../components/Layout';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';


/**
* @author
* @function Signin
**/

const Signin = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useSelector(state => state.auth);

  const dispatch = useDispatch();

  const userLogin = (e) => {
    e.preventDefault();
    
    const user = {
      email,
       password
    }
    dispatch(login(user));
  }

  if(auth.authenticate){
    return <Redirect to={`/`} />
  }

  return (
  <Layout>
    <Container>
      <Row style={{ marginTop: '70px' }}>
        <Col md={{span: 6, offset: 3}}>
          <Form onSubmit={userLogin}>
            <Input 
                label="Email"
                placeholder="Enter Email"
                value={email}
                type="email"
                onChange={ (e) => setEmail(
                  e.target.value
                )}
              />

            <Input 
              label="Password"
              placeholder="Enter Password"
              value={password}
              type="password"
              onChange={ (e) => setPassword(
                e.target.value
              )}
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
