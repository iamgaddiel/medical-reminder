import { Avatar, Button } from '@material-ui/core'
import { MenuOutlined, LensOutlined, PersonOutline, Notifications, PlusOneOutlined, QuestionAnswerOutlined, Settings, SettingsOutlined } from '@material-ui/icons'
import React, { useRef } from 'react'
import { Outlet, Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import { User } from '../../recoil_utils/atoms'

// css
import './layout.css'

// image
import AvatarImage from '../../assets/images/person.jpg'
import { HealthAndSafety, HealthAndSafetyOutlined } from '@mui/icons-material'

const Layout = () => {
  const sideNav = useRef<any>(null)
  const main = useRef<any>(null)
  const [user, setUser] = useRecoilState(User)

  const openNav = () => {
    sideNav.current.style.width = "250px";
    main.current.style.marginLeft = "250px";
  }

  const closeNav = () => {
    sideNav.current.style.width = "0";
    main.current.style.marginLeft = "0";
  }

  // const handleLogout = () => {
  //   setUser({
  //     'token': "",
  //     'user_id': "",
  //     'first_name': "",
  //     'last_name': "",
  //     'account_type': "",
  //     'email': "",
  //     'profile': {
  //       'image': "",
  //       'weight': "",
  //       'height': "",
  //       'blood_group': ""
  //     }
  //   })
  // }

  return (
    <section className="wrapper">
      <section className="wrapper-content">
        <div ref={sideNav} className="sidenav">
          <a href="javascript:void(0)" className="closebtn" onClick={closeNav}>&times;</a>

          <div className="nav-link-wrapper">
            {/* SideNav */}
            <Link to="/"> <PersonOutline color='primary' /> Dashboard</Link>
            <Link to="/medication">Medication</Link>
            <Link to="/reminders"><Notifications color='primary' /> Reminders</Link>
            <Link to="/health"><QuestionAnswerOutlined color='primary' /> Health Tips</Link>
            <Link to="/doctors"><HealthAndSafetyOutlined color='primary' /> Doctors</Link>
            <Link to="#"><SettingsOutlined color='primary' /> Settings</Link>
            <Button variant="text" color="secondary">
              <SettingsOutlined color='error' />
              Logout
            </Button>

          </div>
        </div>

        {/* ------------------ [ Header ] -------------- */}
        <header className='dashboard-header fixed-top'>
          <div className="d-flex justify-content-between align-items-center">
            <MenuOutlined color='primary' onClick={openNav} />

            {/* search */}
            <form action="" method="post" className='search-form'>
              <div className="search-wrapper">
                <button type='submit' className="search-btn">
                  <LensOutlined />
                </button>
                <input type="text" name="search" id="search" placeholder='Search...' />
              </div>
            </form>


            <div className="d-flex align-items-center">
              <span className='mx-3'>{user.first_name} {user.last_name}</span>
              <Avatar src={AvatarImage} className='ml-3' />
            </div>
          </div>
        </header>

        <div ref={main} id="main" className='mt-5 pt-5'>
          <Outlet />
        </div>
      </section>
    </section>
  )
}

export default Layout