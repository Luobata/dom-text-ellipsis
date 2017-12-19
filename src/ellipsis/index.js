import { config } from './config';
import { isHTMLArr, isHTML } from './type';
import core from './core';

const ellipsis = {
    config,
    init(dom) {
        if (isHTMLArr(dom)) {
            for (let i = 0; i < dom.length; i++) {
                core(dom[i]);
            }
        } else if (isHTML(dom)) {
            core(dom);
        } else {
            throw new Error(`The ${dom} is not a HTMLElement`);
        }
    },
    watch(dom) {
        const arr = [];
        if (isHTMLArr(dom)) {
            for (let i = 0; i < dom.length; i++) {
                arr.push(dom[i]);
            }
        } else if (isHTML(dom)) {
            arr.push(dom);
        } else {
            throw new Error(`The ${dom} is not a HTMLElement`);
        }
        for (let i = 0; i < arr.length; i++) {
            core(arr[i]);
            const MutationObserver = window.MutationObserver
                || window.WebKitMutationObserver
                || window.MozMutationObserver;
            if (MutationObserver) {
                const observer = new MutationObserver((() => {
                    core(arr[i]);
                }));
                const conf = { attributes: true };
                observer.observe(arr[i], conf);
            } else {
                // IE 9 10
                arr[i].addEventListener('DOMAttrModified', () => {
                    core(arr[i]);
                });
            }
        }
    },
};

export default ellipsis;
