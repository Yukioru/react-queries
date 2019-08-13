# react-queries
React component for manipulate media queries

![react-queries](https://img.shields.io/david/yukioru/react-queries?style=flat-square)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-queries?style=flat-square)
![license](https://img.shields.io/npm/l/react-queries?style=flat-square)
![npm](https://img.shields.io/npm/v/react-queries?style=flat-square)
![Codacy grade](https://img.shields.io/codacy/grade/39ab7d3bec48456cab200e3f2507441c?style=flat-square)

## How to install
If using npm: `npm install react-queries`

If using yarn: `yarn add react-queries`

## How to use

### Easy
```javascript
import React from 'react';
import Query from 'react-queries';

const Example = () => (
  <Query
    match={{
      type: 'screen',
      minWidth: 600,
      maxWidth: 1200,
    }}
  >
    Some content
  </Query>
);
```
Displayed as @media:
```css
@media screen and (min-width: 600px) and (max-width: 1200px)
```

### Advanced
```javascript
import React from 'react';
import Query from 'react-queries';

const Example = () => (
  <Query
    match={{
      minWidth: ['screen', 600],
      maxWidth: ['print', 1200],
    }}
  >
    Some content
  </Query>
);
```
Displayed as @media:
```css
@media screen and (min-width: 600px), print and (max-width: 1200px)
```

## Supported match props
| Types   | Queries              |
|---------|----------------------|
| all     | aspectRatio          |
| print   | minAspectRatio       |
| screen  | maxAspectRatio       |
| speech  | minColor             |
| braille | maxColor             |
|         | colorIndex           |
|         | minColorIndex        |
|         | maxColorIndex        |
|         | deviceAspectRatio    |
|         | minDeviceAspectRatio |
|         | maxDeviceAspectRatio |
|         | deviceHeight         |
|         | minDeviceHeight      |
|         | maxDeviceHeight      |
|         | deviceWidth          |
|         | minDeviceWidth       |
|         | maxDeviceWidth       |
|         | height               |
|         | minHeight            |
|         | maxHeight            |
|         | monochrome           |
|         | minMonochrome        |
|         | maxMonochrome        |
|         | orientation          |
|         | resolution           |
|         | minResolution        |
|         | maxResolution        |
|         | scan                 |
|         | width                |
|         | minWidth             |
|         | maxWidth             |

## Unsupported match props
| Deprecated Types |
|------------------|
| braille          |
| embossed         |
| handheld         |
| projection       |
| tty              |
| tv               |
