import { User } from "@auth0/auth0-react";
import { Password } from "@mui/icons-material";

export const adminUser: User = {
    username: 'admin@gmail.com',
    password: 'Admin1234'
}

export const validUser: User = {
    username: 'user3@gmail.com',
    password: 'User1234'
}

export const invalidUser: User = {
    username: 'InvalidUsername',
    password: 'InvalidPassword'
}