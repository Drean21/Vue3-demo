let API_BASE_URL = ''
if (process.env.NODE_ENV === 'development') {
    API_BASE_URL = 'http://localhost:5000'
} else {
    API_BASE_URL = 'http://localhost:5000'
}

export { API_BASE_URL }
