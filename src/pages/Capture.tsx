import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Capture.css';
import { arrowBackOutline, cameraOutline, imageOutline } from 'ionicons/icons';

import { usePhotoStore } from "../hooks/usePhotoStore";
import { useHistory } from 'react-router-dom';
import { Capacitor } from '@capacitor/core';

const CapturePage: React.FC = () => {

  const { takePhoto } = usePhotoStore();
  const history = useHistory();

  return (
    <IonPage>

      <IonHeader>
        <IonToolbar id="header" style={{display:"flex", flexDirection: "column",}}>
          <IonButtons slot='start'>
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButtons>
          <IonTitle>Select Source</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonList>

          {Capacitor.isNativePlatform() &&
          <IonItem
            className="itemSetting"
            button
            onClick={(e) => {
              e.preventDefault();
              takePhoto("CAMERA");
            }}
          >
            <IonIcon icon={cameraOutline} aria-hidden="true" slot="start"></IonIcon>
            <IonLabel>Camera</IonLabel>
          </IonItem>}
          <IonItem
            className="itemSetting"
            button
            onClick={(e) => {
              e.preventDefault();
              takePhoto("GALLERY").then(() => history.push("/home"));
            }}
          >
            <IonIcon icon={imageOutline} aria-hidden="true" slot="start"></IonIcon>
            <IonLabel>Gallery</IonLabel>
          </IonItem>
        </IonList>
      </IonContent>

    </IonPage>
  );
};

export default CapturePage;