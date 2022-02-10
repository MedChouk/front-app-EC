/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import { Col, Container, Row, Button, Table } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import Model from '../../components/UI/Modal';
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
  const product = useSelector((state) => state.product);
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

  const renderProducts = () => {
    return (
      <Table responsive="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {product.products.length > 0
            ? product.products.map((product) => (
                <tr key={product._id}>
                  <td>2</td>
                  <td>{product.name}</td>
                  <td>{product.price}</td>
                  <td>{product.quantity}</td>
                  <td>{product.category.name}</td>
                  <td>
                      *******
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
    );
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
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15 }}>
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
            <Row>
              <Col>
              {renderProducts()}
              </Col>
            </Row>
          </Container>

    <Model
            show={show}
            handleClose={handleClose}
            modalTitle={'Add New Product'}
            onHide={Close}
          >

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
             
    </Model>
    </Layout>
   )

 }