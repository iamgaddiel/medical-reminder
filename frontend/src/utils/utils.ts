/*
  Get Item count
 */
export const getItemCount = (item: string) => {
  let counter: number = Number(localStorage.getItem(item));
  if (counter !== null) return counter;
};

/*
Sets item count
*/
export const setItemCount = (item: string, count: number) => {
  localStorage.setItem(item, String(count));
};

/*
  Increments or decrements items's  LocalStorage value 
  params: item, action
*/
type CounterAction = { type: "decrement" | "increment" };
export const updateItemCount = (item: string, action: CounterAction) => {
  let counter = getItemCount(item);
  if (counter !== undefined) {
    switch (action.type) {
      case "increment":
        counter++;
        break;
      case "decrement":
        counter--;
        break;
    }
    setItemCount(item, counter);
    return counter;
  }
};
