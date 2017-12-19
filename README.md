# dom-text-ellipsis
a text-ellipsis plugin with common js use.

## Intro
The situation when you need text ellipsis more then one line and the browser doesn't support the css style `-webkit-line-clamp`.
This lib hasn't add the test of `-webkit-line-clamp`.If you are using mobile browsers, use `-webkit-line-clamp` instead.

## Install
```
npm install --save-dev dom-text-ellipsis
```

## Link
If you are using Vue, use the package [vue-text-ellipsis](https://github.com/Luobata/text-ellipsis-core) instead.

## Usage
```js
import ellipsis from 'dom-text-ellipsis';

ellipsis.config({
    lineNum: 2,
    fontFamily: 'microsoft yahei',
    fontWeight: 'bold',
    fontSize: '14px',
    left: '...',
    tagName: 'p',
    resize: false,
});

const ells = document.querySelectorAll('.ell');
ellipsis.init(ells);
```
```html
<div class="par">
    <div class="ell" lineNum="4" text="这是一句很长很长的话，到底有多长呢 自己感受一下 够长了吧 还没感受到？那再感受下"></div>
    </br>
    <div class="ell" lineNum="4" text="这是一句很长很长的话，到底有多长呢 自己感受一下 够长了吧 还没感受到？那再感受下" resize="true"></div>
</div>
```

## Config
You can add config when `ellipsis.config` to set global-config or use the attribute on vue elempent.

## Property

| Props      | Type            | Default                                 | Effect                                   |
| ---------- | --------------- | --------------------------------------- | ---------------------------------------- |
| width      | String          | The parentsElement's offsetWidth.       | The max width for one line.              |
| lineNum    | Number          | 2    (from global config)               | The max line.                            |
| fontFamily | String          | microsoft yahei    (from global config) | The fontFamily to calculate the width.   |
| fontSize   | String\| Number | 14px    (from global config)            | The fontSize to calculate the width.     |
| tagName    | String          | p    (from global config)               | The tag to show the text.                |
| left       | String          | '…'    (from global config)             | The String add on the end of the last line. |
| resize     | Boolean         | False    (from global config)           | Add the eventListener resize to window to watch the window change. |

## Methods

| Method | Args                               | Effect                                   |
| ------ | ---------------------------------- | ---------------------------------------- |
| config | Object: obj                        | Update the global config.                |
| init   | NodeList: doms \| HTMLElement: dom | Init the ellipsis dom by the config global and attribute both. |
| watch  | NodeList: doms \| HTMLElement: dom | init the ellipsis dom and watch the change of attribute. |

