import React from 'react';
import Layout from '../../components/Layout';
import { Jumbotron } from 'react-bootstrap';



function Home(props) {
  return (
    <Layout>
     <Jumbotron style={{padding: '3rem', margin:'1rem', background: '#f8f8f8'}} className="text-center">
            <h1>Welcome to Admin Dashboard</h1>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a sear</p>
        </Jumbotron>
    </Layout>
  )
}

export default Home
