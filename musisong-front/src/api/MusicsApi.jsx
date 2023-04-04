const MusicsApi = () => {
  const url = 'http://localhost:3000'

  return {
      getMusics () {
          return fetch(`${url}/musica`, {
              method: 'GET',
              headers: {
                  'Content-Type': 'application/json'
              }
          })
      },
      deleteMusic (musicId) {
        return fetch(`${url}/musica/${musicId}`, {
          method: 'DELETE',
          headers: {
              'Content-Type': 'application/json'
          }
       })
      },
      createMusic (title, artist) {
        return fetch(`${url}/musica`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              title: title,
              artist: artist
            }
          )
       })
      },
      updateMusic(musicId, title, artist) {
        return fetch(`${url}/musica/${musicId}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(
            {
              title: title,
              artist: artist
            }
          )
       })
      },
  }
}

export default MusicsApi