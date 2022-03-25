import React from 'react';
import Input from '../../../components/UI/Input';
import Model from '../../../components/UI/Modal';
import { Row, Col } from 'react-bootstrap';

const UpdateCategoryModal = (props) => {

    const {
        show,
        handleClose,
        modalTitle,
        size,
        onHide,
        expandedArray,
        checkedArray,
        handleCategoryInput,
        categoryList
    } = props;

    console.log({ expandedArray, checkedArray })

    return (
        <Model
            show={show}
            handleClose={handleClose}
            modalTitle={modalTitle}
            onHide={onHide}
            size={size}
            expandedArray={expandedArray}
            checkedArray={checkedArray}
        >
            <Row>
                <Col><h6>Expanded Categories</h6></Col>
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
                                    categoryList.map(option => <option key={option.value} value={option.value}>{option.name}</option>)
                                }
                            </select>
                        </Col>
                        <Col>
                            <select className="form-control"
                                value={item.type}
                                onChange={(e) => handleCategoryInput('type', e.target.value, index, 'expanded')}
                            >
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
                <Col><h6>Checked Categories</h6></Col>
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
                                    categoryList.map(option => <option key={option.value} value={option.value}>{option.name}</option>)
                                }
                            </select>
                        </Col>
                        <Col>
                            <select className="form-control"
                                value={item.type}
                                onChange={(e) => handleCategoryInput('type', e.target.value, index, 'checked')}
                            >
                                <option value="">Select type</option>
                                <option value="store">Store</option>
                                <option value="product">Product</option>
                                <option value="page">Page</option>
                            </select>
                        </Col>
                    </Row>
                )
            }

            {/* <Input type="file" name="categoryImage" onChange={handleCategoryImage} /> */}
        </Model>
    );
}

export default UpdateCategoryModal;