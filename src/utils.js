/* eslint-disable import/prefer-default-export */

export const compareVersions = (a, b) => {
    const pa = a.split('.');
    const pb = b.split('.');
    for (let i = 0; i < 3; i += 1) {
        const na = Number(pa[i]);
        const nb = Number(pb[i]);
        if (na > nb) return 1;
        if (nb > na) return -1;
        if (!Number.isNaN(na) && Number.isNaN(nb)) return 1;
        if (Number.isNaN(na) && !Number.isNaN(nb)) return -1;
    }

    return 0;
};
