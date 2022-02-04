/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Col, Container, Row, Modal, Button } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import Layout from '../../components/Layout';
import { useDispatch, useSelector } from 'react-redux';
import { addProduct } from '../../actions';

/**
* @author
* @function Products
**/

export const Products = (props) => {

  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productPictures, setProductPictures] = useState([]);
  const category = useSelector((state) => state.category);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const Close = () => setShow(false);
  const dispatch = useDispatch();

  const handleClose = () => {

    const form = new FormData();
    form.append("name", name);
    form.append("quantity", quantity);
    form.append("price", price);
    form.append("description", description);
    form.append("category", categoryId);

    for (let pic of productPictures) {
      form.append("productPicture", pic);
    }

    dispatch(addProduct(form));

    setShow(false);
  };

  const createCategoryList = (categories, options = []) => {
      for (let category of categories) {
          options.push({
              value: category._id,
              name: category.name,
              parentId: category.parentId,
              type: category.type
          });
          if (category.children.length > 0) {
              createCategoryList(category.children, options)
          }
      }
      return options;
  }

  const handleProductPictures = (e) => {
    setProductPictures([...productPictures, e.target.files[0]]);
  };

  console.log("🚀 ~ file: index.js ~ line 49 ~ handleProductPictures ~ productPictures", productPictures);

  return(
    <Layout sidebar>
          <Container>
            <Row>
                <Col md={12}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                        <h3>Product</h3>
                        <Button variant="outline-dark" size="lg" onClick={handleShow}>  Add product </Button>

                    </div>
{/*                     <Col md={2}>
                        <ul>
                            { renderCategories(category.categories) }

                        </ul>
                    </Col> */}
                </Col>
            </Row> 
          </Container>
          <Modal
              show={show}
              onHide={handleClose}
              backdrop="static"
              keyboard={false}
          >
        <Modal.Header>
        <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Input 
              label="Name"
              value={name}
              placeholder={`Product Name`}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              label="Quantity"
              value={quantity}
              placeholder={`Quantity`}
              onChange={(e) => setQuantity(e.target.value)}
            />
            <Input
              label="Price"
              value={price}
              placeholder={`Price`}
              onChange={(e) => setPrice(e.target.value)}
            />
            <Input
              label="Description"
              value={description}
              placeholder={`Description`}
              onChange={(e) => setDescription(e.target.value)}
            />
            <select
              className="form-control"
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
            >
              <option>select category</option>
              {createCategoryList(category.categories).map((option) => (
                <option key={option.value} value={option.value}>
                  {option.name}
                </option>
              ))}
            </select>
            {productPictures.length > 0
              ? productPictures.map((pic, index) => (
                  <div key={index}>{pic.name}</div>
                ))
              : null}
            <input
              type="file"
              name="productPicture"
              onChange={handleProductPictures}
            />
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={Close}>
            Close
        </Button>
        <Button variant="primary" onClick={handleClose}>Save</Button>
        </Modal.Footer>
    </Modal>
    </Layout>
   )

 }