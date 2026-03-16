import getBaseUrl from "./baseURL"

function getImgUrl(name) {
    if (!name) return "";
    if (name.startsWith('/uploads')) return `${getBaseUrl()}${name}`;
    return new URL(`../assets/books/${name}`, import.meta.url).href;
}

export { getImgUrl }