/* eslint-disable react/static-property-placement */
import React from 'react';
import PropTypes from 'prop-types';
import ReactJsPagination from 'react-js-pagination';
import { withTranslation } from 'react-i18next';
import { ThinArrow } from '../Icons';

import './Pagination.scss';

/**
 * Component for pagination
 */
@withTranslation()
class Pagination extends React.Component {
  static propTypes = {
    activePage: PropTypes.number.isRequired,
    lastPage: PropTypes.number.isRequired,
    handlePageChange: PropTypes.func.isRequired,
    itemsCountPerPage: PropTypes.number.isRequired,
    totalItemsCount: PropTypes.number.isRequired,
    pageRangeDisplayed: PropTypes.number.isRequired,
    t: PropTypes.func.isRequired,
  }

  constructor(props) {
    super(props);
    this.state = {
      value: props.activePage,
    };
  }

  handleChange = (event) => {
    const {
      lastPage,
    } = this.props;
    const minPage = 1;
    let newValue = parseInt(event.target.value, 10) || 0;
    // не даём ввести значение больше максимального
    if (newValue >= lastPage) newValue = lastPage;
    if (newValue <= minPage) newValue = minPage;
    this.setState({ value: newValue });
    event.target.select();
  }

  handleButtonClick = (page) => {
    this.onPageChange(page);
  }

  onPageChange = (page) => {
    const {
      handlePageChange,
    } = this.props;
    handlePageChange(page);
    this.setState({ value: page });
  }

  handleFocus = (event) => {
    event.target.select();
  }

  render() {
    const {
      activePage,
      lastPage,
      itemsCountPerPage,
      totalItemsCount,
      pageRangeDisplayed,
      t,
    } = this.props;
    const {
      value,
    } = this.state;
    return (
      <>
        <ReactJsPagination
          activePage={activePage}
          lastPage={lastPage}
          itemsCountPerPage={itemsCountPerPage}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={pageRangeDisplayed}
          onChange={this.onPageChange}
          prevPageText={(<ThinArrow />)}
          nextPageText={(<ThinArrow />)}
          firstPageText={(
            <>
              <ThinArrow />
              <ThinArrow />
            </>
          )}
          lastPageText={(
            <>
              <ThinArrow />
              <ThinArrow />
            </>
          )}
          itemClass="pagination__item"
          itemClassFirst="pagination__item--first"
          itemClassLast="pagination__item--last"
          itemClassPrev="pagination__item--prev"
          itemClassNext="pagination__item--next"
        />
        <div className="pagination__footer">
          <span>{t('other:page')}</span>
          <input
            type="number"
            value={value}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
          />
          <span>{`из ${lastPage}`}</span>
          <button
            type="button"
            onClick={() => this.handleButtonClick(value)}
          >
            {t('other:goTo')}
          </button>
        </div>
      </>
    );
  }
}

export default Pagination;
