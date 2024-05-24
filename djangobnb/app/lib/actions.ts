"use server";

import { cookies } from "next/headers";

export async function handleLogin(userId: string, accessToken: string, refreshToken: string) {
    cookies().set("session_userId", userId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7, //One Week
        path: "/",
    });
    cookies().set("session_accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60, //60 Minutes
        path: "/",
    });
    cookies().set("session_refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60, //One Week
        path: "/",
    });
}

export async function resetAuthCookies() {
    console.log("Resetting cookies");
    cookies().set("session_userId", "");
    cookies().set("session_accessToken", "");
    cookies().set("session_refreshToken", "");
}

//
// Get Data
export async function getUserId() {
    const userId = cookies().get("session_userId")?.value;
    return userId ? userId : null;
}

//
//
export async function getAccessToken() {
    let accessToken = cookies().get("session_accessToken")?.value;
    return accessToken ? accessToken : null;
}
