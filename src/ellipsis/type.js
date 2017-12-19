export const isArr = (dom) => Object.prototype.toString.call(dom) === '[object Array]';

export const isHTML = (dom) => Object.prototype.toString.call(dom) === '[object HTMLDivElement]';

export const isHTMLArr = (dom) => {
    if (isArr(dom)) {
        let flag = true;
        for (let i = 0; i < dom.length; i++) {
            if (!isHTML(dom[i])) {
                flag = false;
                break;
            }
        }

        return flag;
    } else {
        return isHTML(dom);
    }

    return false;
};
