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
    .map((e) => {
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
