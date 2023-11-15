import './Home.css';
import { useState } from 'react';

import { IonActionSheet, IonButton, IonContent, IonHeader, IonImg, IonPage, IonSpinner, IonTitle, IonToolbar } from '@ionic/react';
import { trash, close } from 'ionicons/icons';

import AddFileContainer from '../components/AddFileContainer';
import { usePhotoStore, UserPhoto } from '../hooks/usePhotoStore';
import { useFeatSelectStore } from '../hooks/useFeatSelectStore';


const HomePage: React.FC = () => {
  const { photo, deletePhoto } = usePhotoStore();
  const [photoToDelete, setPhotoToDelete] = useState<UserPhoto | null>();
  const { featureSelector, setFeatureSelector } = useFeatSelectStore();
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar >
          <IonTitle className="ion-text-center">GreenCheck</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding" >
        { photo 
          ?
            <IonImg onClick={() => setPhotoToDelete(photo)} src={photo?.webviewPath} />
          :
            <AddFileContainer />
        }
  <p style={{display:"flex", justifyContent:"center", fontWeight:"bold", marginBottom:"2px"}}>Feature Selector</p>
      <div style={{display:"flex", justifyContent:"center"}}>
        <IonButton 
          id="buttons"
          onClick={() => setFeatureSelector("PSO")} 
          fill={featureSelector === "PSO" ? "solid" : "outline"}
          style={{ borderBottom: featureSelector === "PSO" ? "4px solid #79AC78"  : "none" }}
        >
          PSO
        </IonButton>
        <IonButton 
          id="buttons"
          onClick={() => setFeatureSelector("ABC")} 
          fill={featureSelector === "ABC" ? "solid" : "outline"}
          style={{ borderBottom: featureSelector === "ABC" ? "4px solid #79AC78" : "none" }}
        >
          ABC
        </IonButton>
        <IonButton 
          id="buttons"
          onClick={() => setFeatureSelector("ACO")} 
          fill={featureSelector === "ACO" ? "solid" : "outline"}
          style={{ borderBottom: featureSelector === "ACO" ? "4px solid #79AC78" : "none" }}
        >
          ACO
        </IonButton>
      </div>
      <p style={{display:"flex", justifyContent:"center", fontWeight:"bold", marginBottom:"2px"}}>Diagnosis</p>
      <div style={{display:"flex", justifyContent:"center"}}>
        <div id="analysisResultDiv">
          { isAnalyzing 
            ?
              <IonSpinner name="dots"></IonSpinner>
            :
              <span>Name of Disease</span>
          }
        </div>
      </div>

      <IonButton  
        id="analyze"
        style={{ display: 'block', margin: '16px auto 0' }}
        disabled={isAnalyzing}
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
            }
            },
          {
            text: 'Cancel',
            icon: close,
            role: 'cancel'
          },
        ]}
        onDidDismiss={() => setPhotoToDelete(null)}
      />
      </IonContent>
    </IonPage>
  );
};

export default HomePage;