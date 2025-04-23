import unorm from 'unorm';

const charMap: Record<string, string[]> = {
    a: ['à', 'á', 'ạ', 'ả', 'ã', 'â', 'ầ', 'ấ', 'ậ', 'ẩ', 'ẫ', 'ă', 'ằ', 'ắ', 'ặ', 'ẳ', 'ẵ'],
    e: ['è', 'é', 'ẹ', 'ẻ', 'ẽ', 'ê', 'ề', 'ế', 'ệ', 'ể', 'ễ'],
    i: ['ì', 'í', 'ị', 'ỉ', 'ĩ'],
    o: ['ò', 'ó', 'ọ', 'ỏ', 'õ', 'ô', 'ồ', 'ố', 'ộ', 'ổ', 'ỗ', 'ơ', 'ờ', 'ớ', 'ợ', 'ở', 'ỡ'],
    u: ['ù', 'ú', 'ụ', 'ủ', 'ũ', 'ư', 'ừ', 'ứ', 'ự', 'ử', 'ữ'],
    y: ['ỳ', 'ý', 'ỵ', 'ỷ', 'ỹ'],
    d: ['đ'],
};

const upperCharMap: Record<string, string[]> = Object.entries(charMap).reduce(
    (map, [key, value]) => {
        map[key.toUpperCase()] = value.map(char => char.toUpperCase());
        return map;
    },
    {} as Record<string, string[]>,
);

/**
 * Convert a string to a regex pattern that matches the string and its accented variations.
 * @param str - The string to convert.
 * @returns The regex pattern as a string.
 */
export function regexSearchMapper(str: string) {
    str = unorm.nfkc(str);
    const combinedMap = { ...charMap, ...upperCharMap };

    for (const [baseChar, variations] of Object.entries(combinedMap)) {
        const pattern = `[${baseChar}${variations.join('')}]`;
        const replacement = `(${[baseChar, ...variations].join('|')})`;
        str = str.replace(new RegExp(pattern, 'g'), replacement);
    }

    return str;
}

/**
 * Remove accents from a string.
 * @param str - The string to remove accents from.
 * @returns The string without accents.
 */
export function removeAccent(str: string) {
    return str.normalize('NFD').replace(/\p{Diacritic}/gu, '');
}
