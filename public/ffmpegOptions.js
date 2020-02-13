const getBitrateOutputOption = value => {
    if (value) {
        return `-b:a ${value}`;
    }

    return '';
};

const getCodecOutputOption = value => {
    switch (value) {
        case 'passthru':
            return '';
        case 'none':
            return '-na';
        default:
            return `-c:a ${value}`;
    }
};

module.exports = {
    getBitrateOutputOption,
    getCodecOutputOption,
};
