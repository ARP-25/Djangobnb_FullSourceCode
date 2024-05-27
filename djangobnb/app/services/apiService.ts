import { getAccessToken } from "../lib/actions";

const apiService = {
    get: async function (url: string): Promise<any> {
        console.log("get", url);

        const token = await getAccessToken();

        return fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
            method: "GET",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => {
                console.log("Full response:", response);

                if (!response.ok) {
                    return Promise.reject(`HTTP error! status: ${response.status}`);
                }

                return response.json();
            })
            .then((json) => {
                console.log("Response JSON:", json);
                return json;
            })
            .catch((error) => {
                console.error("Fetch error:", error);
                throw error;
            });
    },

    post: async function (url: string, data: any): Promise<any> {
        console.log("post", url, data);

        const token = await getAccessToken();
        console.log("Token ============= ", token);
        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: "POST",
                body: data,
                headers: {
                    Authorization: `Bearer ${token}`, // This is the token you're sending
                    "Content-Type": "application/json", // This is the type of data you're sending, importtant for authentication
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log("Response:", json);

                    resolve(json);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },

    postWithoutToken: async function (url: string, data: any): Promise<any> {
        console.log("post", url, data);

        return new Promise((resolve, reject) => {
            fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
                method: "POST",
                body: data,
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
            })
                .then((response) => response.json())
                .then((json) => {
                    console.log("Response:", json);

                    resolve(json);
                })
                .catch((error) => {
                    reject(error);
                });
        });
    },
};

export default apiService;
