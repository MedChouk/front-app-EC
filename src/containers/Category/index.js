/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import { Col, Container, Row, Button } from 'react-bootstrap';
import Input from '../../components/UI/Input';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategory, addCategory, updateCategories } from '../../actions';
import Model from '../../components/UI/Modal';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import {
    IoIosCheckboxOutline,
    IoIosCheckbox,
    IoIosArrowForward,
    IoIosArrowDown,
    IoIosAdd,
    IoIosTrash,
    IoIosCloudUpload
} from 'react-icons/io'

/**
* @author
* @function Category
**/

export const Category = (props) => {

    const category = useSelector(state => state.category);
    const [categoryName, setCategoryName] = useState('');
    const [parentCategoryId, setParentCategoryId] = useState('');
    const [categoryImage, setCategoryImage] = useState('');
    const [checked, setChecked] = useState([]);
    const [expanded, setExpanded] = useState([]);
    const [checkedArray, setCheckedArray] = useState([]);
    const [expandedArray, setExpandedArray] = useState([]);
    const [updateCategoryModal, setUpdateCategoryModal] = useState(false);
    const [deleteCategoryModal, setDeleteCategoryModal] = useState(false);
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
        setCategoryName('');
        setParentCategoryId('');

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
                {
                    label: category.name,
                    value: category._id,
                    children: category.children.length > 0 && renderCategories(category.children)
                }
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

    const updateCategory = () => {
        setUpdateCategoryModal(true);
        const categories = createCategoryList(category.categories);
        const checkedArray = [];
        const expandedArray = [];
        checked.length > 0 && checked.forEach((categoryId, index) => {

            const category = categories.find((category, _index) => categoryId == category.value);
            category && checkedArray.push(category);
        })
        expanded.length > 0 && expanded.forEach((categoryId, index) => {

            const category = categories.find((category, _index) => categoryId == category.value);
            category && expandedArray.push(category);
        })
        setCheckedArray(checkedArray);
        setExpandedArray(expandedArray);
        console.log({ checked, expanded, categories, checkedArray, expandedArray });
    }

    const handleCategoryInput = (key, value, index, type) => {
        console.log(value);
        if (type == "checked") {
            const updatedCheckedArray = checkedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item);
            setCheckedArray(updatedCheckedArray);
        } else if (type == "expanded") {
            const updatedExpandedArray = expandedArray.map((item, _index) =>
                index == _index ? { ...item, [key]: value } : item);
            setExpandedArray(updatedExpandedArray);
        }
    }

    const CloseCategoryModal = () => {
        setUpdateCategoryModal(false);
    }

    const handleCategoryImage = (e) => {
        setCategoryImage(e.target.files[0]);
    }


    const deleteCategory = () => {
        setDeleteCategoryModal(true);
    }

    const renderAddCategoryModal = () => {
        return (
            <Model
                show={show}
                handleClose={handleClose}
                modalTitle={'Add New Category'}
                onHide={Close}
            >
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
            </Model>
        );
    }

    const updateCategoriesForm = () => {
        const form = new FormData();

        expandedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        checkedArray.forEach((item, index) => {
            form.append('_id', item.value);
            form.append('name', item.name);
            form.append('parentId', item.parentId ? item.parentId : "");
            form.append('type', item.type);
        });
        dispatch(updateCategories(form)).then(result => {
            if (result) {
                dispatch(getAllCategory())
            }
        })

        CloseCategoryModal();

    }

    const renderUpdateCategoryModal = () => {
        return (
            <Model
                show={updateCategoryModal}
                handleClose={updateCategoriesForm}
                modalTitle={'Update Categories'}
                onHide={CloseCategoryModal}
                size="lg"
                expandedArray={expandedArray}
                checkedArray={checkedArray}
            >
                <Row>
                    <Col><h6>Expanded</h6></Col>
                </Row>
                {
                    expandedArray.length > 0 && expandedArray.map((item, index) =>
                        <Row key={index}>
                            <Col>
                                <Input
                                    value={item.name}
                                    placeholder={'categoryName'}
                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'expanded')}
                                />
                            </Col>
                            <Col>
                                <select className="form-control" value={item.parentId} onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'expanded')}>
                                    <option>Select category</option>
                                    {
                                        createCategoryList(category.categories).map(option => <option key={option.value} value={option.value}>{option.name}</option>)
                                    }
                                </select>
                            </Col>
                            <Col>
                                <select className="form-control">
                                    <option value="">Select type</option>
                                    <option value="store">Store</option>
                                    <option value="product">Product</option>
                                    <option value="page">Page</option>
                                </select>
                            </Col>
                        </Row>
                    )
                }
                <Row>
                    <Col><h6>Checked</h6></Col>
                </Row>
                {
                    checkedArray.length > 0 && checkedArray.map((item, index) =>
                        <Row key={index}>
                            <Col>
                                <Input
                                    value={item.name}
                                    placeholder={'categoryName'}
                                    onChange={(e) => handleCategoryInput('name', e.target.value, index, 'checked')}
                                />
                            </Col>
                            <Col>
                                <select className="form-control" value={item.parentId} onChange={(e) => handleCategoryInput('parentId', e.target.value, index, 'checked')}>
                                    <option>Select category</option>
                                    {
                                        createCategoryList(category.categories).map(option => <option key={option.value} value={option.value}>{option.name}</option>)
                                    }
                                </select>
                            </Col>
                            <Col>
                                <select className="form-control">
                                    <option value="">Select type</option>
                                    <option value="store">Store</option>
                                    <option value="product">Product</option>
                                    <option value="page">Page</option>
                                </select>
                            </Col>
                        </Row>
                    )
                }

                <Input type="file" name="categoryImage" onChange={handleCategoryImage} />
            </Model>
        );
    }

    return (

        <Layout sidebar>
            <Container>
                <Row>
                    <Col md={12}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 15 }}>
                            <h3>Category</h3>
                            <div className="actionBtnContainer mx-2">
                                <Button className="mx-2" variant="success" size="lg" onClick={handleShow}><IoIosAdd /> Add </Button>
                                <Button variant="primary" size="lg" onClick={updateCategory}><IoIosCloudUpload />Edit </Button>
                                <Button className="mx-2" variant="danger" size="lg" onClick={deleteCategory}><IoIosTrash />Delete </Button>
                            </div>
                        </div>
                        <Col md={2}>
                            {/*       <ul>
                                {renderCategories(category.categories)}
                            </ul> */}
                            <CheckboxTree
                                nodes={renderCategories(category.categories)}
                                checked={checked}
                                expanded={expanded}
                                onCheck={checked => setChecked(checked)}
                                onExpand={expanded => setExpanded(expanded)}
                                icons={{
                                    check: <IoIosCheckbox />,
                                    uncheck: <IoIosCheckboxOutline />,
                                    halfCheck: <IoIosCheckboxOutline />,
                                    expandClose: <IoIosArrowForward />,
                                    expandOpen: <IoIosArrowDown />
                                }}
                            />
                        </Col>
                    </Col>
                </Row>
            </Container>

            {renderAddCategoryModal()}
            {renderUpdateCategoryModal()}
        </Layout>
    )

}