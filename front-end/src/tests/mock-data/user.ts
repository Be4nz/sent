import { User } from '@auth0/auth0-react';

export const adminUser: User = {
	username: 'admin',
	password: 'Admin1234',
};

export const validTester: User = {
	username: 'tester',
	password: 'Tester1234',
};

export const validTester_unknown: User = {
	username: 'tester0',
	password: 'Tester1234',
};

export const invalidUser: User = {
	username: 'InvalidUsername',
	password: 'InvalidPassword',
};
