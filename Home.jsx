import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css';
import Navbar from './Navbar';
import AlbumContainer from './AlbumContainer';
import Sidebar from './Sidebar';
import { fetchLaunchData } from './LaunchData';
import AlbumDetails from './AlbumDetails';
import { fetchAlbumDetails } from './FetchAlbumDetails';

const Home = () => {
  const [albums, setAlbums] = useState([]);
  const [launchData, setLaunchData] = useState([]);
  const [loading, setLoading] = useState(true);

  // handleSearch data
  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8080/search/albums/');
      const launch = {};
      for (let key in response.data) {
        launch[key] = response.data[key];
      }
      setAlbums(launch);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };


  useEffect(() => {
    // Fetch launch data
    const fetchHomeData = async () => {
      try {
        const result = await fetchLaunchData();
        setLaunchData(result);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };
    fetchHomeData(); // Call the fetchHomeData function
  }, []);

  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const apicall= async(id)=>{
    try {
      const response = await fetchAlbumDetails(id)
      setAlbums(response);
      console.log(albums)
      setLaunchData([])
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  }
  const handleCardClick = (album) => {
    setSelectedAlbum(album);
    if (album[1]==='song'){
      apicall(album[0]);
    }
    else if(album[1]==='album'){

    }

  };
  console.log("AlbumID",selectedAlbum)

  return (
    <div className="Main-container">
      <Sidebar />
      <Navbar handleSearch={handleSearch} />
      {loading && <div className="loader-container">
        <div className="loader"></div>
      </div>}
      {launchData ? <>{Object.keys(launchData).map((key, index) => (
        <AlbumContainer key={index} titles={launchData[key].title} launchData={launchData[key]} onClick={handleCardClick}/>
      ))}</> : albums ? <AlbumDetails image={albums.image} title={albums.album}/>:null}
    </div>
  );
};

export default Home;
