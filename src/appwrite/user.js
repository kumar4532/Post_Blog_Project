import conf from '../conf/config';
import { Client, Users } from 'node-appwrite';

export class AuthService {
    client;
    users;

    constructor() {
        this.client = new Client();
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
            .setKey(conf.appwriteSecretKey);

        this.users = new Users(this.client);
    }

    async getUserById(userId) {
        try {
            if (userId) {
                const response = await this.users.get(userId);
                return response;
            } else {
                console.log('User ID is not provided');
            }
        } catch (error) {
            console.error('Appwrite service :: getUserById :: error', error);
        }
    }
}

const userService = new AuthService();

export default userService;