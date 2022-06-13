import { Button, ButtonGroup, Card, CardContent, Container, List, ListItem, ListItemText } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import MedicationIcon from '../../components/MedicationIcon'
import { getSingleMedication } from '../../utils/localbase'
import './style.css'

const MedicationDetails = () => {
    const { medId } = useParams()
    // const history = useHistory()

    type Medication = {
        time: string;
        medication_type: string;
        dose?: string;
        medication_name: string;
        description: string;
        user: string;
        active?: boolean;
    };

    const [medication, setMedication] = useState<Medication>({})

    const getMedDetail = () => getSingleMedication(medId as string).then((res: any) => setMedication(res))

    useEffect(() => {
        getMedDetail()
    }, [])


    const returnBack = () => {

    }
    return (
        <Container className='mt-5'>

            <div className="card p-3">
                <div className='medication'>
                    <section className="medication_logo">
                        <div className="d-flex justify-content-center align-items-center w-100 h-100">
                            <MedicationIcon type={medication.medication_type} key={medId} />
                        </div>
                    </section>
                    <section className="card-content">
                        <List>
                            <ListItemText className='border-bottom'>
                                <small className="text-muted">Title</small>
                                <h5>{medication.medication_name}</h5>
                            </ListItemText>
                            <ListItemText className='border-bottom'>
                                <small className="text-muted">Description</small>
                                <h5>{medication.description}</h5>
                            </ListItemText>
                            <ListItemText className='border-bottom'>
                                <small className="text-muted">Dosage</small>
                                <h5>{medication.dose} {medication.medication_type}</h5>
                            </ListItemText>
                            <ListItemText>
                                <small className="text-muted">Time</small>
                                <h5>{medication.time}</h5>
                            </ListItemText>
                        </List>
                        <ButtonGroup className='d-flex justify-content-center'>
                            <Button variant='outlined' color='primary' size='large'>
                                <Link
                                    onClick={returnBack}
                                    to={''}>
                                    Cancel
                                </Link>
                            </Button>
                            <Button
                                variant='outlined'
                                color='primary'
                                size='large'>
                                Edit
                            </Button>
                            <Button
                                variant='contained'
                                color='primary'
                                size='large'>
                                Take Medication
                            </Button>
                        </ButtonGroup>
                    </section>
                </div>
            </div>
        </Container >

    )
}

export default MedicationDetails