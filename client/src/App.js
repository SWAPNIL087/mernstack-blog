import React from 'react'
import "./App.css"
import {Route,Switch} from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import About from './components/About'
import ErrorPage from './components/ErrorPage'
import Footer from './components/Footer'
import AdminBlog from './components/AdminBlog'
import CreateBlog from './components/CreateBlog'
import editBlog from './components/EditBlog'
import Blogs from './components/Blogs'
import Logout from './components/Logout'
import 'bootstrap/dist/css/bootstrap.css'

const App = ()=>{
  return (
    <div className='row p-0 m-0'>
    
      <Navbar/>
      <Switch>
      <Route exact path='/' component={Home}/>

      <Route exact path='/login' component={Login}/>

      <Route exact path='/register' component={Register}/>

      <Route exact path='/about' component={About}/>

      <Route exact path='/AdminBlog' component={AdminBlog}/>

      <Route exact path='/createBlog' component={CreateBlog}/>

      <Route exact path='/editBlogs' component={editBlog}/>

      <Route exact path='/Blogs' component={Blogs}/>

      <Route exact path='/logout' component={Logout}/>

      <Route exact strict component={ErrorPage} />

      </Switch>
      <Footer/>
    </div>
  )
}
export default App