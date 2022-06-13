import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@material-ui/core'
import { AlarmAddOutlined, DeleteOutline, PersonAddRounded } from '@material-ui/icons'
import Pagination from '@mui/material/Pagination';
import { useState } from 'react'
import Calender from 'react-calendar'
import { Link } from 'react-router-dom'

const Reminders = () => {

    const [calenderValue, setCalender] = useState(new Date())

    return (
        <section className="row justify-content-between">
            <div className="col-md-4 col-sm-12">
                <section className='reminder-content'>
                    <div className="d-flex justify-content-between border-bottom">
                        <h5>Reminders</h5>
                        <Link to=''><small className="text-primary">view all</small></Link>
                    </div>
w
                    <section className="task-list mt-3">
                        <List>
                            <ListItem>
                                <ListItemAvatar>
                                    <Avatar />
                                </ListItemAvatar>
                                <ListItemText primary='John Doe' secondary='12:00pm Thursday' />
                                <Button variant='text' color='secondary'>
                                    <DeleteOutline />
                                </Button>
                            </ListItem>
                        </List>


                        {/* pagination */}
                        <div className="mt-4 pagination-link">
                            <Pagination count={10} shape="rounded" color='primary' />
                        </div>
                    </section>
                </section>
            </div>

            {/* item create form */}
            <div className="col-md-5 col-sm-12">
                <form action="" className='border p-4 rounded-4'>
                    <h5 className="text-muted"><AlarmAddOutlined /> Add Reminder</h5>
                    <div className='mt-1'>
                        <TextField label='Title' variant='standard' placeholder='Title' className='w-75' />
                    </div>
                    <div className='mt-4'>
                        <TextField label='Description' variant='standard' placeholder='Description' className='w-75' multiline />
                    </div>
                    <div className="mt-4">
                        <Calender value={calenderValue} onChange={setCalender} />
                    </div>
                    <div className="">
                        <Button color='primary' variant='contained'>Save</Button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Reminders