import core from 'text-ellipsis-core';
import { userConfig } from './config';

const getConfig = (dom) => {
    const conf = Object.assign({}, userConfig);
    conf.text = dom.getAttribute('text') || dom.innerText;

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

export default (dom) => {
    const conf = getConfig(dom);
    const span = init(conf);
    const textArr = core(conf, span);
    appendDom(dom, textArr, conf);

    destory(span);
};