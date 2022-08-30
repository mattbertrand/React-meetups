import { useRouter } from 'next/router';
import React from 'react';
import NewMeetupForm from '../../components/meetups/NewMeetupForm';
import Head from 'next/head';

const NewMeetupPage = () => {
	const router = useRouter();

	async function addMeetupHandler(enteredMeetupData) {
		const response = await fetch('/api/new-meetup', {
			method: 'POST',
			body: JSON.stringify(enteredMeetupData),
			headers: {
				'Content-Type': 'application/json',
			},
		});

		const data = await response.json();

		console.log(data);

		router.push('/');
	}

	return (
		<>
			<Head>
				<title>Add A New Meetup</title>
				<meta
					name='description'
					content='Add a new meet up using this form'
				></meta>
			</Head>
			<NewMeetupForm onAddMeetup={addMeetupHandler} />
		</>
	);
};

export default NewMeetupPage;
