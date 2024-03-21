import { ID } from "appwrite";
import { INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases } from "./config";

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        );

        if(!newAccount){
            console.log("Error in creating the new Account in api.ts file")
            throw Error;
        }
        
        const avatarUrl = avatars.getInitials(user.name);

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name:newAccount.name,
            email:newAccount.email,
            username:user.username,
            imageUrl:avatarUrl,
        })



        return newUser;

    } catch (error) {
        console.log("Error is in api.ts file in createUserAccount function");
        return error;
    }
}

export async function saveUserToDB(user:{
    accountId:string,
    email:string,
    name:string,
    imageUrl:URL,
    username?:string

}){
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        )
        return newUser
        // TODO: return newUser
    } catch (error) {
        console.log("Error is in saveUserToDB function in api.ts file");
        throw error;
    }

}

export async function signInAccount(user:{
    email:string;
    password:string;
}){
    try {
        const session = await account.createEmailSession(user.email , user.password);
        // TODO: see if these parameteres goes in string 
        return session;
    } catch (error) {
        console.log("Error in signInAccount function in api.ts");
        throw error;
    }
}

export async function getCurrentUser(){
    try {
        const currentAccount = await account.get();

        if(!currentAccount) throw Error;

        


    } catch (error) {
        console.log("Error in getCurrentUser function in api.ts", error);
        
    }
}