class Landing extends React.Component {

  componentDidMount = () => {
    axios.get('/landing')
  }

  render = () => {
    return (
      <div>
        <h1>Hi</h1>
      </div>
    )
  }
}

ReactDOM.render(
  <Landing></Landing>,
  document.querySelector('main')
)
