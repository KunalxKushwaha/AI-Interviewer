'use server';

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const one_week = 60 * 60 * 24 * 7;

export async function signUp(params: SignUpParams) {
    const {uid, name, email} = params;

    try {
        const userRecord = await db.collection('users').doc(uid).get();

        if(userRecord.exists) {
            return {
                success: false,
                message: 'User Already Exists. Please Sign In Instead.'
            }
        }
        

        await db.collection('users').doc(uid).set({
            name,
            email,
            
        });

    } catch (error: any) {
        console.error('Error Creating a User', error);

        if(error.code === 'auth/email-already-exists') {
            return {
                success: false,
                message: 'Email already in use'
            }
        }

        return {
            success: false,
            message: 'Could not create a user'
        }
        
    }
}

export async function signIn(params: SignInParams) {
    const {email, idToken} = params;

    try {

        const userRecord = await auth.getUserByEmail(email);

        if(!userRecord) {
            return {
                success: false,
                message: 'No User Found with this Email. Create an Account Instead.'
            }
        }
        
    } catch (e) {
        console.log(e);

        return {
            success: false,
            message: 'Failed to Log into an Account.'
        }
        
    }
}

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {expiresIn: 60 * 60 * 24 * 7 * 1000});

     cookieStore.set("session", sessionCookie, {
    maxAge: one_week,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });
}