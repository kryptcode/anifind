import {useState} from 'react';
import Head from 'next/head'
import Link from 'next/link';
import axios from 'axios';
import Header from '../components/Header';
export default function Home() {
	const [anime, setAnime] = useState('');
	const [searchRes, setSearchRes] = useState(null);
	/**
	 *
	 *
	 * Fetch anime details
	 */
	const fetchAnimeDetails = async e => {
		e.preventDefault();
		try {
			const res = await axios.get(`/api/anime`, {
				params: {anime}
			});
			const {data} = res;
			const {results} = data;
			results = results.slice(0, 10);
			setSearchRes(results);
		} catch (err) {
			console.log(err);
		}
	};
	return (
		<div className="min-h-screen">
			<Head>
				<title>
					AniFind
				</title>
			</Head>

			<Header />

			<div className="w-[90%] mx-auto ">
				<form className="flex justify-between items-center space-x-3 md:space-x-8 mb-16  ">
					<input
						autoFocus={true}
						type="text"
						className="flex-grow py-1.5 px-2"
						placeholder="Search anime"
						onChange={e => setAnime(e.target.value)}
					/>
					<button
						className="py-1.5 px-4 md:px-8 tracking-wider bg-green-600 text-white"
						onClick={e => fetchAnimeDetails(e)}
					>
						Search
					</button>
				</form>
				{searchRes &&
					searchRes.map(animeDetail => (
						<div className="flex flex-col md:flex-row mb-10 space-y-3 md:space-y-0">
							<div className="flex-1 flex flex-col items-center justfy-center">
								<Link href={animeDetail.url}>
									<a>
										<img
											src={animeDetail.image_url}
											// width={200}
											// height={300}
											className='w-full md:w-40 md:h-60 object-contain'
											alt={animeDetail.title}
										/>
									</a>
								</Link>
							</div>
							<div className="flex-[2] text-gray-500 text-center md:text-left">
								<div className="flex space-x-4 mb-3 text-xl justify-center md:justify-left font-semibold tracking-wider">
									<p className="">
										Title:
									</p>
									<p className="">
										{animeDetail.title}{' '} 
									</p>
								</div>
								<div className="flex space-x-4 mb-2 justify-center md:justify-left">
									<p className="">
										Popularity:
									</p>
									<p className="">
										{animeDetail.score}{' '} / 10
									</p>
								</div>
								<div className="flex space-x-4 mb-2 justify-center md:justify-left">
									<p className="">
										Rated
									</p>
									<p className="">
										{animeDetail.rated}
									</p>
								</div>
								<div className="">
									<p className="">
										Synopsis
									</p>
									<p className="">
										{animeDetail.synopsis}
									</p>
								</div>
							</div>
						</div>
					))}
			</div>
		</div>
	);
}
