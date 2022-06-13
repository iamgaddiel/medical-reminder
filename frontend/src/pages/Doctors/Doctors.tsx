import { Avatar, Container, Link, List, ListItem, ListItemAvatar, ListItemIcon, ListItemText } from '@material-ui/core'
import { MessageOutlined, ViewArraySharp } from '@material-ui/icons'
import React from 'react'

const Doctors = () => {
  return (
    <Container>
      <List>
        <ListItem className='border-bottom'>
          <ListItemAvatar>
            <Avatar />
          </ListItemAvatar>
          <ListItemText primary='John Doe' secondary='medical doctor' />
          <Link to={''}>
            <ListItemIcon>
              <MessageOutlined color='primary' />
            </ListItemIcon>
          </Link>
        </ListItem>
      </List>
    </Container>
  )
}

export default Doctors