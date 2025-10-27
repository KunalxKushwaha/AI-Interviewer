'use server';

import { db } from "@/firebase/admin";
import { success } from "zod";

export async function signUp(params: SignUpParams) {
    const {uid, name, email} = params;

    try {
        const userRecord = await db.collection('users').doc(uid).get();

        if(userRecord.exists) {
            return {
                success: false,
                message: 'User Already Exists.'
            }
        }
        
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