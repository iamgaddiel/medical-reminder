import { Button, ListItem, ListItemAvatar, ListItemText } from "@material-ui/core";
import {
  DeleteOutline,
  NoEncryptionTwoTone,
  NotificationsNoneOutlined,
  NotificationsOffOutlined
} from "@material-ui/icons";
import MedicationIcon from "../MedicationIcon";
import { deleteMedication, updateMedication } from "../../utils/localbase";
import { MedicationCounterAtom } from "../../recoil_utils/atoms";
import { useRecoilState } from 'recoil'
import { Link, useLocation } from "react-router-dom";
import { OpenInFull } from "@mui/icons-material";



type Props = {
  medication: string,
  active: boolean,
  type: string,
  id: string,
  time: string
}
function MedicationItem({ id, active, type, medication, time }: Props) {
  const location = useLocation()
  const [_, setMedicationCounter] = useRecoilState(MedicationCounterAtom)

  // -------------------------- [ Function ] -------------------------------
  // -----------------------------------------------------------------------
  const handleDeleteMedication = () => {
    deleteMedication(id)
    const counter = Number(sessionStorage.getItem('medicationCounter')) - 1
    sessionStorage.setItem('medicationCounter', String(counter))
    setMedicationCounter(counter)
  }

  const handleToggleActive = () => {
    updateMedication(id, { active: !active })
  }

  return (
    <ListItem>
      <ListItemAvatar>
        <MedicationIcon type={type} />
      </ListItemAvatar>
      <ListItemText primary={medication} secondary={time} />

      {/* Show medication detail */}
      <Link to={`${location.pathname}/${id}`}>
        <OpenInFull />
      </Link>

      {/* toggle notification */}
      <Button variant='text' color='primary' onClick={handleToggleActive}>
        {
          active ? <NotificationsNoneOutlined /> : <NotificationsOffOutlined />
        }
      </Button>

      {/* Delete button */}
      <Button variant='text' color='secondary' onClick={ handleDeleteMedication }>
        <DeleteOutline />
      </Button>
    </ListItem>
  )
}
export default MedicationItem