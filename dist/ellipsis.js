(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.projectName = factory());
}(this, (function () { 'use strict';

var userConfig = {
    // width: '50px',
    lineNum: 2,
    fontFamily: 'MicrosoftYahei',
    fontWeight: 'bold',
    fontSize: '14px',
    left: '...',
    tagName: 'p',
    resize: false
};

var config = function config(conf) {
    Object.assign(userConfig, conf);
};

var isHTMLArr = function isHTMLArr(dom) {
  return Object.prototype.toString.call(dom) === '[object NodeList]';
};

var isHTML = function isHTML(dom) {
  return Object.prototype.toString.call(dom) === '[object HTMLDivElement]';
};

// const getLengthByCanvas = (ctx, font = {}) => {
//     const weight = font.fontWeight;
//     const size = font.fontSize;
//     const family = font.fontFamily;
//     ctx.font = `${weight} ${size} ${family}`;

//     return ctx.measureText(font.value).width;
// };
const getLengthByDom = (span, font = {}) => {
    span.innerText = font.value;
    // 因为offsetWidth存在四舍五入 降低精度
    return span.offsetWidth + 0.5;
};

var core$1 = (font = {}, span) => {
    let beginLine = 1;
    let index = 0;
    const line = [];

    for (let i = 0; i <= font.text.length; i++) {
        if (beginLine > font.lineNum) break;
        const left = beginLine === parseInt(font.lineNum, 10) ? font.left : '';
        const str = font.text.substr(index, i - index) + left;
        const len = getLengthByDom(
            span,
            Object.assign({ value: str }, font),
        );
        // console.log(str, len);
        if (len <= parseFloat(font.width, 10)) {
            line[beginLine - 1] = str;
        } else {
            i--;
            beginLine++;
            index = i;
        }
    }

    return line;
};

var getConfig = function getConfig(dom) {
    var conf = Object.assign({}, userConfig);
    conf.text = dom.getAttribute('text');
    conf.lineNum = dom.getAttribute('lineNum') || conf.lineNum;
    conf.fontFamily = dom.getAttribute('fontFamily') || conf.fontFamily;
    conf.fontSize = dom.getAttribute('fontSize') || conf.fontSize;
    conf.fontWeight = dom.getAttribute('fontWeight') || conf.fontWeight;
    conf.left = dom.getAttribute('left') || conf.left;
    conf.tagName = dom.getAttribute('tagName') || conf.tagName;
    conf.width = dom.getAttribute('width') || getComputedStyle(dom.parentElement).width;
    conf.resize = dom.getAttribute('resize') || conf.resize;

    return conf;
};

var init = function init(conf) {
    var span = document.createElement('span');
    span.style.opacity = 0;
    span.style['white-space'] = 'nowrap';
    span.style['font-weight'] = conf.fontWeight;
    span.style['font-family'] = conf.fontFamily;
    span.style['font-size'] = conf.fontSize;
    document.body.append(span);

    return span;
};

var destory = function destory(span) {
    span.remove();
};

var appendDom = function appendDom(dom, textArr, conf) {
    var div = document.createElement('div');
    for (var i = 0; i < textArr.length; i++) {
        var tag = document.createElement(conf.tagName);
        tag.innerText = textArr[i];
        div.appendChild(tag);
    }
    dom.innerHTML = div.innerHTML;
};

var lint = function lint(dom) {
    var text = dom.getAttribute('text');
    if (text === null) {
        throw new Error('The text missed!');
    }
};

var format = function format(dom) {
    lint(dom);
    var conf = getConfig(dom);
    var span = init(conf);
    var textArr = core$1(conf, span);
    appendDom(dom, textArr, conf);

    destory(span);

    return conf;
};

var ellipsisCore = function ellipsisCore(dom) {
    var conf = format(dom);

    if (conf.resize === true || conf.resize === 'true') {
        window.addEventListener('resize', function () {
            format(dom);
        });
    }
};

var ellipsis$1 = {
    config: config,
    init: function init(dom) {
        if (isHTMLArr(dom)) {
            for (var i = 0; i < dom.length; i++) {
                ellipsisCore(dom[i]);
            }
        } else if (isHTML(dom)) {
            ellipsisCore(dom);
        } else {
            throw new Error('The ' + dom + ' is not a HTMLElement');
        }
    },
    watch: function watch(dom) {
        var arr = [];
        if (isHTMLArr(dom)) {
            for (var i = 0; i < dom.length; i++) {
                arr.push(dom[i]);
            }
        } else if (isHTML(dom)) {
            arr.push(dom);
        } else {
            throw new Error('The ' + dom + ' is not a HTMLElement');
        }

        var _loop = function _loop(_i) {
            ellipsisCore(arr[_i]);
            var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
            if (MutationObserver) {
                var observer = new MutationObserver(function () {
                    ellipsisCore(arr[_i]);
                });
                var conf = { attributes: true };
                observer.observe(arr[_i], conf);
            } else {
                // IE 9 10
                arr[_i].addEventListener('DOMAttrModified', function () {
                    ellipsisCore(arr[_i]);
                });
            }
        };

        for (var _i = 0; _i < arr.length; _i++) {
            _loop(_i);
        }
    }
};

return ellipsis$1;

})));
//# sourceMappingURL=ellipsis.js.map
