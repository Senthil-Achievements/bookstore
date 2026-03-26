const getBaseUrl = () => {
    if (import.meta.env.VITE_BACKEND_URL) return import.meta.env.VITE_BACKEND_URL;
    return import.meta.env.DEV ? `http://${window.location.hostname}:5000` : "";
}

export default getBaseUrl;