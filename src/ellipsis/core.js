import core from 'text-ellipsis-core';
import { userConfig } from './config';

const getConfig = (dom) => {
    const conf = Object.assign({}, userConfig);
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

const init = (conf) => {
    const span = document.createElement('span');
    span.style.opacity = 0;
    span.style['white-space'] = 'nowrap';
    span.style['font-weight'] = conf.fontWeight;
    span.style['font-family'] = conf.fontFamily;
    span.style['font-size'] = conf.fontSize;
    document.body.append(span);

    return span;
};

const destory = (span) => {
    span.remove();
};

const appendDom = (dom, textArr, conf) => {
    const div = document.createElement('div');
    for (let i = 0; i < textArr.length; i++) {
        const tag = document.createElement(conf.tagName);
        tag.innerText = textArr[i];
        div.appendChild(tag);
    }
    dom.innerHTML = div.innerHTML;
};

const lint = (dom) => {
    const text = dom.getAttribute('text');
    if (text === null) {
        throw `The text missed!`;
    }
};

const format = (dom) => {
    lint(dom);
    const conf = getConfig(dom);
    const span = init(conf);
    const textArr = core(conf, span);
    appendDom(dom, textArr, conf);

    destory(span);

    return conf;
};

const ellipsisCore = (dom) => {
    const conf = format(dom);

    if (conf.resize === true || conf.resize === 'true') {
        window.addEventListener('resize', (e) => {
            format(dom);
        });
    }
};
export default ellipsisCore;
