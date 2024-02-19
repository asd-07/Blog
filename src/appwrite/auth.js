import conf from "../conf/conf"
import { Client, Account, ID } from "appwrite";
 
export class AuthService {
    client = new Client();
    account;

    //object bnaega tb call hoga cnstructor isliye aise banaye hai vrna sedha hard code kr lo
    constructor() {
        this.client
                .setEndpoint(conf.appwriteUrl)
                .setProject(conf.appwriteProjectId);
            this.account = new Account(this.client);
    }

    async createAccount({email, password, name}){
        try {
           const userAccount = await this.account.create(ID.unique(), email, password, name);

           if(userAccount){
            //cal another method ...like login kra do ab hai to
             return this.login({email, password});
           } else {
                return userAccount
           }
        } catch (error) {
            throw error;
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailSession(email, password);
        } catch (error) {
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
            
        } catch (error) {
            console.log("Appwrite servie :: getCurrentUser :: error", error)
        }

        return null;
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.log("Appwrite servie :: logout :: error", error)
        }
    }

    
}

const authService = new AuthService(); //ye ek object bna liya class se

export default authService