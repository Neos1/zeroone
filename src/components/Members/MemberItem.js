import React from 'react';
import PropTypes from 'prop-types';

const MemberItem = ({
  name,
}) => (
  <div>
    {name}
  </div>
);

MemberItem.propTypes = {
  name: PropTypes.string.isRequired,
};

export default MemberItem;
