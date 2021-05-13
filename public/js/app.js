class Song extends React.Component {
  state = {
    title: '',
    artist: '',
    album: '',
    image: '',
    songs: []
  }

  addSong = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    })
  }

  postSong = (event) => {
    event.preventDefault()
    axios.post('/song', this.state).then((response) => {
      this.setState({
        songs: response.data,
        title: '',
        artist: '',
        album: '',
        image: ''
      })
    })
  }

  updateSong = (event) => {
    event.preventDefault()
    const id = event.target.id
    axios.put('/song/' + id, this.state).then((response) => {
      this.setState({
        songs: response.data,
        title: '',
        artist: '',
        album: '',
        image: ''
      })
    })
  }

  deleteSong = (event) => {
    axios.delete('/song/' + event.target.value).then(response => {
      this.setState({
        songs: response.data,
      })
    })
  }

  componentDidMount = () => {
    axios.get('/song').then(response => {
      this.setState({
        songs: response.data
      })
    })
  }

  render = () => {
    return (
      <div className="container">
        <h1>Add a song</h1>
        <form onSubmit={this.postSong}>
          <label htmlFor="title">Title</label>
          <input type="text" id="title" onChange={this.addSong} value={this.state.title}/>
          <br/>
          <label htmlFor="artist">Artist</label>
          <input type="text" id="artist" onChange={this.addSong} value={this.state.artist}/>
          <br/>
          <label htmlFor="album">Album</label>
          <input type="text" id="album" onChange={this.addSong} value={this.state.album}/>
          <br/>
          <label htmlFor="image">Image</label>
          <input type="text" id="image" onChange={this.addSong} value={this.state.image}/>
          <br/>
          <button type="submit">Add</button>
        </form>
        <h2>Your Songs</h2>
        <ul>
          {this.state.songs.map((song) => {
            return (
              <div className="playlist">
                <li key={song._id}>
                  <strong>"{song.title}"</strong>
                  <br />
                  {song.artist}
                  <br />
                  {song.album}
                  <br />
                  <img src={song.image} alt={song.album}/>
                  <details>
                    <summary>
                      Edit this song
                    </summary>
                    <form id={song._id} onSubmit={this.updateSong}>
                      <label htmlFor="title">Title</label>
                      <input
                          type="text"
                          id="title"
                          onChange={this.postSong}
                          defaultValue={song.title}
                           />
                      <br />
                      <label htmlFor="artist">Artist</label>
                      <input
                          type="text"
                          id="artist"
                          onChange={this.postSong}
                          defaultValue={song.artist}
                      />
                      <br />
                      <label htmlFor="album"> Album</label>
                      <input
                          type="text"
                          id="album"
                          onChange={this.postSong}
                          defaultValue={song.album}
                      />
                      <br />
                      <label htmlFor="image"> Image</label>
                      <input
                          type="text"
                          id="image"
                          onChange={this.postSong}
                          defaultValue={song.image}
                      />
                      <br />
                      <button type="submit" onClick={this.updateSong} value={song._id}>Update Song</button>
                    </form>
                  </details>
                  <button value={song._id} onClick={this.deleteSong}>Delete</button>
                </li>
              </div>
            )
          })}
        </ul>
      </div>
    )
  }
}

ReactDOM.render(
  <Song></Song>,
  document.querySelector('main')
)
