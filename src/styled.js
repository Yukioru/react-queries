import styled from '@emotion/styled';
import { css } from '@emotion/core';

import { convertMatchToMedia } from './utils';

const Query = styled('div')`
  display: none;
  ${props => css`
    @media ${convertMatchToMedia(props.match)} {
      display: ${props.display || 'block'};
    }
  `}
`;

export default Query;
