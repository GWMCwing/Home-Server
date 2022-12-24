const before2021 = {
    SSC_H: 'SSC-H',
    'SSC-SA': 'SSC-SA',
    'SSC-S&T': 'SSC-S&T',
    H: 'H',
    SA: 'SA',
    'S&T': 'S&T',
    QR: 'QR',
    Arts: 'Arts',
    'E-Comm': 'E-Comm',
    'C-Comm': 'C-Comm',
    HLTH: 'HLTH',
} as const;

const after2022 = {
    CTDL: 'CTDL',
    HMW: 'HMW',
    'E-Comm': 'E-Comm',
    'C-Comm': 'C-Comm',
    A: 'A',
    H: 'H',
    S: 'S',
    T: 'T',
    SA: 'SA',
};

export const HKUST_CC = {
    before2021,
    after2022,
} as const;

export type HKUST_CC =
    | keyof typeof HKUST_CC.before2021
    | keyof typeof HKUST_CC.after2022;

export type CCType = HKUST_CC;
