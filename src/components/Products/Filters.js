import React, { useContext } from 'react';
import { ProductContext } from '../../context/products';

const Filters = () => {
  const {
    filters: { search, category, shipping, price },
    updateFilters,
    sorted,
  } = useContext(ProductContext);
  return (
    <section className='filters-section'>
      <h2 className='section-title'>search products</h2>
      <form className='filters-form'>
        <div>
          {/* -----search input------ */}
          <div className='form-group'>
            <label htmlFor='search'>search itrms</label>
            <input
              type='text'
              id='search'
              name='search'
              value={search}
              onChange={updateFilters}
              className='form-control'
            />
          </div>
          {/* ------end of serach input----- */}
          {/* ------select category----- */}
          <div className='form-group'>
            <label htmlFor='category'>category</label>
            <select
              name='category'
              id='category'
              className='form-control'
              value={category}
              onChange={updateFilters}
            >
              <option value='all'>all</option>
              <option value='apple'>apple</option>
              <option value='samsung'>samsung</option>
              <option value='lenovo'>lenovo</option>
            </select>
          </div>
          {/* ------end of select category----- */}
          <div className='form-group'>
            <input
              type='checkbox'
              name='shipping'
              id='shipping'
              checked={shipping}
              onChange={updateFilters}
            />
            <label htmlFor='shipping'>free shipping</label>
          </div>
          {/* --free shipping--- */}
          {/* --end of free shipping--- */}
        </div>
        <div className='price-group'>
          <p>price</p>
          <label>
            <input
              type='radio'
              name='price'
              value='all'
              checked={price === 'all'}
              onChange={updateFilters}
            />
            all
          </label>
          <label>
            <input
              type='radio'
              name='price'
              value='0'
              checked={price === 0}
              onChange={updateFilters}
            />
            £0 - £300
          </label>
          <label>
            <input
              type='radio'
              name='price'
              value='300'
              checked={price === 300}
              onChange={updateFilters}
            />
            300 - £650
          </label>
          <label>
            <input
              type='radio'
              name='price'
              value='650'
              checked={price === 650}
              onChange={updateFilters}
            />
            over £650
          </label>
        </div>
      </form>
      <h6>total products : {sorted.flat().length}</h6>
      <hr />
    </section>
  );
};

export default Filters;

// flat() flattings back our product
