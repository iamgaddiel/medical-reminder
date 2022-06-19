export const getReminderCount = () => {
  let reminderCount: number = Number(localStorage.getItem("reminder_count"));
  console.log(
    "🚀 ~ file: Reminders.tsx ~ line 69 ~ incrementReminderCount ~ reminderCount",
    reminderCount
  );
  if (reminderCount !== null) return reminderCount;
};

export const setReminderCount = (count: number) => {
  localStorage.setItem("reminder_count", String(count));
};

type ReminderCountAction = { type: "decrement" | "increment" };
export const updateReminderCount = (action: ReminderCountAction) => {
  let counter = getReminderCount();
  if (counter !== undefined) {
    switch (action.type) {
      case "increment":
        counter++;
        break;

        case "decrement":
          counter--;
        break;
      }
    setReminderCount(counter)
    return counter;
  }
};
