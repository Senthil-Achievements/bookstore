import getBaseUrl from "./baseURL"

function getImgUrl(name) {
    if (!name) return new URL(`../assets/books/book-2.png`, import.meta.url).href;
    if (name.startsWith('/uploads')) return `${getBaseUrl()}${name}`;
    return new URL(`../assets/books/${name}`, import.meta.url).href;
}

export { getImgUrl }