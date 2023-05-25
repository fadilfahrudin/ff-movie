import React, { useEffect, useState } from "react";
import "./edit.css";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import Axios from "axios";

const Edit = () => {
	const { id } = useParams();
	const navigate = useNavigate();

	const [title, setTitle] = useState("");
	const [genre, setGenre] = useState("");
	const [poster, setPoster] = useState("");
	const [year, setYear] = useState("");
	const [description, setDesctiption] = useState("");
	const [posterSaved, setPosterSaved] = useState("");

	const onPosterChange = (e) => {
		if (e.target.files && e.target.files[0]) {
			let getPoster = e.target.files[0];
			setPoster(URL.createObjectURL(getPoster));
			setPosterSaved(getPoster);
		}
	};

	useEffect(() => {
		getMovieById();
	}, []);

	const getMovieById = () => {
		Axios.get(`http://localhost:5000/api/movies/${id}`).then((response) => {
			setTitle(response.data.title);
			setGenre(response.data.genre);
			setPoster(response.data.poster);
			setYear(response.data.year);
			setDesctiption(response.data.description);
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		// cek user ganti photo atau tdk
		let getPoster = e.target[3].files[0];

		// console.log(getPoster);

		let formData = new FormData();
		formData.append("id", id);
		formData.append("title", title);
		formData.append("genre", genre);
		formData.append("year", year);
		formData.append("description", description);

		if (!getPoster) {
			formData.append("poster", poster);
		} else {
			formData.append("poster", posterSaved);
		}

		Axios.put(`http://localhost:5000/api/movie/update`, formData)
			.then((res) => {
				// console.log(res);
				navigate("/admin");
			})
			.catch((err) => {
				console.error(err);
			});
	};

	return (
		<div className='container'>
			<div className='row bg-light p-3 rounded w-75 mx-auto mt-5'>
				<div className='row d-flex align-items-center'>
					<button
						type='link'
						className='btn btn-outline-dark btn-sm my-3 col-2'
						onClick={() => navigate("/admin")}>
						<span aria-hidden='true'>&laquo;</span> Back
					</button>
					<h1 className='col text-dark'>Edit Movie {title}</h1>
				</div>
				<form className='text-dark shadow-lg p-2 rounded' onSubmit={handleSubmit}>
					<div className='row'>
						<div className='col'>
							<div className='form-floating mb-3'>
								<input
									type='text'
									className='form-control'
									id='title'
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									placeholder='Avengers End Game'
								/>
								<label htmlFor='floatingInput'>Title Movie</label>
							</div>
							<div className='row'>
								<div className='col'>
									<div className='form-floating mb-3'>
										<input
											type='text'
											className='form-control'
											id='genre'
											placeholder='Example: Action, Hero dll'
											value={genre}
											onChange={(e) => setGenre(e.target.value)}
										/>
										<label htmlFor='floatingInput'>Genre</label>
									</div>
								</div>
								<div className='col'>
									<div className='form-floating mb-3 col'>
										<input
											type='number'
											className='form-control'
											id='year'
											placeholder='Example: 2019'
											value={year}
											onChange={(e) => setYear(e.target.value)}
										/>
										<label htmlFor='floatingInput'>Year</label>
									</div>
								</div>
							</div>
							<div className='mb-3'>
								<input
									className='form-control'
									type='file'
									id='formFile'
									style={{ height: "35px" }}
									onChange={onPosterChange}
								/>
							</div>
							<div className='form-floating mb-3'>
								<textarea
									className='form-control'
									placeholder='Description here'
									id='description'
									value={description}
									onChange={(e) => setDesctiption(e.target.value)}></textarea>
								<label htmlFor='description'>Description</label>
							</div>
						</div>
						<div className='col'>
							<div className='mx-auto d-flex justify-content-center'>
								<img src={poster} alt='poster' width={200} height={250} />
							</div>
							<button type='submit' className='btn btn-success w-100 mt-2 '>
								Update
							</button>
						</div>
					</div>
				</form>
			</div>
		</div>
	);
};

export default Edit;
