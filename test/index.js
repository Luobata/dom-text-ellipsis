import ellipsis from '../src/index';

ellipsis.config({
    lineNum: 3,
});

const ell = document.getElementById('ell');

ellipsis.init(ell);
