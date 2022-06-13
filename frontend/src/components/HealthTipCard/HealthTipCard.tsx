import { Card, CardContent, Button } from '@material-ui/core'
import React from 'react'
import { Link } from 'react-router-dom'



type Props = {
    item: number
}
const HealthTipCard = ({item}: Props) => {
    return (
        <>
            <Card className='task-item mt-3'>
                <CardContent>
                    <p className='text-muted'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci similique necessitatibus molestias pariatur cum repellat veritatis officiis accusamus asperiores accusantium!</p>

                    <Link to={''}>
                        <Button color='primary'>View</Button>
                    </Link>
                </CardContent>
            </Card>
        </>
    )
}

export default HealthTipCard