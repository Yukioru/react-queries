# react-queries
React component for manipulate media queries

Documentation Language: [Russian](https://github.com/Yukioru/react-queries/blob/master/README.md), [English](https://github.com/Yukioru/react-queries/blob/master/README_EN.md)

![dependencies](https://img.shields.io/badge/dependencies-0-brightgreen?style=flat-square)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-queries/latest?style=flat-square)](https://bundlephobia.com/result?p=react-queries@latest)
![license](https://img.shields.io/npm/l/react-queries?style=flat-square)
[![npm](https://img.shields.io/npm/v/react-queries?style=flat-square)](https://www.npmjs.com/package/react-queries)
[![Codacy Badge](https://img.shields.io/codacy/grade/39ab7d3bec48456cab200e3f2507441c?style=flat-square)](https://www.codacy.com/app/akigami/react-queries?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Yukioru/react-queries&amp;utm_campaign=Badge_Grade)

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

## Props
| Prop  | Type            | Required |
|-------|-----------------|----------|
| match | Shape(Matches)¹ | True     |

### ¹Matches
| Field               | Type             | Description                        |
|---------------------|------------------|------------------------------------|
| type                | string           | One of supported types² (optional) |
| [query of queries]³ | string \| number \| [type²: string, query³: string \| number] | One if supported queries³. In advanced usage - field is required type and query, but don't use type as field          |


## Supported match props
| Types²  | Queries³             |
|---------|----------------------|
| all     | aspectRatio          |
| print   | minAspectRatio       |
| screen  | maxAspectRatio       |
| speech  | minColor             |
|         | maxColor             |
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
