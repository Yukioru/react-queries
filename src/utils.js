export function prepareMediaValue(value) {
  let val = value;
  if (val === null || val === undefined) {
    val = false;
  }
  if (Array.isArray(val)) {
    return prepareMediaValue(val[1]);
  }
  if (typeof value === 'number') {
    val = `${val}px`;
  }
  return val;
}

export function convertCamelToKebab(str) {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();
}

export function formatQuery(key, value) {
  return `(${convertCamelToKebab(key)}: ${value})`;
}

export function convertMatchToMedia(match) {
  let isAdvanced = false;
  Object.keys(match).forEach(key => {
    if (match[key] && Array.isArray(match[key])) {
      isAdvanced = true;
    }
  });
  let media = Object.keys(match)
    .map(e => {
      const value = match[e];
      const val = prepareMediaValue(value);
      if (!val) return null;
      if (!isAdvanced && e === 'type') return val;
      if (Array.isArray(value)) {
        return `${value[0]} and ${formatQuery(e, val)}`;
      }
      if (isAdvanced) {
        return `all and ${formatQuery(e, val)}`;
      }
      return formatQuery(e, val);
    })
    .filter(e => !!e);
  if (isAdvanced) media = media.join(', ');
  else media = media.join(' and ');
  return media;
}

export const mediaTypes = [
  'all',
  'print',
  'screen',
  'speech',
];

export const deprecatedMediaTypes = [
  'braille',
  'embossed',
  'handheld',
  'projection',
  'tty',
  'tv',
];

export const mediaQueries = [
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

export function validateType(type, propName, componentName) {
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

export function isQueries(props, propName, componentName) {
  const { type, ...queryProps } = props[propName];
  validateType(type, `${propName}.type`, componentName);
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
