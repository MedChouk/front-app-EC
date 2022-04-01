import React, { useState, useEffect } from 'react';
import Modal from '../../components/UI/Modal';
import Layout from '../../components/Layout';
import Input from '../../components/UI/Input';
import { Row, Col, Button, Container } from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import linearCategories from '../../helpers/linearCategories';
import { createPage } from '../../actions';


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
  const [type, setType] = useState('');
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  const Close = () => {
    setCreateModal(false);
  }

  useEffect(() => {
    console.log('category', category);
    setCategories(linearCategories(category.categories));
  }, [category]);

  console.log('categories', categories);

  const onCategoryChange = (e) => {
    // eslint-disable-next-line eqeqeq
    const category = categories.find(category => category.value == e.target.value);
    setCategoryId(e.target.value);
    setType(category.type);
  }


  const handleBannerImages = (e) => {
    console.log(e);
    setBanners([...banners, e.target.files[0]]);
  }

  const handleProductImages = (e) => {
    console.log(e);
    setProducts([...products, e.target.files[0]]);
  }

  const submitPageForm = (e) => {
    //e.target.preventDefault();

    if (title === "") {
      alert('Title is required');
      setCreateModal(false);
      return;
    }

    const form = new FormData();
    form.append('title', title);
    form.append('description', desc);
    form.append('category', categoryId);
    form.append('type', type);
    banners.forEach((banner, index) => {
      form.append('banners', banner);
    });
    products.forEach((product, index) => {
      form.append('products', product);
    });

    /* console.log({ title, desc, category, banners, products, type }); */

    dispatch(createPage(form));


  }


  const renderCreatePageModal = () => {
    return (
      <Modal
        show={createModal}
        modalTitle={"Create New Page"}
        handleClose={submitPageForm}
        onHide={Close}
      >
        <Container>
          <Row>
            <Col>
              <select
                className="form-control mb-2"
                value={categoryId}
                onChange={onCategoryChange}
              >
                <option value="">select category</option>
                {
                  categories.map((cat, item) =>
                    <option key={item} value={cat._id}>{cat.name}</option>
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
            {
              banners.length > 0 ?
                banners.map((banner, index) =>
                  <Row key={index}>
                    <Col>{banner.name}</Col>
                  </Row>
                ) : null
            }
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
            {
              products.length > 0 ?
                products.map((product, index) =>
                  <Row key={index}>
                    <Col>{product.name}</Col>
                  </Row>
                ) : null
            }
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