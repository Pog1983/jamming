const clientId = '60fe75342d8449ed97701e4f3d03f28c';
let accessToken = '';
let expiresIn = '';




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
        window.location.assign(`https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=http://nobodygivesmetheraspberry.surge.sh`)
      };
    };
  },// getAccessToken()

  search(term) {
    if (accessToken) {
        return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        }).then(response => {
          return response.json();
        }).then(jsonResponse => {
          if (jsonResponse.tracks.items) {
            return jsonResponse.tracks.items.map(item => ({
                id: item.id,
                name: item.name,
                artist: item.artists[0].name,
                album: item.album.name,
                uri: item.uri,
              }));
          }
        });
    };
  }, // end search()

  postPlaylist(playlistName, uris) {
    if (!playlistName || !uris) {
      return;
    };

    if (!accessToken) {
      this.getAccessToken();
    };
      const header = {
        Authorization: `Bearer ${accessToken}`
      };
      let userId = '';

      return fetch(`https://api.spotify.com/v1/me`, {headers: header}).then(response => {
        return response.json();
      }).then(jsonResponse => {
        userId = jsonResponse.id

        return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": 'apllication/json'
          },
          method: 'POST',
          body: JSON.stringify({name: playlistName})
        }).then(response => {
          return response.json();
        }).then(jsonResponse => {
          let playlistId = jsonResponse.id;

          return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": 'apllication/json'
            },
            method: 'POST',
            body: JSON.stringify({uris: uris})
          })
        })
      });
}
};

export default Spotify;
