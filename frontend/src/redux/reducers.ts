import {
  addMedication,
  deleteMedication,
  getAllMedications,
} from "../utils/localbase";
import { ADD_MEDICATION, DELETE_MEDICATION, LIST_MEDICATIONS } from "./actions";

type MedicationAction = {
  type: string;
  payload?: any;
};

type MedicationState = {
  medication: {
    time?: string;
    medication_type?: string;
    dose?: string;
    medication_name?: string;
    description?: string;
    user: string;
    active?: boolean;
  }[];
};

export const medicationReducer = (
  state: MedicationState,
  action: MedicationAction
) => {
  switch (action.type) {
    case ADD_MEDICATION:
      addMedication({ ...action.payload });
      return { ...action.payload };

    case DELETE_MEDICATION:
      deleteMedication(action.payload);
      (async () => {
        try {
          const data = await getAllMedications();
          return { ...state, ...data };
        } catch (err) {
          throw new Error(`Trouble fetching data from localbase ${err}`);
        }
      })()

    case LIST_MEDICATIONS:
      (async () => {
        const data = await getAllMedications();
        let newState = [...state?.medication, data];
        return newState;
      })();
  }
};
