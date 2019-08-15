# react-queries
Реакт компонент для управления медиа запросами

Язык документации: [Русский](https://github.com/Yukioru/react-queries/blob/master/README.md), [English](https://github.com/Yukioru/react-queries/blob/master/README_EN.md)

![dependencies](https://img.shields.io/badge/dependencies-0-brightgreen?style=flat-square)
[![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-queries/latest?style=flat-square)](https://bundlephobia.com/result?p=react-queries@latest)
![license](https://img.shields.io/npm/l/react-queries?style=flat-square)
[![npm](https://img.shields.io/npm/v/react-queries?style=flat-square)](https://www.npmjs.com/package/react-queries)
[![Codacy Badge](https://img.shields.io/codacy/grade/39ab7d3bec48456cab200e3f2507441c?style=flat-square)](https://www.codacy.com/app/akigami/react-queries?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Yukioru/react-queries&amp;utm_campaign=Badge_Grade)

## Как установить
Если используете npm: `npm install react-queries`

Если используете yarn: `yarn add react-queries`

## Как использовать

### Простой
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
    Какой-то контент
  </Query>
);
```
Отобразится как @media:
```css
@media screen and (min-width: 600px) and (max-width: 1200px)
```

### Расширенный
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
    Какой-то контент
  </Query>
);
```
Отобразится как @media:
```css
@media screen and (min-width: 600px), print and (max-width: 1200px)
```

## Пропсы
| Поле  | Тип             | Обязательно |
|-------|-----------------|-------------|
| match | Shape(Matches)¹ | Да          |

### ¹Matches
| Поле                  | Тип              | Описание                                    |
|-----------------------|------------------|---------------------------------------------|
| type                  | строка           | Один из поддерживаемых типов² (опционально) |
| [запрос из запросов]³ | строка \| число \| [type²: строка, query³: строка \| число]    | Один из поддерживаемых запросов³. В расширенном использовании - поле является обязательным вместе с типом и запросом, но нельзя использовать поле типа отдельно |


## Поддерживаемые match поля
| Типы²   | Запросы³             |
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

## Неподдерживаемые match поля
| Устаревшие типы  |
|------------------|
| braille          |
| embossed         |
| handheld         |
| projection       |
| tty              |
| tv               |
