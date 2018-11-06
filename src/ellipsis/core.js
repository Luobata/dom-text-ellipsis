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
        throw new Error('The text missed!');
    }
};

const cssHack = (span, dom, conf) => {
    span.innerText = 'M';
    conf.lineHeight = span.offsetHeight;
    const wrap = document.createElement('div');
    const text = document.createElement('div');
    const before = document.createElement('div');
    const after = document.createElement('div');
    const margin = 5;

    wrap.style.height = `${conf.lineHeight * conf.lineNum}px`;
    wrap.style.lineHeight = `${conf.lineHeight}px`;
    wrap.style.overflow = 'hidden';

    before.style.float = 'left';
    before.style.width = `${margin}px`;
    before.style.height = `${conf.lineHeight * conf.lineNum}px`;

    after.style.float = 'right';
    after.style.height = `${conf.lineHeight}px`;
    after.style.lineHeight = `${conf.lineHeight}px`;
    after.style.width = '3em';
    after.style.marginLeft = '-3em';
    after.style.position = 'relative';
    after.style.left = '100%';
    after.style.top = `-${conf.lineHeight}px`;
    after.style.paddingRight = `${margin}px`;
    // after.style.fontWeight = 'bold';
    after.style.background = 'white';
    after.innerText = conf.left;

    text.style.float = 'right';
    text.style.marginLeft = `-${margin}px`;
    text.style.width = '100%';
    text.style.wordBreak = 'break-all';
    text.innerText = conf.text;

    wrap.appendChild(before);
    wrap.appendChild(text);
    wrap.appendChild(after);
    dom.appendChild(wrap);

    return wrap;
};

const format = (dom) => {
    lint(dom);
    const conf = getConfig(dom);
    const span = init(conf);
    cssHack(span, dom, conf);
    const textArr = core(conf, span);
    appendDom(dom, textArr, conf);

    destory(span);

    return conf;
};

const ellipsisCore = (dom) => {
    const conf = format(dom);

    if (conf.resize === true || conf.resize === 'true') {
        window.addEventListener('resize', () => {
            format(dom);
        });
    }
};
export default ellipsisCore;
