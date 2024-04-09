import { User } from '@auth0/auth0-react';

export const adminUser: User = {
	username: 'admin@gmail.com',
	password: 'Admin1234',
};

export const validUser: User = {
	username: 'tester@gmail.com',
	password: 'Tester1234',
};

export const invalidUser: User = {
	username: 'InvalidUsername',
	password: 'InvalidPassword',
};
