import React from 'react';
import Layout from '../../components/Layout';
import { Jumbotron, Row, Container, Col } from 'react-bootstrap';
import './style.css';



function Home(props) {
  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col md={2} className="sidebar">Side bar</Col>
          <Col md={10} style={{ marginLeft: 'auto' }}>Container</Col>
        </Row>
      </Container>
{/*      <Jumbotron style={{padding: '3rem', margin:'1rem', background: '#f8f8f8'}} className="text-center">
            <h1>Welcome to Admin Dashboard</h1>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a sear</p>
        </Jumbotron> */}
    </Layout>
  )
}

export default Home
