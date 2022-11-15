export const getUrls = () => {
  return fetch('http://localhost:3001/api/v1/urls')
      .then(response => response.json())
}

export const postNewUrl = (newUrl) => {
  const requestData = {
    method: 'POST',
    headers: {"Content-Type": 'application/json'}, 
    body: JSON.stringify( { long_url: newUrl.urlToShorten, title: newUrl.title})
  }
  return fetch('http://localhost:3001/api/v1/urls', requestData)
    .then((response) => {
      if(!response.ok) {
        throw new Error("Not a 200 status")
      }
      return response.json()
    })
    .catch((error) => {
      alert('Oops, something went wrong, please try again!')
    })
}