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
            .setKey('a8cc4f7f2a11cb6b19ad4a2fb903e798007ced4c6284d8843311e342e01bb44ae4de8000b63c5fcca78dde1602f99fe8ea3dc6bdf72233c65e0d3af99bdc873ed6845e2e436ec0fd2eb78ec96074acd48841f6bfead56ec0bae79454fe1f74e7314da4f78c9ebfa33788e9edba1317f0aa8895ce0ab303144c95120f3c018ae0');

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