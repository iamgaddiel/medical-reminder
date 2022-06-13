import { BrowserRouter } from 'react-router-dom'
import { Routes } from './Routes';
import { RecoilRoot } from 'recoil'


function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App
