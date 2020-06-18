import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useHistory } from "react-router-dom";

const initialFormValues = {
    title: '',
    director: '',
    metascore: 0,
    stars: [],
}

const UpdateMovie = props => {
    const [formValues, setFormValues] = useState(initialFormValues);
    const { push } = useHistory();
    const { id } = useParams();

    useEffect(() => {
        axios
          .get(`http://localhost:5000/api/movies/${id}`)
          .then(res => {
            console.log(res)
            setFormValues(res.data);
          })
          .catch(err => console.log(err));
      }, [id]);

    const inputHandler = event => {
        event.preventDefault();
        setFormValues({
            ...formValues,
            [event.target.name]: event.target.value
        })
    }

    const submitHandler = event => {
        event.preventDefault();

        axios
            .put(`http://localhost:5000/api/movies/${id}`, formValues)
            .then(res => {
                console.log(res)
                const newMovieList = props.movieList.filter(movie => movie.id !== res.data.id)
                props.setMovieList(newMovieList);
                setFormValues(initialFormValues);
                push(`/`);
            })
            .catch(err => console.log(err));
    }

    return (
        <form onSubmit={submitHandler}>
            <input type="text" name="title" value={formValues.title} onChange={inputHandler} />
            <input type="text" name="director" value={formValues.director} onChange={inputHandler} />
            <input type="number" name="metascore" value={formValues.metascore} onChange={inputHandler} />
            <input type="text" name="stars" value={formValues.stars} onChange={inputHandler} />
            <button>Submit</button>
        </form>
    )
}

export default UpdateMovie