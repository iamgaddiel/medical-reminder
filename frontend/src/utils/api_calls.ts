const domain = "http://localhost:8000/api";

type Data = {
  first_name?: string;
  last_name?: string;
  username: string;
  account_type?: string;
  password: string;
};
export const createUser = async (formData: Data) => {
  const apiCall = await fetch(`${domain}/save_user/`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const data = await apiCall.json();
  return data;
};

export const authenticateUser = async (formData: Data) => {
  const apiCall = await fetch(`${domain}/login/`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const data = await apiCall;
  console.log("🚀 ~ file: api_calls.ts ~ line 28 ~ loginUser ~ data", data)
  return data;
};
