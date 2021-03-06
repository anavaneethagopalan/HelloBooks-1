/**
 *  @fileOverview Categories component - renders the categories table
 *
 *  @author Paradise Kelechi
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

/**
 * Categories Function
 *
 * @param {Object} props
 * @returns {Object} JSX Object
 */
const Categories = (props) => {
  let categoryList = '';
  if ((props.list).length > 0) {
    categoryList = (props.list).map((category) => {
      return (
        <tr key={category.id}>
          <td>{category.name}</td>
          <td>{category.description}</td>
          <td>{category.abbreviation}</td>
        </tr>
      );
    });
  }
  return (
    <div>
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Abbreviation</th>
          </tr>
        </thead>
        <tbody>
          {categoryList}
        </tbody>
      </table>
    </div>
  );
};

Categories.propTypes = {
  list: PropTypes.array.isRequired
};

export default Categories;
