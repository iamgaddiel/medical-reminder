import { Button, Container, ListItem, ListItemText } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'


import DoctorImage from '../../assets/images/person.jpg'
import { getDoctorDetail } from '../../utils/api_calls'

import './doctor_chat.css'



type Doctor = {
  id: string,
  username: string,
  first_name: string,
  last_name: string,
  email: string,
  profile: {
    id: number,
    weight: number,
    height: number,
    blood_group: string,
    profile_image: string,
    user: string
  },
  doctor: {
    id: string,
    certificate: string,
    user: string
  }
}

const DoctorChat = () => {
  const { id } = useParams()
  const [doctor, setDoctorDetail] = useState<Doctor>({
    id: "",
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    profile: {
      id: 0,
      weight: 0,
      height: 0,
      blood_group: "",
      profile_image: "",
      user: ""
    },
    doctor: {
      id: "",
      certificate: "",
      user: ""
    }
  })

  useEffect(
    () => {
      (
        async () => {
          let res = await getDoctorDetail(id as string)
          console.log("🚀 ~ file: DoctorChat.tsx ~ line 21 ~ res", res)
          setDoctorDetail(res)
        }
      )()
    },
    []
  )

  return (
    <Container>
      <div className="row">
        <div className="col-6">
          <section className="doctor-card mt-5">
            <div className="card">
              <div className="doctor-image-container">
                <img
                  src={doctor.profile.profile_image}
                  alt="doctor image"
                />
              </div>
              <div className="card-content">

                {/* name */}
                <ListItem className='border-bottom'>
                  <ListItemText>
                    <span className="text-muted">name</span>
                    <h6>{doctor.first_name} {doctor.last_name}</h6>
                  </ListItemText>
                </ListItem>

                {/* Username */}
                <ListItem className='border-bottom'>
                  <ListItemText>
                    <span className="text-muted">username</span>
                    <h5>@{doctor.username}</h5>
                  </ListItemText>
                </ListItem>

                {/* email */}
                <ListItem className='border-bottom'>
                  <ListItemText>
                    <span className="text-muted">email</span>
                    <h5>{doctor.email}</h5>
                  </ListItemText>
                </ListItem>

              </div>
            </div>
          </section>
        </div>

        <div className="col-6">
          <section className="chat p-3 border rounded-3">
            <div className="chat-content">
              <span className="text-muted">No chat history....</span>
            </div>

            <div className="chat-message-box d-flex justify-content-between py-3">
              <input
                type="text"
                className='border rounded-2 h-25 mr-4 p-2 w-75'
                placeholder='Enter message'
              />
              <Button
                variant="contained"
                color="primary">
                send
              </Button>
            </div>
          </section>
        </div>
      </div >
    </Container >
  )
}

export default DoctorChat