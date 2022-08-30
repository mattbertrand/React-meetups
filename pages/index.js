import { MongoClient } from 'mongodb';
import Head from 'next/head';
import MeetupList from '../components/meetups/MeetupList';

// const DUMMY_MEETUPS = [
// 	{
// 		id: 'm1',
// 		title: 'A first meetup',
// 		image:
// 			'https://th.bing.com/th/id/OIP.lmVeqgRvrJZulfv1acVZ6AHaFA?pid=ImgDet&rs=1',
// 		address: "5 Allee Verdi, 69380, Chazay d'Azergues",
// 		description: "Let's meet in Chazay!",
// 	},
// 	{
// 		id: 'm2',
// 		title: 'A second meetup',
// 		image:
// 			'https://www.communes.com/images/orig/rhone-alpes/rhone/chazay-d-azergues_69380/Chazay-d-Azergues_10981_DSC00552.jpg',
// 		address: "18 Place de la poste, 69380, Chazay d'Azergues",
// 		description: 'How about here?',
// 	},
// ];

const HomePage = (props) => {
	return (
		<>
			<Head>
				<title>React Meetups</title>
				<meta
					name='description'
					content='Browse a list of React fictive meetups!'
				></meta>
			</Head>
			<MeetupList meetups={props.meetups} />
		</>
	);
};

// export async function getServerSideProps(context) {
// 	const req = context.req;
// 	const res = context.res;
// 	return {
// 		props: {
// 			meetups: DUMMY_MEETUPS,
// 		},
// 	};
// }

export async function getStaticProps() {
	const client = await MongoClient.connect(
		'mongodb+srv://matt:azBYcw11121988@cluster0.urqlbmo.mongodb.net/meetups?retryWrites=true&w=majority'
	);
	const db = client.db();

	const meetupsCollection = db.collection('meetups');

	const meetups = await meetupsCollection.find().toArray();

	client.close();

	return {
		props: {
			meetups: meetups.map((meetup) => ({
				title: meetup.title,
				address: meetup.address,
				image: meetup.image,
				id: meetup._id.toString(),
			})),
		},
		revalidate: 10,
	};
}

export default HomePage;
