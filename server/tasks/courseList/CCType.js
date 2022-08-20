const CCType = {
    before2021: {
        'SSC-H': 0,
        'SSC-SA': 1,
        'SSC-S&T': 2,
        H: 3,
        SA: 4,
        'S&T': 5,
        QR: 6,
        Arts: 7,
        'E-Comm': 8,
        'C-Comm': 9,
        HLTH: 10,
    },
    after2022: {
        CTDL: 0,
        HMW: 1,
        'E-Comm': 2,
        'C-Comm': 3,
        A: 4,
        H: 5,
        S: 6,
        T: 7,
        SA: 8,
    },
};
class CCProperty {
    constructor(dom) {}
    #isBeforeYear2021(dom) {}
    #isAfterYear2022(dom) {}
    #addCCType(dom) {}
}
module.exports = { CCProperty, CCType };
