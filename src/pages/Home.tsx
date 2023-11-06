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
  const [ isAnalyzing, setIsAnalyzing ] = useState<boolean>(false);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">GreenCheck</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        { photo 
          ?
            <IonImg onClick={() => setPhotoToDelete(photo)} src={photo?.webviewPath} />
          :
            <AddFileContainer />
        }

      <div style={{display:"flex"}}>
        <IonButton 
          onClick={() => setFeatureSelector("PSO")} 
          fill={featureSelector === "PSO" ? "solid" : "outline"}
          style={{flex: 1}}
        >
          PSO
        </IonButton>
        <IonButton 
          onClick={() => setFeatureSelector("ABC")} 
          fill={featureSelector === "ABC" ? "solid" : "outline"}
          style={{flex: 1}}
        >
          ABC
        </IonButton>
        <IonButton 
          onClick={() => setFeatureSelector("ACO")} 
          fill={featureSelector === "ACO" ? "solid" : "outline"}
          style={{flex: 1}}
        >
          ACO
        </IonButton>
      </div>

      <div>
        <p>Diagnosis</p>
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
        expand="full"
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