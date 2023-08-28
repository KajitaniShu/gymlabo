import {
  BrowserRouter,
  Routes,
  Route,
} from 'react-router-dom'
import Home from '../components/Home'
import { TalkTagForm } from '../features/TalkTagForm'
import { ModalsProvider } from '@mantine/modals';


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