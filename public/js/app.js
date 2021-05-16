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
        image: '',
      })
    })
  }

  updateSong = (event) => {
    event.preventDefault()
    const id = event.target.id
    // console.log('/song/' + id, this.state);
    axios.put('/song/' + id, this.state).then((response) => {
      this.setState({
        songs: response.data,
        title: '',
        artist: '',
        album: '',
        image: '',
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
      <div>
      <div className='navbar'>
        <h1 className="text-white">Music World</h1>
        <ul className="nav nav-tabs justify-content-end">
          <li className="nav-item">
            <a className="nav-link active" href="#">Sign Up</a>
          </li>
          <li className="nav-item">
            <a className="nav-link active" href="#">Log In</a>
          </li>
        </ul>
      </div>
        <h2 className="text-white">Add a song to your playlist</h2>
        <form onSubmit={this.postSong}>
          <label htmlFor="title" className="form-label" className="text-white">Title</label>
          <input className="form-control" type="text" id="title" onChange={this.addSong} value={this.state.title}/>
          <br/>
          <label className="form-label" className="text-white" htmlFor="artist">Artist</label>
          <input className="form-control" type="text" id="artist" onChange={this.addSong} value={this.state.artist}/>
          <br/>
          <label className="form-label" className="text-white" htmlFor="album">Album</label>
          <input className="form-control" type="text" id="album" onChange={this.addSong} value={this.state.album}/>
          <br/>
          <label className="form-label" className="text-white" htmlFor="image">Image</label>
          <input className="form-control" type="text" id="image" onChange={this.addSong} value={this.state.image}/>
          <br/>
          <button className="btn btn-dark" type="submit">Add</button>
        </form>

        <h2 className="text-white">Your Playlist</h2>

        <ul>
          {this.state.songs.map((song) => {
            return (
              <div className="playlist">
                <li key={song._id}>
                  <em className="text-white">{song.title}</em>
                  <br />
                  <p className="text-white">{song.artist}</p>
                  <br />
                  <strong className="text-white">{song.album}</strong>
                  <br />
                  <img src={song.image} alt={song.album}/>
                  {/* <audio controls muted>
                  </audio> */}
                  <details>
                    <summary className="text-white">
                      Edit this song
                    </summary>
                    <form id={song._id} onSubmit={this.updateSong}>
                      <label className="form-label" className="text-white" htmlFor="title">Title</label>
                      <input className="form-control"
                          type="text"
                          id="title"
                          onChange={this.addSong}
                          defaultValue={song.title}
                           />
                      <br />
                      <label className="form-label" className="text-white" htmlFor="artist">Artist</label>
                      <input className="form-control"
                          type="text"
                          id="artist"
                          onChange={this.addSong}
                          defaultValue={song.artist}
                      />
                      <br />
                      <label className="form-label" className="text-white" htmlFor="album"> Album</label>
                      <input className="form-control"
                          type="text"
                          id="album"
                          onChange={this.addSong}
                          defaultValue={song.album}
                      />
                      <br />
                      <label className="form-label" className="text-white" htmlFor="image"> Image</label>
                      <input className="form-control"
                          type="text"
                          id="image"
                          onChange={this.addSong}
                          defaultValue={song.image}
                      />
                      <br />
                      <button type="submit" value={song._id}>Update Song</button>
                    </form>
                  </details>
                  <button className="btn btn-danger" value={song._id} onClick={this.deleteSong}>Delete</button>
                </li>
              </div>
            )
          })}
        </ul>
        <div className="footer">


        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <Song></Song>,
  document.querySelector('main')
)
