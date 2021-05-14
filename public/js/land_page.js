class Landing extends React.Component {

  componentDidMount = () => {
    axios.get('/landing')
  }

  render = () => {
    return (
      <div>
      </div>
    )
  }
}

ReactDOM.render(
  <Landing></Landing>,
  document.querySelector('main')
)
