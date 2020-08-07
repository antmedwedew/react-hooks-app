import React, { useContext, useEffect, Fragment } from 'react'
import { GithubContext } from '../context/github/githubContext'
import { Loader } from '../components/Loader/Loader'
import { Link } from 'react-router-dom'
import { Repos } from '../components/Repos/Repos'

export const Profile = ({match})=> {

  const {getUser, getRepos, loading, user, repos} = useContext(GithubContext)
  const urlName = match.params.name

  useEffect(()=> {
    getUser(urlName)
    getRepos(urlName)
    // eslint-disable-next-line
  }, [])

  if (loading) {
    return <Loader />
  }

  const {
    name, company, avatar_url,
    location, bio, blog, login,
    html_url, followers, public_repos,
    public_gists, following
  } = user

  return (
    <Fragment>
      <Link to="/" className="btn btn-link">На главную</Link>

      <div className="card mb-4">
        <div className="card-body">
          <div className="row">
            <div className="col-sm-3 text-center">
              <img 
                src={avatar_url} 
                alt={name}
                style={{width: "250px"}} 
              />
              <h2>{name}</h2>
              {location && <p>Местоположение: {location}</p>}
            </div>
            <div className="col">
              {bio && <Fragment>
                <h3>Описание</h3>
                <p>{bio}</p>
              </Fragment>}
              
              <a href={html_url}
                 rel="noopener noreferrer" 
                 target="_blank" 
                 className="btn btn-primary"
              >Открыть профиль</a>

              <ul className="mt-3">
                {login && <li>
                  <strong>Имя:</strong> {login}
                </li>}
                {company && <li>
                  <strong>Компания:</strong> {company}
                </li>}
                {blog && <li>
                  <strong>Веб-сайт:</strong> {blog}
                </li>}
              </ul>

              <div className="badge badge-primary mr-2">Подписчики: {followers}</div>
              <div className="badge badge-success mr-2">Подписан: {following}</div>
              <div className="badge badge-info mr-2">Репозитории: {public_repos}</div>
              <div className="badge badge-dark mr-2">Гиты: {public_gists}</div>
            </div>
          </div>
        </div>
      </div>

      <h4 className="text-center mb-3">Репозитории</h4>
      <Repos repos={repos} />
    </Fragment>
  )
}