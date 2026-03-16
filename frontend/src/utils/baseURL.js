const getBaseUrl = () => {
    if (import.meta.env.VITE_BACKEND_URL) return import.meta.env.VITE_BACKEND_URL;
    return import.meta.env.DEV ? "http://localhost:5000" : "";
}

export default getBaseUrl;