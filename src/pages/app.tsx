import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import Home from '../components/Home'
import { TalkTagForm } from '../features/TalkTagForm'


export function App() {
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/talktag" element={<TalkTagForm/>} />
          <Route path="*" element={<></>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}