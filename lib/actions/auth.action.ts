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

export async function setSessionCookie(idToken: string) {
    const cookieStore = await cookies();

    const sessionCookie = await auth.createSessionCookie(idToken, {expiresIn: 60 * 60 * 24 * 7 * 1000});

    cookieStore.set({
        maxAge: one_week,
        name: 'session',
        value: sessionCookie,
        httpOnly: true,
    })
}