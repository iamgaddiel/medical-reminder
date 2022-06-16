import { Avatar, Container, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText } from '@material-ui/core'
import { MessageOutlined, ViewArraySharp } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import { getAllDoctors } from '../../utils/api_calls'
import { Link } from 'react-router-dom'

const Doctors = () => {
  type Doctor = {
    'username': string,
    'id': string,
    'first_name': string,
    'last_name': string
  }
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [isLoading, setIsLoading] = useState(true)


  useEffect(() => {
    (
      async () => {
        const res = await getAllDoctors()
        setDoctors(res)
        setIsLoading(false)
      }
    )()
  }, [])

  return (
    <Container>
      <div className="title border-bottom mb-4">
        <h5 className="text-muted">Doctors</h5>
      </div>
      {
        isLoading ?
          <h3 className="text-muted">fetching Doctors ....</h3> :
          <List>
            {
              doctors?.map((doctor: any) => (
                <Link to={`/doctor/${doctor?.id}`}>
                  <ListItem className='border-bottom'>
                    <ListItemAvatar>
                      <Avatar />
                    </ListItemAvatar>
                    <ListItemText primary={`${doctor?.first_name} ${doctor?.last_name}`} secondary={`@${doctor?.username}`} />
                  </ListItem>
                </Link>
              ))
            }
          </List>
      }
    </Container>
  )
}

export default Doctors