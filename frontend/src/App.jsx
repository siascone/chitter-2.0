import { Routes, Route } from "react-router-dom"
// import { useSelector } from "react-redux"
import LoginForm from "./components/SessionForms/loginForm.jsx" 
import Navigation from "./components/Navigation/navigation.jsx"
import SignupForm from "./components/SessionForms/singupForm.jsx"
import Feed from './components/Feed/feed.jsx'
function App() {

  // const currentUser = useSelector( state => {
  //   let user;
  //   if (state.session.user) {
  //     user = state.users[state.session.user.id]
  //   }
  //   return user;
  // })

  return (
    <div>
      <h1>Welcome to Chitter</h1>
      <Navigation />
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/feed" element={<Feed />}/>
      </Routes>
    </div>
  )
}

export default App;
