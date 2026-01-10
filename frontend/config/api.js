API_BASE_URL= "http://localhost:5000/api/v1"

export const apiEndpoints ={
    user:{
        signup:`${API_BASE_URL}/user/signup`,
        signin:`${API_BASE_URL}/user/signin`
    },
    scan:{
        create:`${API_BASE_URL}/scan`,
        list:`${API_BASE_URL}/scan/${scanId}`,
    }

};