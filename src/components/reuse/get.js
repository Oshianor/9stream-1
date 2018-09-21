import Base64 from './base64';

export function Get(dir) {
  return new Promise((resolve, reject) => {
    fetch('http://9sm-api.univtec.com/index.php' + dir, {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        'Authorization': "Basic " + Base64.btoa('9sm_portal:Univtec1@'),
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        resolve(responseJson);
      }).catch((error) => {
        reject(error)
      })
  })

}
