import { Avatar, ListItemAvatar } from '@material-ui/core'
import Pill from '../../assets/images/pill.png';
import TeaSpoon from '../../assets/images/teaspoon.png';
import Medicine from '../../assets/images/medicine.png';


type Props = {
  type: string
}
const MedicationIcon = ({ type }: Props) => {
  const selectMedicationIcon = () => {
    switch (type) {
      case 'pill':
        return Pill
      case 'teaspoon':
        return TeaSpoon
      case 'medicine':
        return Medicine
    }
  }

  return <Avatar src={selectMedicationIcon()} alt={type} />

}

export default MedicationIcon