import { PureComponent } from 'react';
import some from 'lodash.some';
import omit from 'lodash.omit';
import kebabCase from 'lodash.kebabcase';
import PropTypes from 'prop-types';

const mediaTypes = [
  'all',
  'print',
  'screen',
  'speech',
];

const deprecatedMediaTypes = [
  'braille',
  'embossed',
  'handheld',
  'projection',
  'tty',
  'tv',
];

const mediaQueries = [
  'aspectRatio',
  'minAspectRatio',
  'maxAspectRatio',
  'minColor',
  'maxColor',
  'colorIndex',
  'minColorIndex',
  'maxColorIndex',
  'deviceAspectRatio',
  'minDeviceAspectRatio',
  'maxDeviceAspectRatio',
  'deviceHeight',
  'minDeviceHeight',
  'maxDeviceHeight',
  'deviceWidth',
  'minDeviceWidth',
  'maxDeviceWidth',
  'height',
  'minHeight',
  'maxHeight',
  'monochrome',
  'minMonochrome',
  'maxMonochrome',
  'orientation',
  'resolution',
  'minResolution',
  'maxResolution',
  'scan',
  'width',
  'minWidth',
  'maxWidth',
];

function validateType(type, propName, componentName) {
  if (type) {
    if (deprecatedMediaTypes.includes(type)) {
      throw new Error(`
        Failed prop: \`${propName}\` passed to \`${componentName}\`.
        It's a deprecated type. Deprecated types: \`${JSON.stringify(deprecatedMediaTypes)}\`.
        One of the allowed types was expected: \`${JSON.stringify(mediaTypes)}\`.
      `);
    }
    if (!mediaTypes.includes(type)) {
      throw new Error(`
        Failed prop: \`${propName}\` passed to \`${componentName}\`.
        One of the allowed types was expected: \`${JSON.stringify(mediaTypes)}\`
      `);
    }
  }
}

function isQueries(props, propName, componentName) {
  const { type } = props[propName];
  validateType(type, `${propName}.type`, componentName);
  const queryProps = omit(props[propName], 'type');
  const queries = Object.keys(queryProps);
  queries.forEach(key => {
    const value = queryProps[key];
    if (!mediaQueries.includes(key)) {
      throw new Error(`
        Failed prop: \`${propName}.${key}\` passed to \`${componentName}\`.
        One of the allowed types was expected: \`${JSON.stringify(mediaQueries, null, 2)}\`
      `);
    }
    if (Array.isArray(value)) {
      validateType(value[0], `${propName}.${key}[0]`, componentName);
    }
    return true;
  });
}

class MediaQuery extends PureComponent {
  static prepareMediaValue(value) {
    let val = value;
    if (val === null || val === undefined) {
      val = false;
    }
    if (Array.isArray(val)) {
      return this.prepareMediaValue(val[1]);
    }
    if (typeof value === 'number') {
      val = `${val}px`;
    }
    return val;
  }

  static formatQuery(key, value) {
    return `(${kebabCase(key)}: ${value})`;
  }

  constructor(props) {
    super(props);
    this.mql = null;
    this.mediaListener = this.mediaListener.bind(this);
  }

  state = {
    match: false,
  };

  componentDidMount() {
    const { match } = this.props;
    if (typeof window !== 'undefined') {
      const isAdvanced = some(match, Array.isArray);
      let media = Object.keys(match)
        .map(e => {
          const value = match[e];
          const val = this.constructor.prepareMediaValue(value);
          if (!val) return null;
          if (!isAdvanced && e === 'type') return val;
          if (Array.isArray(value)) {
            return `${value[0]} and ${this.constructor.formatQuery(e, val)}`;
          }
          if (isAdvanced) {
            return `all and ${this.constructor.formatQuery(e, val)}`;
          }
          return this.constructor.formatQuery(e, val);
        })
        .filter(e => !!e);
      if (isAdvanced) media = media.join(', ');
      else media = media.join(' and ');
      if (media) {
        this.mql = window.matchMedia(media);
        this.mql.addListener(this.mediaListener);
        this.mediaListener(this.mql);
      }
    }
  }

  componentWillUnmount() {
    if (typeof window !== 'undefined' && this.mql) {
      this.mql.removeListener(this.mediaListener);
    }
  }

  mediaListener(event) {
    const { matches: match } = event;
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
