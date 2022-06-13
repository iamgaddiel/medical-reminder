let  cron = require('node-cron')
import { getAllMedications } from './localbase'



type Medication = {
    time?: string;
    medication_type?: 'pill' | 'teaspoon' | 'medicine';
    dose?: string;
    medication_name?: string;
    description?: string;
    user?: string;
    active?: boolean;
    created?: number;
}
// let medications: Medication[]  = []


// (
//     async () => {
//         const res = await (await getAllMedications()).data
//         res.forEach((med: any) => {
//             medications.push(med.data)
//         })
//         console.log(medications)
//     }
// )() 

// const displayNotice = () => {
//     console.log('weldon')
// }

// medications.forEach((med: any) => {
//     let hr = med.time.split(':')[0]
//     let min = med.time.split(':')[1]
//     cron.schedule(`* * * * * *`, displayNotice)
// })


// let v = cron.schedule(`* * * * * *`, displayNotice)

// v.start()

