import { Outlet } from 'react-router-dom'
import Header from '@/layouts/header/Header'
import Footer from '@/layouts/footer/Footer'
import AppBox from '@/components/app-box/AppBox'

import '@/layouts/root-layout/RootLayout.scss'

const RootLayout = () => {
  return (
    <AppBox className='root-layout'>
      <Header />
      <AppBox className='root-layout__content'>
        <Outlet />
      </AppBox>
      <Footer />
    </AppBox>
  )
}

export default RootLayout
