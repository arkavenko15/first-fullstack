import './App.css';
import React, {useEffect, useState} from 'react'
import Axios from 'axios'

function App() {
  const[movieName, setMovieName]=useState("");
  const[review, setReview]=useState("");
  const [movieReviewList, setMovieList] = useState([]);
  const [updatedReview, setUpdatedReview] = useState("");
  // https://kaven-movie-reviewer.herokuapp.com
  useEffect(()=>{
    Axios.get('http://localhost:3002/api/get' || 'https://kaven-movie-reviewer.herokuapp.com/api/get').then((response)=>{
        setMovieList(response.data)
    })
  },[])

  const submitReview =(movie)=>{
      Axios.post('http://localhost:3002/api/insert' ||'https://kaven-movie-reviewer.herokuapp.com/api/insert',{
        movieName:movieName,
        movieReview:review,
      });
        setMovieList([...movieReviewList,
        {movieName: movieName, movieReview:review},
      ]);   
      console.log("fine")
  };
  const deleteReview=(movie)=>{
    Axios.delete(`http://localhost:3002/api/delete/${movie}`|| 'https://kaven-movie-reviewer.herokuapp.com/api/delete/${movie}')
        setMovieList(movieReviewList.filter((val)=>{
          return movie != val.movieName
      }))
  }
  const updateReview=(movie)=>{
    Axios.put("http://localhost:3002/api/update" ||'https://kaven-movie-reviewer.herokuapp.com/api/update',{movieName:movie, movieReview:updatedReview,})
    setMovieList(movieReviewList.map((val)=>{
      return movie === val.movieName ? [{movieName: val.movieName, movieReview:updatedReview}]:val
    }))

  } 
  console.log(movieReviewList)
  return (
    <div className="App">
      <div className="title">Movie Rewiews</div>
          <div className="form">
              <input className="movie-name" placeholder="Movie Name..." onChange={(e)=>{setMovieName(e.target.value)}}></input>
              <input className="movie-review" placeholder="Movie Review..." onChange={(e)=>{setReview(e.target.value)}}></input>
              <button className="add-btn" onClick={submitReview}>Add review</button>
              {movieReviewList.map((val)=>{    
                return(                       
                  <div className="item"  key={val.id}>
                      <div className="name-item"> <p className="title-item">Movie Name:</p> {val.movieName} </div> 
                      <div className="review-item"><br/> <p className="title-item">Movie Review:</p> {val.movieReview}</div>
                      <div className="navigation">
                        <button className="update-btn" onClick={()=>{updateReview(val.movieName)}}>Update</button>
                        <input type="text" className="update-input" onChange={(e)=>{
                          setUpdatedReview(e.target.value)
                        }}></input>
                        <button className="delete-btn" onClick={()=>{deleteReview(val.movieName)}}>Delete</button>
                      </div>
                  </div>
                )
                
                })}
          </div>
      </div>
  );
}

export default App;
