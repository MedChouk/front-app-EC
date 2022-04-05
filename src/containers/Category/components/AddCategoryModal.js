import React from 'react';
import Input from '../../../components/UI/Input';
import Model from '../../../components/UI/Modal';
import { Row, Col } from 'react-bootstrap';

const AddCategoryModal = (props) => {

    const {
        show,
        handleClose,
        modalTitle,
        categoryName,
        setCategoryName,
        parentCategoryId,
        setParentCategoryId,
        categoryList,
        handleCategoryImage,
        onSubmit,
        onHide
    } = props;

    return (
        <Model
            show={show}
            handleClose={handleClose}
            onSubmit={onSubmit}
            modalTitle={modalTitle}
            onHide={onHide}
        >
            <Row>
                <Col>
                    <Input
                        value={categoryName}
                        placeholder={'categoryName'}
                        onChange={(e) => setCategoryName(e.target.value)}
                    />
                </Col>
                <Col>
                    <select className="form-control" value={parentCategoryId} onChange={(e) => setParentCategoryId(e.target.value)}>
                        <option>Select category</option>
                        {
                            categoryList.map(option => <option key={option.value} value={option.value}>{option.name}</option>)
                        }
                    </select>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Input type="file" name="categoryImage" onChange={handleCategoryImage} />
                </Col>
            </Row>
        </Model>
    );
}

export default AddCategoryModal