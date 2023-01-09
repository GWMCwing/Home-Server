// eslint-disable-next-line @typescript-eslint/no-var-requires
export const hash: (
    passwordHash_Salt: { password: string; salt?: string },
    callback: (
        err: unknown,
        password: string,
        salt: string,
        hash: string
    ) => void
    // eslint-disable-next-line @typescript-eslint/no-var-requires
) => void = require('pbkdf2-password')({ digest: 'sha256' });
export const AvailableSchool = {
    HKUST: 'HKUST',
} as const;
export const SchoolList: string[] = Object.keys(AvailableSchool);
