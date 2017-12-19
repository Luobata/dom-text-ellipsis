import { config } from './config';
import { isHTMLArr } from './type';
import core from './core';

const ellipsis = {
    config,
    init (dom) {
        if (isHTMLArr(dom)) {
            core(dom);
        } else {
            new Error(`The ${dom} is not a HTMLElement`);
        }
    },
    watch (dom) {
        if (isHTMLArr(dom)) {

        } else {
            new Error(`The ${dom} is not a HTMLElement`);
        }
    },
};

export default ellipsis;
