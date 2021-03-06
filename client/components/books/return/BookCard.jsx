/**
 *  @fileOverview BookCard component that presents a book
 *
 *  @author Paradise Kelechi
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import swal from 'sweetalert2';
import { connect } from 'react-redux';
import { returnBook } from '../../../actions/Borrow';
import { getPendingBooks } from '../../../actions/Book';

/**
 * BookCard Class
 *
 * @class BookCard
 * @extends {React.Component}
 */
class BookCard extends React.Component {
  /**
   * Return Book On Click function
   *
   * @returns {void}
   * @param {String} id
   * @memberof BookCard
   */
  returnButtonOnClick(id) {
    swal({
      title: 'Do you want to return this book?',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, return it!'
    }).then((result) => {
      if (result.value) {
        this.props.returnBook(id);
        this.props.getPendingBooks();
      }
    });
  }

  /**
   * Render object
   *
   * @returns {void}
   * @memberof BookCard
   */
  render() {
    return (
      <div className="col m3 s12">
        <div className="card  sticky-action small">
          <div className="card-image waves-effect waves-block waves-light">
            <img className="activator" src={this.props.image !== 'undefined' ? this.props.image : '../../../assets/img/noimage.png'} alt="book" />
          </div>
          <div className="card-content">
            <span className="card-title activator grey-text text-darken-4">
              {this.props.name}
              <i className="material-icons right">more_vert</i>
            </span>
            <small>by {this.props.author}</small>
            {
              this.props.loggedIn ?
                (
                  <p>
                    <button
                      id={`book-return-${this.props.id}`}
                      value={this.id}
                      className="btn btn-book"
                      onClick={this.returnButtonOnClick.bind(this, this.props.id)}
                    >
                      Return
                    </button>
                  </p>
                ) :
                (
                  <Link to="/signin">
                    <p><button className="btn">Sign In to Return</button></p>
                  </Link>
                )
            }
          </div>
          <div className="card-reveal">
            <span className="card-title grey-text text-darken-4">
              {this.props.name}
              <i className="material-icons right">close</i>
            </span>
            <p>{this.props.description === 'undefined' ? 'No book description' : this.props.description}</p>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    returnBook: (bookId) => {
      dispatch(returnBook(bookId));
    },
    getPendingBooks: () => {
      dispatch(getPendingBooks());
    }
  };
};

const mapStateToProps = (state) => {
  return {
    return: state.returnBookReducer[0],
  };
};

BookCard.propTypes = {
  name: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  returnBook: PropTypes.func.isRequired,
  getPendingBooks: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(BookCard);
