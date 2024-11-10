import { userUseCase } from '@/src/use-case/user';
import React from 'react'

export default async function Profile() {
	const { data: user } = await userUseCase.getUserSession();
	return <div>{user?.displayName}</div>;
}
