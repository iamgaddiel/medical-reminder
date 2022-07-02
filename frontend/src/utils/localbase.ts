import Localbase from "localbase";

const db = new Localbase("db");

// --------------------------------- [ Reminders ]--------------------'
// ---------------------------------------------------------------------
type ReminderData = {
  time?: string;
  date?: Date;
  description?: string;
  user?: string;
  title: string;
  active?: boolean;
  created: number;
};

export const addReminder = (data: ReminderData) =>
  db.collection("reminders").add(data);

export const deleteReminder = (key: string) => {
  db.collection("reminders").doc(key).delete();
};

export const updateReminder = (key: string, data: ReminderData) => {
  db.collection("reminders").doc(key).update(data);
};

export const getAllReminders = async () => {
  try {
    const Reminders = await db
      .collection("reminders")
      .orderBy("created", "desc")
      .get({ keys: true });
    return Reminders;
  } catch (err) {
    if (err) throw new Error("Could not get all Reminders " + err);
  }
};

export const getSingleReminder = async (key: string) => {
  try {
    const Reminder = await db.collection("Reminders").get(key);
    return Reminder;
  } catch (err) {
    if (err) throw new Error("Could not getting Reminders " + err);
  }
};

// -----------------------------[ Medications ]-------------------------
// ---------------------------------------------------------------------

type medicationData = {
  time?: string;
  medication_type?: "pill" | "teaspoon" | "medicine";
  dose?: string;
  medication_name?: string;
  description?: string;
  user?: string;
  active?: boolean;
  created?: number;
};

export const addMedication = (data: medicationData) =>
  db.collection("medications").add(data);

export const deleteMedication = (key: string) => {
  db.collection("medications").doc(key).delete();
};

export const updateMedication = (key: string, data: medicationData) => {
  db.collection("medications").doc(key).update(data);
};

export const getAllMedications = async () => {
  try {
    let medications = await db
      .collection("medications")
      .orderBy("created", "desc")
      .get({ keys: true });
    return medications;
  } catch (err) {
    console.log(
      "🚀 ~ file: localbase.ts ~ line 88 ~ getAllMedications ~ err",
      err
    );
  }
};

export const getSingleMedication = async (key: string) => {
  try {
    const medication = await db.collection("medications").doc(key).get();
    return medication;
  } catch (err) {
    if (err) throw new Error("Could not getting medications " + err);
  }
};
