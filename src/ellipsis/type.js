export const isArr = dom => Object.prototype.toString.call(dom) === '[object Array]';

export const isHTMLArr = dom => Object.prototype.toString.call(dom) === '[object NodeList]';

export const isHTML = dom => Object.prototype.toString.call(dom) === '[object HTMLDivElement]';
