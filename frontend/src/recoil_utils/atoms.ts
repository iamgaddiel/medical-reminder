import { atom } from 'recoil'


export let MedicationCounterAtom = atom({
    default: 0,
    key: 'med-counter'
})

export let MedicationAtom = atom({
    key: 'meds',
    default: []
})

export const User = atom({
    key: 'user',
    default: {
        'token': "",
        'user_id': "",
        'first_name': "",
        'last_name': "",
        'account_type': "",
        'email': "",
        'profile': {
            'image': "",
            'weight': "",
            'height': "",
            'blood_group': ""
        }
    }
})