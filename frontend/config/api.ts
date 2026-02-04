const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api/v1";

export const apiEndpoints = {
    user: {
        signup: `${API_BASE_URL}/user/signup`,
        signin: `${API_BASE_URL}/user/signin`
    },
    scan: {
        create: `${API_BASE_URL}/scan`,
        getById: (scanId: string) => `${API_BASE_URL}/scan/${scanId}`,
    },
    order: {
        create: `${API_BASE_URL}/payment/create-order`,
        verify: `${API_BASE_URL}/payment/verify`
    }
};