import './Home.css';
import { useState } from 'react';

import { IonActionSheet, IonAlert, IonButton, IonContent, IonHeader, IonImg, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import { trash, close } from 'ionicons/icons';

import AddFileContainer from '../components/AddFileContainer';
import { usePhotoStore, UserPhoto } from '../hooks/usePhotoStore';
import { useFeatSelectStore } from '../hooks/useFeatSelectStore';
import { usePredictionStore } from '../hooks/usePredictionStore';
import axios from 'axios';
import { Capacitor } from '@capacitor/core';

async function base64FromPath(path: string): Promise<string> {
  const response = await fetch(path);
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject('method did not return a string')
      }
    };
    reader.readAsDataURL(blob);
  });
}

const DISEASE_CODE = {
  "blb": "Bacterial Leaf Blight",
  "rb": "Rice Blast",
  "sb": "Sheath Blight",
  "hlt": "Healthy",
}


const HomePage: React.FC = () => {
  const { photo, deletePhoto } = usePhotoStore();
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto | null>();
  const { featureSelector, setFeatureSelector } = useFeatSelectStore();
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const { predictionResult, setPredictionResult } = usePredictionStore();


  const analyzeToServer = async () =>  {
    // Fetch the blob from the blob URL
    console.log(`${photo?.webviewPath}`)
    const image = await base64FromPath(`${photo?.webviewPath}`);
    console.log(image);

    // Create a FormData instance
    const formData = new FormData();

    // Append the blob as 'file' to the FormData instance
    formData.append('img_base64', image);

    // Send a POST request to the API endpoint with the FormData instance
    axios.post(`https://f728-175-176-28-127.ngrok-free.app/api/analyze/${featureSelector.toLowerCase()}`, formData, {
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        setPredictionResult(response?.data.predictions);
        console.log(predictionResult)
    }).catch(error => {
        console.error(error);
    });
  }

  const handleAnalyzeClick = () => {
    setIsAnalyzing(true);
    analyzeToServer();
    setTimeout(() => {
      setIsAnalyzing(false);
    }, 777);
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">GreenCheck</IonTitle>
        </IonToolbar>
      </IonHeader>

<IonContent fullscreen className={`${Capacitor.isNativePlatform() ? "" : "ion-padding"}`}>
        {photo ? (
          <IonImg
            className="riceleafimage"
            onClick={() => setPhotoToDelete(photo)}
            src={photo?.webviewPath}
          />
        ) : (
          <AddFileContainer />
        )}
        <p style={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold', margin: '20px 0 5px 0', color:'#5F6F52' }}>
          Feature Selectors
        </p>
        <IonButton
            id="NoFeature"
            style={{ display: 'flex', margin: '0 auto 0' }}
            onClick={() => setFeatureSelector('BASE')}
            fill={featureSelector === 'BASE' ? 'solid' : 'outline'}
            className={`button-normal ${featureSelector === 'BASE' ? 'button-active' : ''}`}
          >
            No Feature
          </IonButton>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <IonButton
            id="buttons"
            onClick={() => setFeatureSelector('PSO')}
            fill={featureSelector === 'PSO' ? 'solid' : 'outline'}
            className={`button-normal ${featureSelector === 'PSO' ? 'button-active' : ''}`}
          >
            PSO
          </IonButton>
          <IonButton
            id="buttons"
            onClick={() => setFeatureSelector('ABC')}
            fill={featureSelector === 'ABC' ? 'solid' : 'outline'}
            className={`button-normal ${featureSelector === 'ABC' ? 'button-active' : ''}`}
          >
            ABC
          </IonButton>
          <IonButton
            id="buttons"
            onClick={() => setFeatureSelector('ACO')}
            fill={featureSelector === 'ACO' ? 'solid' : 'outline'}
            className={`button-normal ${featureSelector === 'ACO' ? 'button-active' : ''}`}
          >
            ACO
          </IonButton>
        </div>
        
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <table className="ion-table">
          <thead>
            <tr>
              <th>Classification Results</th>
              <th>Percentage</th>
            </tr>
          </thead>
          <tbody>
            {isAnalyzing ? (
              <tr>
                <td colSpan={2} className='dot' >
                  <IonSpinner name="dots" />
                </td>
              </tr>
            ) : (
                Object.keys(predictionResult).map((key: string, index) => {
                  if (key === "predicted") return null;

                  return (
                    <tr key={index} className={predictionResult["predicted"] === key ? 'highest' : ''}>
                      <td>{DISEASE_CODE[key]}</td>
                      <td>{(predictionResult[key] * 100).toFixed(2)}%</td>
                    </tr>
                  )
                })
            )}
          </tbody>
        </table>
        </div>

        <IonButton
          id="analyze"
          style={{ display: 'flex', margin: '20px auto 0' }}
          disabled={isAnalyzing || (featureSelector === "N/A" || photo === null)}
          onClick={handleAnalyzeClick}
        >
          Analyze
        </IonButton>

        <IonActionSheet
          isOpen={!!photoToDelete}
          buttons={[
            {
              text: 'Delete',
              role: 'destructive',
              icon: trash,
              handler: () => {
                if (photoToDelete) {
                  deletePhoto(photoToDelete);
                  setPhotoToDelete(null);
                }
              },
            },
            {
              text: 'Cancel',
              icon: close,
              role: 'cancel',
            },
          ]}
          onDidDismiss={() => setPhotoToDelete(null)}
        />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
