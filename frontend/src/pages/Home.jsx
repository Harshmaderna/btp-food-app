import React from 'react'
import { useSelector } from 'react-redux'
import Userdashboard from '../components/Userdashboard'
import OwnerDashboard from '../components/OwnerDashboard'
import DelieveryBoy from '../components/DelieveryBoy'

const Home = () => {
  const {userData} = useSelector(state => state.user)
  return (
    <div className='w-[100vw] min-h-[100vh] pt-[100px] flex flex-col items-center'>
      {userData.role=="user" && <Userdashboard/>}
      {userData.role=="owner" && <OwnerDashboard/>}
      {userData.role=="delivery_boy" && <DelieveryBoy/>}
    </div> 
  )
}

export default Home
 