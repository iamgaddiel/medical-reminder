import MedicationItem from '../../components/MedicationItem';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowForward } from '@material-ui/icons'
import { Avatar, Button, CardContent, Card, Container } from '@material-ui/core'
import Calendar from 'react-calendar'
import HealthTipCard from '../../components/HealthTipCard';
import { getAllMedications } from '../../utils/localbase';
import { useRecoilValue, useRecoilState } from 'recoil';
import { MedicationCounterAtom, User } from '../../recoil_utils/atoms';


const Dashboard = () => {
  const [calender, setCalender] = useState(new Date())
  const [initialMedicationState, setInitialMedicationState] = useState<any>([])
  const medCounter = useRecoilValue(MedicationCounterAtom)
  const user = useRecoilValue(User)


  // ---------------------------------[ Functions ] -----------------------------
  // -----------------------------------------------------------------------
  const displayMedications = async () => {
    try {
      let res = await getAllMedications()
      if (res.user) {
        res = await getAllMedications()
      }
      setInitialMedicationState(res)
      // setIsLoading(false)
    } catch (error) {
      console.log("🚀 ~ file: Medication.tsx ~ line 49 ~ async ~ error", error)
    }
  }

  useEffect(
    () => {
      displayMedications()
    }, [medCounter]
  )

  return (
    <Container>
      <div className="db-wrapper">
        <div className="db-content">

          {/* Greeting  */}
          <section className="greeting">
            <small>Welcome back</small>
            <h1>{user.first_name} {user.last_name}</h1>
          </section>

          <section className="row justify-content-between">

            {/* Upcoming */}
            <section className="col-md-3 col-sm-12">
              {/* upcoming drugs */}'
              <div className="upcoming">
                <div className="d-flex justify-content-between algn-items-center">
                  <h6 className="">Today's prescription</h6>
                  <Link to=''>
                    <small className="text-muted">view all</small>
                  </Link>
                </div>

                {/* individual upcoming */}
                {
                  initialMedicationState.map((medication: any) => (
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

              </div>
            </section>

            {/* Health Tips */}
            <section className="col-md-3 col-sm-12">
              <div className="mt-4 task-list">
                <div className="d-flex justify-content-between algn-items-center">
                  <h6 className="">Heath Tips</h6>
                  <Link to=''>
                    <small className="text-muted">view all</small>
                  </Link>
                </div>
                {
                  Array(1, 2).map(item => (
                    <HealthTipCard item={item} key={item} />
                  ))
                }

              </div>
            </section>

            {/* task functionalities */}
            <div className="section col-md-2 col-sm-12">
              <div className="section functions">
                <div className="row justify-content-between align-item-center">
                  <div className="col-md-4 my-3">
                    <Link to={''}>
                      <Avatar />
                    </Link>
                  </div>
                  <div className="col-md-4 my-3">
                    <Link to={''}>
                      <Avatar color='primary' />
                    </Link>
                  </div>
                  <div className="col-md-4 my-3">
                    <Link to={''}>
                      <Avatar />
                    </Link>
                  </div>
                  <div className="col-md-4 my-3">
                    <Link to={''}>
                      <Avatar />
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Calender */}
            <section className="col-md-3 col-sm-12">
              <div>
                <Calendar value={calender} onChange={setCalender} />
              </div>
            </section>


          </section>

        </div>
      </div >
    </Container>
  )
}

export default Dashboard