/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Col, Container, Row, Modal, Button } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, addCategory } from '../../actions';


/**
* @author
* @function Category
**/

export const Category = (props) => {

    const category = useSelector(state => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [show, setShow] = useState(false);
    const Close = () => setShow(false);
    const handleShow = () => setShow(true);
    const dispatch = useDispatch();


    const handleClose = () => {

        const form = new FormData();

        form.append('name', categoryName);
        form.append('parentId', parentCategoryId);
        form.append('categoryImage', categoryImage);
        dispatch(addCategory(form));

        const cat = {
        
            categoryName,
            parentCategoryId, 
            categoryImage
        };

        console.log(cat)
        setShow(false);
        
    }

    const renderCategories = (categories) => {
        let myCategories = [];
        for (let category of categories) {
            myCategories.push(
                <li key={category.name}>
                    {category.name}
                    {category.children.length > 0 ? (<ul>{renderCategories(category.children)}</ul>) : null}
                </li>
            );

        }
        return myCategories;
    }

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

    const handleCategoryImage = (e) => {
    setCategoryImage(e.target.files[0]);
    }

  return(
    
    <Layout sidebar>
    <Container>
        <Row>
            <Col md={12}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
                    <h3>Category</h3>
                    <Button variant="outline-dark" size="lg" onClick={handleShow}>  Add category </Button>

                </div>
                <Col md={2}>
                    <ul>
                        { renderCategories(category.categories) }

                    </ul>
                </Col>
            </Col>
        </Row> 
    </Container>
    <>
    <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
    >
        <Modal.Header>
        <Modal.Title>Add New Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <Input 
                value={categoryName}
                placeholder={'categoryName'}
                onChange={(e) => setCategoryName(e.target.value)}
            />
            <select className="form-control" value={parentCategoryId} onChange={(e) => setParentCategoryId(e.target.value)}>
                <option>Select category</option>
                {
                    createCategoryList(category.categories).map(option => <option key={option.value} value={option.value}>{option.name}</option>)
                }
            </select>
            <Input type="file" name="categoryImage" onChange={handleCategoryImage} />
        </Modal.Body>
        <Modal.Footer>
        <Button variant="secondary" onClick={Close}>
            Close
        </Button>
        <Button variant="primary" onClick={handleClose}>Save</Button>
        </Modal.Footer>
    </Modal>
    </>
    </Layout>
   )

 }