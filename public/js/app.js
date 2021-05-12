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

  submitSong = (event) => {
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
        <div>
          <h1>Welcome to Music World</h1>
  
               <form onSubmit={this.postSong}>

               <label htmlFor="title">TITLE:</label>
                <input type="text" id="title" onChange={this.addSong} /> 
                <br />

                <label htmlFor="artist">ARTIST:</label>
                <input type="text" id="artist" onChange={this.addSong} />
                <br />

                <label htmlFor="title">ALBUM:</label>
                <input type="text" id="album" onChange={this.addSong}/>
                <br />

                <label htmlFor="title">IMAGE:</label>
                <input type="text" id="image" onChange={this.addSong}/>

                <br />
                <label htmlFor="title">RATING:</label>
                <input type="text"  id="rating" onChange={this.addSong}/>


                <br />
                <input type="submit"  value="Submit"/>
            </form>

            <ul>
                <h2>List of Songs</h2>
                {this.state.songs.map((song) => {
                  return (
                    <li>
                      {song.title}
                      <br />
                      <img src={song.image} alt={song.title} />
                    </li>
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
