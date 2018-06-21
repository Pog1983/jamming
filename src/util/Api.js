const clientId = '60fe75342d8449ed97701e4f3d03f28c';
let accessToken = '';
let expiresIn = ''


const Spotify = {
  getAccessToken() {
    if (!accessToken) {
      if (window.location.href.match(/access_token=([^&]*)/) && window.location.href.match(/expires_in=([^&]*)/)) {
        const tokenArray = window.location.href.match(/access_token=([^&]*)/);
        accessToken = tokenArray[1];
        const expires = window.location.href.match(/expires_in=([^&]*)/);
        expiresIn = expires[1];
        window.setTimeout(() => accessToken = '', expiresIn * 1000);
        window.history.pushState('Access Token', null, '/');
      } else {
        window.location.assign(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=http://localhost:3000/`)
      };
    };
  },// getAccessToken()

  search(term) {
    if (accessToken) {
        fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }).then(response => {
          return response.json();
        }).then(jsonResponse => {
          console.log(jsonResponse);
          if (jsonResponse.tracks.items) {
            return jsonResponse.tracks.items.map(item => ({
                id: item.id,
                name: item.name,
                artist: item.artists[0].name,
                album: item.album.name,
                uri: item.uri,
                addedToPlaylist: false
              }));
          } else {
            return [];
          };
        });
    };
  }
};

export default Spotify;
