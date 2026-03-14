import getBaseUrl from "./baseURL"

function getImgUrl(name) {
    if (!name) return "";
    if (name.startsWith('/uploads')) return `${getBaseUrl()}${name}`;
    return `/books/${name}`;
}

export { getImgUrl }