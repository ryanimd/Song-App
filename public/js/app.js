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
      <h1>Hello</h1>
    )
  }
}

ReactDOM.render(
  <Song></Song>,
  document.querySelector('main')
)
