import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { convertMatchToMedia, isQueries } from './utils';

const QueryStyled = styled('div', {
  shouldForwardProp: prop => !['match', 'display', 'matchedStyles'].includes(prop),
})`
  display: none !important;
  ${props => css`
    @media ${convertMatchToMedia(props.match)} {
      ${props.matchedStyles || css`display: ${props.display || 'block'} !important;`}
    }
  `}
`;

const Query = ({
  match,
  display,
  children,
  onlyClient,
  ...props
}) => {
  if (onlyClient && typeof window === 'undefined') return '';
  const ref = useRef();
  const queryProps = {
    ...props,
    match,
    display,
  };
  return (
    <QueryStyled ref={ref} {...queryProps}>
      {children}
    </QueryStyled>
  );
};

Query.propTypes = {
  match: isQueries,
  display: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
  onlyClient: PropTypes.bool,
};

Query.defaultProps = {
  match: {
    type: 'screen',
  },
  display: undefined,
  onlyClient: false,
};

export default Query;
