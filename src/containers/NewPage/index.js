import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import linearCategories from '../../helpers/linearCategories';


/**
* @author
* @function NewPage
**/

export const NewPage = (props) => {

  const [createModal, setCreateModal] = useState(false);
  const [title, setTitle] = useState('');
  const category = useSelector(state => state.category);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [desc, setDesc] = useState('');

  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);

  const Close = () => {
    setCreateModal(false);
  }

  useEffect(() => {
    console.log('category', category);
    setCategories(linearCategories(category.categories));
  }, [category]);

  console.log('categories', categories);

  const handleBannerImages = (e) => {
    console.log(e);
    setBanners([...banners, e.target.files[0]]);
  }

  const handleProductImages = (e) => {
    console.log(e);
    setProducts([...products, e.target.files[0]]);
  }


  const renderCreatePageModal = () => {
    return (
      <Modal
        show={createModal}
        modalTitle={"Create New Page"}
        handleClose={() => setCreateModal(false)}
        onHide={Close}
      >
        <Container>
          <Row>
            <Col>
              <select
                className="form-control mb-2"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
              >
                <option value="">select category</option>
                {
                  categories.map(cat =>
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  )
                }
              </select>
              {/*                 <Input 
                    type="select"
                    value={categoryId}
                    onChange={onCategoryChange}
                    options={categories}
                    placeholder={'Select Category'}
                /> */}
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={'Page title'}
                className=""
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                className="form-control"
                type="file"
                name="banners"
                onChange={handleBannerImages}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                placeholder={'Page Desc'}
                className=""
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Input
                className="form-control"
                type="file"
                name="products"
                onChange={handleProductImages}
              />
            </Col>
          </Row>
        </Container>
      </Modal>
    );
  }

  return (
    <Layout sidebar>
      {renderCreatePageModal()}
      <div className="d-grid gap-2 mt-2">
        <Button className="mt-3 mx-2" variant="primary" size="lg" onClick={() => setCreateModal(true)}> Create Page</Button>
      </div>

    </Layout>
  )
}