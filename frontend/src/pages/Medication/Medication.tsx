import { List, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { AlarmAddOutlined } from '@material-ui/icons'
import { Pagination } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import MedicationItem from '../../components/MedicationItem'
import { MedicationAtom, MedicationCounterAtom } from '../../recoil_utils/atoms'
import { addMedication, getAllMedications } from '../../utils/localbase'
// import {Toast} from 'react-toastify'





const Medication = () => {
    const [medicationType, setMedicationType] = useState('')
    const [medicationName, setMedicationName] = useState('')
    const [dose, setDose] = useState('')
    const [description, seeDescription] = useState('')
    const [time, setTime] = useState('')

    // -----------[ States ] ------------
    const [medicationState, setMedicationState] = useState<any>([])
    const [medicationCounter, setMedicationCounter] = useRecoilState(MedicationCounterAtom)


    const updateMedications = () => getAllMedications().then(res => setMedicationState(res))

    useEffect(() => { updateMedications() }, [medicationCounter])


    const saveMedicationDetails = () => {
        if (
            medicationType === 'none' ||
            medicationName === '' ||
            dose === '' ||
            description === '' ||
            time === '') {
            return
        }

        const data = {
            user: 'test user',
            medication_name: medicationName,
            dose,
            description,
            medication_type: medicationType,
            time,
            active: true,
            created: new Date().getTime()
        }
        addMedication(data)
        setMedicationType('')
        setMedicationName('')
        setDose('')
        seeDescription('')
        setTime('')

        getAllMedications()
            .then(res => {
                const count = res.length + 1
                sessionStorage.setItem('medicationCounter', count)
                setMedicationCounter(count)
            })
    }
    
    return (
        <section className="row justify-content-between">
            <div className="col-md-4 col-sm-12">
                <section className='reminder-content'>
                    <div className="d-flex justify-content-between border-bottom">
                        <h5>Reminders</h5>
                        <Link to=''><small className="text-primary">view all</small></Link>
                    </div>

                    {
                        medicationState.length === 0 ?
                            <h5>You don't have any medication</h5> :
                            <section className="task-list mt-3">
                                <List>
                                    {
                                        medicationState?.map((medication: any) => (
                                            <MedicationItem
                                                id={medication.key}
                                                active={medication?.data.active}
                                                medication={medication?.data.medication_name}
                                                time={medication?.data.time}
                                                type={medication?.data.medication_type}
                                                key={medication.key}
                                            />
                                        ))
                                    }
                                </List>

                                {/* pagination */}
                                <div className="mt-4 pagination-link">
                                    <Pagination count={10} shape="rounded" color='primary' />
                                </div>
                            </section>
                    }
                </section>
            </div>

            {/* item create form */}
            <div className="col-md-4 col-sm-12">
                <form action="" className='border p-4 rounded-4'>
                    <h5 className="text-muted"><AlarmAddOutlined /> Add Reminder</h5>

                    <FormControl fullWidth className='mt-1'>
                        <TextField label='Medication Name' variant='standard' placeholder='Medication Name' onChange={(e: any) => setMedicationName(e.target.value)} />
                    </FormControl>
                    <FormControl fullWidth className='mt-4'>
                        <TextField
                            label='Description'
                            variant='standard'
                            placeholder='Description'
                            multiline
                            required
                            onChange={(e: any) => seeDescription(e.target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth className="mt-4">
                        <TextField
                            type='number'
                            variant='standard'
                            label='Dose'
                            placeholder='Dose'
                            required
                            onChange={(e: any) => setDose(e.target.value)}
                        />
                    </FormControl>
                    <FormControl fullWidth className="mt-4">
                        <InputLabel>Medication Type</InputLabel>
                        <Select
                            onChange={(e: any) => setMedicationType(e.target.value as string)}
                            value={medicationType}
                            label='Medication Type'
                            required
                        >
                            <MenuItem value="">None</MenuItem>
                            <MenuItem value='pill'>Pill</MenuItem>
                            <MenuItem value='medicine'>Tablets</MenuItem>
                            <MenuItem value='teaspoon'>Tea Spoon</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth className="mt-4">
                        <TextField
                            type='time'
                            variant='standard'
                            placeholder='Time'
                            required
                            onChange={(e: any) => setTime(e.target.value)}
                        />
                        {/* <Calender value={calenderValue} onChange={setCalender} /> */}
                    </FormControl>
                    <FormControl fullWidth className="mt-3">
                        <Button color='primary' variant='contained' onClick={saveMedicationDetails}>Save</Button>
                    </FormControl>
                </form>
            </div>
        </section>
    )
}

export default Medication

function useRecoilValue(MedicationAtom: any) {
    throw new Error('Function not implemented.')
}
