const domain = "http://localhost:8000/api";

const getData = async (url: string) => {
  let token = sessionStorage.getItem('user')
  if (token !== null) token = JSON.parse(token).token
  const options = {
    headers: {
      // "Access-Control-Allow-Origin": "*",
      "Authorization": `Token ${token}`,
    },
  };
  const res = await (await fetch(url, options)).json();
  return res;
};

const postData = async (url: string, data: any) => {
  //....
}
// -----------------------------------------------------------------


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
      "Content-Type": "application/json",
    },
  });
  const data = await apiCall.json();
  return data;
};

export const authenticateUser = async (formData: Data) => {
  const apiCall = await fetch(`${domain}/login/`, {
    method: "POST",
    body: JSON.stringify(formData),
    headers: {
      "Content-Type": "application/json",
    }, 
  });
  const data = await apiCall;
  console.log("🚀 ~ file: api_calls.ts ~ line 28 ~ loginUser ~ data", data);
  return data;
};


// -------------------------- [ Doctors ] -------------------------------
// ----------------------------------------------------------------------

export const getAllDoctors = async () => {
  try {
    const url = "http://localhost:8000/api/doctors/";
    const res = await getData(url);
    return res;
  } catch (err) {
    console.log("🚀 ~ file: api_calls.ts ~ line 43 ~ getAllDoctors ~ err", err);
  }
};

export const getDoctorDetail = async (id: string) => {
  try {
    const url = `http://localhost:8000/api/doctors/${id}/`;
    const res = await getData(url);
    return res;
} catch (err) {
  console.log("🚀 ~ file: api_calls.ts ~ line 74 ~ getDoctorDetail ~ err", err)
  }
}