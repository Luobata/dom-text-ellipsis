export const userConfig = {
    //width: '50px',
    lineNum: 2,
    fontFamily: 'MicrosoftYahei',
    fontWeight: 'bold',
    fontSize: '14px',
    left: '...',
    tagName: 'p',
    resize: false,
};

export const config = (conf) => {
    Object.assign(userConfig, conf);
};
