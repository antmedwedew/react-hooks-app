import React, { useReducer } from 'react'
import { GithubContext } from './githubContext'
import axios from 'axios'
import { GithubReducer } from './githubReducer'
import { SEARCH_USERS, GET_REPOS, GET_USER, SET_LOADING, CLEAR_USERS } from "../types"

export const GithubState = ({children}) => {

  const CLIENT_ID = process.env.REACT_APP_CLIENT_ID
  const CLIENT_SECRET = process.env.REACT_APP_CLIENT_SECRET
  
  const initialState = {
    user: {},
    users: [],
    loading: false,
    repos: []
  }
  const [state, dispatch] = useReducer(GithubReducer, initialState)

  const search = async value => {
    setLoading()
    
    const response = await axios.get(
      `https://api.github.com/search/users?q=${value}&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    ) 

    dispatch({
      type: SEARCH_USERS,
      payload: response.data.items
    })
  }

  const getUser = async name => {
    setLoading()
    
    const response = await axios.get(
      `https://api.github.com/users/${name}?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    )

    dispatch({
      type: GET_USER,
      payload: response.data
    })
  }

  const getRepos = async name => {
    setLoading()
    
    const response = await axios.get(
      `https://api.github.com/users/${name}/repos?per_page=5&client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}`
    )

    dispatch({
      type: GET_REPOS,
      payload: response.data
    })
  }

  const clearUsers = () => dispatch({
    type: CLEAR_USERS
  })

  const setLoading = () =>  dispatch({
    type: SET_LOADING
  })

  const {user, users, repos, loading} = state

  return (
    <GithubContext.Provider value={{
      search, getUser, getRepos, clearUsers, setLoading,
      user, users, repos, loading
    }}>
      {children}
    </GithubContext.Provider>
  )
}