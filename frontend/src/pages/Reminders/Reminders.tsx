import { Avatar, Button, FormControl, List, ListItem, ListItemAvatar, ListItemText, TextField } from '@material-ui/core'
import { AlarmAddOutlined, DeleteOutline, PersonAddRounded } from '@material-ui/icons'
import Pagination from '@mui/material/Pagination';
import { useEffect, useState } from 'react'
import Calender from 'react-calendar'
import { Link } from 'react-router-dom'
import { useRecoilState, useRecoilValue } from 'recoil';
import ReminderItem from '../../components/ReminderItem';
import { reminderCounterAtom, User } from '../../recoil_utils/atoms';
import { addReminder, getAllReminders } from '../../utils/localbase';
import { updateItemCount } from '../../utils/localstorage_utils';




// -----------------------------[ Types ]-------------------------
// ---------------------------------------------------------------------
type Reminder = {
    key: string,
    data: {
        time?: string,
        date?: Date,
        description?: string,
        user?: string,
        title: string,
        active?: boolean,
    }
}

const Reminders = () => {
    // Form State
    const [isLoading, setIsLoading] = useState(true)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [time, setTime] = useState("")
    const [date, setDate] = useState(new Date())
    const [reminders, setReminder] = useState<Reminder[]>([])
    const [reminderCounter, serReminderCounter] = useRecoilState(reminderCounterAtom)
    const user = useRecoilValue(User)


    // -----------------------------[ Functions ]-------------------------
    // ---------------------------------------------------------------------

    const handleReminderSubmit = () => {
        if ((title && description && time) === "") {
            return
        }
        addReminder({
            title,
            description,
            time,
            date,
            user: user?.token,
            active: true,
            created: new Date().getTime()
        })
        const counter = updateItemCount("reminder_count", { type: "increment" });
        if (counter !== undefined) serReminderCounter(counter);
        reloadReminders()
    }

    const reloadReminders = async () => {
        try {
            let res = await getAllReminders();
            if (res.user) res = await getAllReminders();

            res = res.filter( reminder => reminder.data.user === user?.token)
            
            setReminder(res)

        } catch (err) {
            console.log("🚀 ~ file: Reminders.tsx ~ line 36 ~ reloadReminders ~ err", err)
        }
    }


    // -----------------------------[ Life Circle ]-------------------------
    // ---------------------------------------------------------------------
    useEffect(
        () => {
            reloadReminders()
            setIsLoading(false)
        },
        [reminderCounter]
    )


    return (
        <section className="row justify-content-between">
            <div className="col-md-4 col-sm-12">
                <section className='reminder-content'>
                    <div className="d-flex justify-content-between border-bottom">
                        <h5>Reminders</h5>
                        <Link to=''><small className="text-primary">view all</small></Link>
                    </div>

                    <section className="task-list mt-3">
                        <List>
                            {
                                isLoading ?
                                    <h4 className="text-muted">Fetching Reminders...</h4> :
                                    reminders.length == 0 ?
                                        <h5 className="text-muted">You don't have any reminders</h5> :
                                        reminders?.map((reminder) => (
                                            <ReminderItem
                                                title={reminder?.data.title}
                                                date={reminder?.data.date}
                                                time={reminder?.data.time}
                                                id={reminder.key}
                                            />
                                        ))
                            }
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
                    <FormControl fullWidth className='mt-1'>
                        <TextField
                            label='Title'
                            variant='standard'
                            placeholder='Title'
                            onChange={(e: any) => setTitle(e.target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth className='mt-4'>
                        <TextField
                            label='Description'
                            variant='standard'
                            placeholder='Description'
                            multiline
                            onChange={(e: any) => setDescription(e.target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth className='mt-4'>
                        <label htmlFor="">Time</label>
                        <TextField
                            variant='standard'
                            placeholder='Time'
                            type="time"
                            onChange={(e: any) => setTime(e.target.value)}
                        />
                    </FormControl>
                    <div className="mt-4">
                        <Calender value={date} onChange={setDate} />
                    </div>
                    <div className="">
                        <Button
                            color='primary'
                            variant='contained'
                            onClick={handleReminderSubmit}
                        >
                            Save
                        </Button>
                    </div>

                </form>
            </div>
        </section>
    )
}

export default Reminders