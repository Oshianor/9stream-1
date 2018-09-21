import Base64 from './base64';

export function Post(dir, data) {
  return new Promise((resolve, reject) => {
    fetch('http://9sm-api.univtec.com/index.php' + dir, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json",
        'Authorization': "Basic " + Base64.btoa('9sm_portal:Univtec1@')
      },
      body: JSON.stringify(data)
    })
      .then((response) => response.json())
      .then((res) => {
        resolve(res);
      }).catch((error) => {
        reject(error)
      })
  })
}