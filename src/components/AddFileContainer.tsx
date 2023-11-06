import "./AddFileContainer.css";

import { IonActionSheet, IonButton, IonFab, IonFabButton, IonIcon, IonImg } from "@ionic/react";
import { addOutline, trash, close, camera } from "ionicons/icons";
import { useState } from "react";
import { UserPhoto, usePhotoStore } from "../hooks/usePhotoStore";

interface AddFileContainerProps { }

const AddFileContainer: React.FC<AddFileContainerProps> = () => {
    //
    const { photo, deletePhoto } = usePhotoStore();
    const [photoToDelete, setPhotoToDelete] = useState<UserPhoto | null>();

    return (
        <>
          <div id="addFileContainer" color="medium">
              <IonButton
                  routerLink="/capture"
              >
                  <IonIcon icon={addOutline}></IonIcon>
              </IonButton>
          </div>
        </>
    );
}

export default AddFileContainer;