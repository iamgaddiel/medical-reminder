import { Avatar, Button, ListItem, ListItemAvatar, ListItemText } from '@material-ui/core'
import { DeleteOutline } from '@material-ui/icons'
import React from 'react'
import { useRecoilState } from 'recoil'
import { reminderCounterAtom } from '../../recoil_utils/atoms'
import { deleteReminder } from '../../utils/localbase'
import { updateItemCount } from '../../utils/utils'


type ReminderItemType = {
    title: string
    time: string
    date: Date
    id: string
}
const ReminderItem: React.FC<ReminderItemType> = ({ title, time, date, id }) => {
    const [_, serReminderCounter] = useRecoilState(reminderCounterAtom)

    const handleReminderDelete = (id: string) => {
        deleteReminder(id)
        const counter = updateItemCount("reminder_count", { type: "decrement" });
        if (counter !== undefined) serReminderCounter(counter);
    }

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar />
            </ListItemAvatar>
            <ListItemText primary={title} secondary={`${time} ${date}`} />
            <Button variant='text' color='secondary' onClick={() => handleReminderDelete(id)}>
                <DeleteOutline />
            </Button>
        </ListItem>
    )
}

export default ReminderItem