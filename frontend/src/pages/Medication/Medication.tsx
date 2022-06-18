import { List, Button, TextField, FormControl, InputLabel, Select, MenuItem } from '@material-ui/core'
import { AlarmAddOutlined } from '@material-ui/icons'
import { Pagination } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import MedicationItem from '../../components/MedicationItem'
import { MedicationAtom, MedicationCounterAtom } from '../../recoil_utils/atoms'
import { addMedication, getAllMedications } from '../../utils/localbase'
// import {Toast} from 'react-toastify'





const Medication = () => {
    // ---------------------------------[ State Hooks ] -----------------------------
    // -----------------------------------------------------------------------
    const [medicationType, setMedicationType] = useState<"pill" | "teaspoon" | "medicine" | "none">('none')
    const [medicationName, setMedicationName] = useState('')
    const [dose, setDose] = useState('')
    const [description, seeDescription] = useState('')
    const [time, setTime] = useState('')
    const [isLoading, setIsLoading] = useState(true)
    const [medications, setMedicationState] = useState<any>([])
    const [medicationCounter, setMedicationCounter] = useRecoilState(MedicationCounterAtom)


    // ---------------------------------[ Ref Hooks ] -----------------------------
    // -----------------------------------------------------------------------
    const titleField = useRef<HTMLInputElement>(null)
    const descriptionField = useRef<HTMLInputElement>(null)
    const doseField = useRef<HTMLInputElement>(null)
    const timeField = useRef<HTMLInputElement>(null)
    const medicationField = useRef<HTMLSelectElement>(null)


    // ---------------------------------[ Functions ] -----------------------------
    // -----------------------------------------------------------------------
    const saveMedicationDetails = () => {
        if (
            medicationType === 'none' ||
            medicationName === '' ||
            dose === '' ||
            description === '' ||
            time === '') {
            return
        }

        // add medication
        addMedication({
            user: 'test user',
            medication_name: medicationName,
            dose,
            description,
            medication_type: medicationType,
            time,
            active: true,
            created: new Date().getTime()
        })

        // Get all medications and increment medication count by one
        getAllMedications()
            .then(res => {
                const count = res.length + 1
                sessionStorage.setItem('medicationCounter', count)
                setMedicationCounter(count)
            })

        // Reset input filed values
        titleField.current!.value = ""
        descriptionField.current!.value = ""
        descriptionField.current!.value = ""
        timeField.current!.value = ""
        medicationField.current!.value = "none"
    }

    const displayMedications = async () => {
        try {
            let res = await getAllMedications()
            if (res.user) {
                res = await getAllMedications()
            }
            setMedicationState(res)
            setIsLoading(false)
        } catch (error) {
            console.log("🚀 ~ file: Medication.tsx ~ line 49 ~ async ~ error", error)
        }
    }

    // ---------------------------------[ LifeCircle Hooks ] -----------------------------
    // -----------------------------------------------------------------------
    useEffect(
        () => {
            displayMedications()
        }, [medicationCounter]
    )

    return (
        <section className="row justify-content-between">
            <div className="col-md-4 col-sm-12">
                <section className='reminder-content'>
                    <div className="d-flex justify-content-between border-bottom">
                        <h5>Reminders</h5>
                        <Link to=''><small className="text-primary">view all</small></Link>
                    </div>

                    {
                        isLoading ?
                            <h5 className="text-muted mt-4">Fetching medications...</h5> :
                            medications.length === 0 ?
                                <h5>You don't have any medication</h5> :
                                <section className="task-list mt-3">
                                    <List>
                                        {
                                            medications?.map((medication: any) => (
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
                        <TextField
                            label='Medication Name'
                            variant='standard'
                            placeholder='Medication Name'
                            onChange={(e: any) => setMedicationName(e.target.value)}
                            ref={titleField}
                        />
                    </FormControl>
                    <FormControl fullWidth className='mt-4'>
                        <TextField
                            label='Description'
                            variant='standard'
                            placeholder='Description'
                            multiline
                            required
                            onChange={(e: any) => seeDescription(e.target.value)}
                            ref={descriptionField}
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
                            ref={doseField}
                        />
                    </FormControl>
                    <FormControl fullWidth className="mt-4">
                        <InputLabel>Medication Type</InputLabel>
                        <Select
                            onChange={(e: any) => setMedicationType(e.target.value as string)}
                            value={medicationType}
                            label='Medication Type'
                            required
                            ref={medicationField}
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
                            ref={timeField}
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
