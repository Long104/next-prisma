"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const Create = () => {


	const [form,setForm] = useState({
		title:'',
		content:'',
		categoryId:'',
		categories:[]
	})
	const router = useRouter()

	const handleSubmit = async(event:React.FormEvent) => {
		event.preventDefault()
		try {
			 await axios.post('/api/posts',{
			title:form.title,
			content:form.content,
			categoryId:form.categoryId

			})
			router.push("/")
		} catch (error) {
			console.log('error', error)
			alert('something went wrong')
		}
		console.log("title",form.title)
		console.log("content", form.content)
	}

	
	const fetchCategories = async() => {
		try {	
		const response = await axios.get(`/api/categories`)
		setForm({
			...form,
			categories:response.data
		})
		} catch (error) {
			console.log('error', error)
		}
		
	}

	useEffect(() => {
		fetchCategories()
	},[])

	return (
		<div className="max-w-4xl mx-auto px-4 py-8">
			<h1 className="text-2xl font-semibold mb-6">Create a New Post</h1>
			<form className="space-y-6" onSubmit={handleSubmit}>
				<div>
					<label
						htmlFor="title"
						className="block text-sm font-medium text-gray-700"
					>
						Title
					</label>
					<input
						type="text"
						name="title"
						id="title"
						value={form.title}
						onChange={(e) => {
							const { name, value } = e.target;
							setForm({ ...form, [name]: value });
						}}
						required
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					/>
				</div>
				<div>
					<label
						htmlFor="content"
						className="block text-sm font-medium text-gray-700"
					>
						Content
					</label>
					<textarea
						name="content"
						value={form.content}
						onChange={(e) => {
							const { name, value } = e.target;
							setForm({ ...form, [name]: value });
						}}
						id="content"
						required
						rows={4}
						className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
					></textarea>
				</div>
				<div>
					<div>
						<select
							value={form.categoryId}
							onChange={ (e) =>{
								const {name,value} = e.target
								setForm({
									...form,
									categoryId:value
								})
							}
							}
						>
							<option value="">Select a category</option>
							{/* Example static categories, replace or populate dynamically */}
						{form.categories.map((cat:any) => 
							<option value={cat.id}>{cat.name}</option>)
						}
						</select>
					</div>
					<button
						type="submit"
						className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
					>
						Submit
					</button>
				</div>
			</form>
		</div>
	);
};

export default Create;
