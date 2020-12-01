let apiUrl
const apiUrls = {
  production: 'https://aqueous-brushlands-71762.herokuapp.com',
  development: 'https://aqueous-brushlands-71762.herokuapp.com'
}

if (window.location.hostname === 'localhost') {
  apiUrl = apiUrls.development
} else {
  apiUrl = apiUrls.production
}

export default apiUrl
