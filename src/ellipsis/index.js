import { config } from './config';
import { isHTMLArr, isHtml } from './type';
import core from './core';

const ellipsis = {
    config,
    init (dom) {
        if (isHTMLArr(dom)) {
            for (let i = 0; i < dom.length; i++) {
                core(dom[i]);
            }
        } else if (isHTML(dom)) {
            core(dom);
        } else {
            throw `The ${dom} is not a HTMLElement`;
        }
    },
    watch (dom) {
    },
};

export default ellipsis;
