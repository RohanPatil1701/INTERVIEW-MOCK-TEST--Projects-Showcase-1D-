import {Component} from 'react'

import Loader from 'react-loader-spinner'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Projects extends Component {
  state = {
    projectList: [],
    initialType: 'ALL',
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProjects()
  }

  getProjects = async () => {
    const {initialType} = this.state
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const url = `https://apis.ccbp.in/ps/projects?category=${initialType.toUpperCase()}`

    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)

    if (response.ok) {
      const data = await response.json()
      const updatedData = data.projects.map(eachProject => ({
        id: eachProject.id,
        name: eachProject.name,
        imageUrl: eachProject.image_url,
      }))
      this.setState({
        projectList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeOptions = event => {
    const {initialType} = this.state
    this.setState({initialType: event.target.value}, this.getProjects)
  }

  renderProjectsListSuccess = () => {
    const {projectList} = this.state
    return (
      <ul className="list-container">
        {projectList.map(eachProject => (
          <li key={eachProject.id} className="list-items">
            <img src={eachProject.imageUrl} alt={eachProject.name} />
            <p className="heading">{eachProject.name}</p>
          </li>
        ))}
      </ul>
    )
  }

  renderLoadingView = () => (
    <div className="loading-container" data-testid="loader">
      <Loader type="ThreeDots" color="#328af2" height={60} width={60} />
    </div>
  )

  onClickRetry = () => this.getProjects()

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure-image"
      />

      <h1>Oops! Something Went Wrong </h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        className="retry-button"
        type="button"
        onClick={this.onClickRetry}
      >
        Retry
      </button>
    </div>
  )

  renderProjectsBasedOnStatus = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderProjectsListSuccess()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()

      default:
        return null
    }
  }

  render() {
    const {optionsList} = this.props
    const {initialType} = this.state
    console.log(initialType)
    return (
      <div className="bg-container">
        <select className="select-element" onChange={this.onChangeOptions}>
          {optionsList.map(each => (
            <option key={each.id} value={each.id} className="options">
              {each.displayText}
            </option>
          ))}
        </select>
        {this.renderProjectsBasedOnStatus()}
      </div>
    )
  }
}

export default Projects
