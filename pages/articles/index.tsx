import Layout from "@/components/Layout";
import React from "react";
import { GoogleMap, InfoWindow, LoadScript, Marker, MarkerF } from "@react-google-maps/api";

const googleApiKey = process.env.NEXT_PUBLIC_GOOGLE_KEY as string;

const Map = () => {
  if (!googleApiKey) {
    console.error("Google Maps API key is not defined");
    return <div>Google Maps API key is missing.</div>; // エラーメッセージを表示
  }

  const mapStyles = {
    height: "900px",
    width: "1000px"
  };
  
  const defaultCenter = {
    lat: 35.68464993689905,
    lng: 139.76527086362694
  };
  
  const sloth = {
    lat: 8.528367689460337,
    lng: -70.8462553438002
  };
  const penguin = {
    lat: -76.08582140373557,
    lng: 24.169920862212667
  };
  const cat = {
    lat: 24.329498619995984,
    lng: 123.82058167298516
  };
  const dog = {
    lat: 54.727579009499095,
    lng: -2.437513158554143
  };
  
  const divStyle = {
    background: "white",
    fontSize: 7.5,
  };

  return (
    <>
      <div className="wrap">
        <LoadScript googleMapsApiKey={googleApiKey}>
          <GoogleMap mapContainerStyle={mapStyles} center={defaultCenter} zoom={2}>
            <MarkerF position={sloth} label={"フタユビナマケモノ"} />
            <MarkerF position={penguin} label={"皇帝ペンギン"} />
            <MarkerF position={cat} label={"イリオモテヤマネコ"} />
            <MarkerF position={dog} label={"ゴールデンレトリバー"} />
          </GoogleMap>
        </LoadScript>
      </div>
    </>
  )
};

const ArticlesIndex = () => {
  return (
    <Layout>
      <div>
        <h1>Animal Map</h1>
        <Map />        
      </div>
    </Layout>
  );
};

export default ArticlesIndex;