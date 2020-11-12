import { PureComponent } from 'react';
import PropTypes from 'prop-types';
import matchMedia from 'matchmediaquery';

import { convertMatchToMedia, isQueries } from './utils';

class MediaQuery extends PureComponent {
  constructor(props) {
    super(props);
    this.mql = null;
    this.mediaListener = this.mediaListener.bind(this);
    this.state = {
      match: false,
    };
  }

  componentDidMount() {
    const { match } = this.props;
    const media = convertMatchToMedia(match);
    if (media) {
      this.mql = matchMedia(media, {});
      this.mql.addListener(this.mediaListener);
      this.mediaListener(this.mql);
    }
  }

  componentWillUnmount() {
    if (!this.mql) return;
    this.mql.removeListener(this.mediaListener);
    this.mql.dispose();
    this.mql = null;
  }

  mediaListener() {
    const { matches: match } = this.mql;
    this.setState({ match });
  }

  render() {
    const { match } = this.state;
    const { children } = this.props;
    if (!match) return false;
    return children;
  }
}

MediaQuery.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  children: PropTypes.any.isRequired,
  match: isQueries,
};

MediaQuery.defaultProps = {
  match: {},
};

export { MediaQuery };
export default MediaQuery;
