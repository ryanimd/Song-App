class Song extends React.Component {
  state = {
    title: '',
    artist: '',
    album: '',
    image: '',
    songs: []
  }






  addSong = (event) => {
    this.setState({ [event.target.id]: event.target.value})
  }

  //SUBMIT
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

    //UPDATE
    updateSong = (event) => {
      event.preventDefault()
      const id = event.target.id
      axios
        .put('/song/' + id, this.state)
        .then((response) => {
          this.setState({
            songs: response.data,
            title: '',
            artist: '',
            album: '',
            image: ''
          })
        })
      }

    //DELETE
    deleteSong = (event) => {
      axios
        .delete('/song/' + event.target.value)
        .then(response => this.setState({songs: response.data}))
    }


    updateStateOnSubmit = (event) => {
      this.setState({
        title: event.target.nextSibling.firstChild.nextSibling.nextSibling.value,
        artist: event.target.nextSibling.firstChild.nextSibling.nextSibling.value,
        album: event.target.nextSibling.firstChild.nextSibling.nextSibling.value,
        image:
          event.target.nextSibling.firstChild.nextSibling.nextSibling.nextSibling
            .nextSibling.nextSibling.value,
      })
    }

   //DID MOUNT
   componentDidMount = () => {
    axios
      .get('/song')
      .then(response => {
        this.setState({
          songs: response.data
      })
    })
  }

   

  render = () => {
    return (
      <div className="container">
        <nav>
              <div class='navbar'>
                <h1>Music World!</h1>
                <ul>
                  <li>
                    <button>Sign In</button>
                  </li>
                  <li>
                    <button>Sign Up</button>
                  </li>
                </ul>
              </div>
        </nav>


        <h2>Add a song</h2>
        <form onSubmit={this.postSong}>
          <label htmlFor="title">Title</label>
          <br />
          <input type="text"
          id="title"
          onChange={this.addSong}
          value={this.state.title}/>
          <br/>

          <label htmlFor="artist">Artist</label>
          <input type="text"
          id="artist"
          onChange={this.addSong}
          value={this.state.artist}/>
          <br/>

          <label htmlFor="album">Album</label>
          <input type="text"
          id="album"
          onChange={this.addSong}
          value={this.state.album}/>
          <br/>
          
          <br/>
          <label htmlFor="image">Image</label>
          <input type="text"
          id="image"
          onChange={this.addSong}
          value={this.state.image}/>
          <br/>
        
          <input type="submit" value="Create Song"/>
        </form>


        <h2>Your Song</h2>
        <ul>
          {this.state.songs.map((song) => {
            return (
              
                <li key={song._id}>

                  <strong>{song.title}</strong>
                  <br />
                  <strong>{song.artist}</strong>
                  <br />
                  <strong>{song.album}</strong>
                  <br />
                  <img src={song.image} alt={song.album}/>

                  <details>
                    <summary onClick={this.updateStateOnSubmit}>
                      Edit this song
                    </summary>
                    <form id={song._id} onSubmit={this.updateSong}>
                      <label htmlFor="title">Title</label>
                      <br />
                      <input 
                          type="text" 
                          id="title" 
                          onChange={this.addSong}
                          defaultValue={song.title}
                           /> 

                      <label htmlFor="artist">Artist</label>
                      <br />
                      <input 
                          type="text"
                          id="artist"
                          onChange={this.addSong}
                          defaultValue={song.artist}
                      />

                      <label htmlFor="album"> Album</label>
                      <br />
                      <input 
                          type="text" 
                          id="album"
                          onChange={this.addSong}
                          defaultValue={song.album}
                      />

                      <label htmlFor="image"> Image</label>
                      <br /> 
                      <input 
                          type="text" 
                          id="image"
                          onChange={this.addSong}
                          defaultValue={song.image}
                      />
                      <br /> 
                      <input type="submit" value="Update Song" />
                    </form>
                  </details>
                  <button value={song._id} onClick={this.deleteSong}>Delete</button>
                </li>
            
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
