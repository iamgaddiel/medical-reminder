import React from 'react'
import HealthTipCard from '../../components/HealthTipCard'

const HealthTips = () => {
    return (
        <>
            <div className="row justify-content-between">
                {
                    Array(1, 2, 3, 4, 5, 6).map(item => (
                        <div className="col-md-3 col-sm-12" key={item}>
                            <div className="task-list">
                                <HealthTipCard />
                            </div>
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default HealthTips