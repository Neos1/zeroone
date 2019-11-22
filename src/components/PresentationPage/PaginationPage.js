/* eslint-disable react/static-property-placement */
import React from 'react';
import Pagination from '../Pagination';
import PresentationWrapper from './PresentationWrapper';

class PaginationPage extends React.Component {
  constructor() {
    super();
    this.state = { activePage: 1 };
  }

  handleChange = (page) => {
    this.setState({ activePage: page });
  }

  render() {
    const { activePage } = this.state;
    return (
      <PresentationWrapper>
        <Pagination
          activePage={activePage}
          lastPage={10}
          handlePageChange={this.handleChange}
          itemsCountPerPage={10}
          totalItemsCount={100}
          pageRangeDisplayed={5}
        />
      </PresentationWrapper>
    );
  }
}

export default PaginationPage;
