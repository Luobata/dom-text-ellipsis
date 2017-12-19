import ellipsis from '../src/index';

ellipsis.config({
    lineNum: 3,
    fontSize: '16px',
});

const ell = document.getElementById('ell');
const ells = document.querySelectorAll('.ell');

ellipsis.watch(ells);
