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
  const [featureSelector, setFeatureSelector] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [diagnosisResults, setDiagnosisResults] = useState<{ name: string; percentage: number }[]>([]);

  const handleFeatureButtonClick = (feature: string) => {
    setFeatureSelector((prevFeature) => (prevFeature === feature ? null : feature));
  };

  const handleAnalyzeClick = () => {
    // analysis
    const diagnosisres= [
      { name: 'Healthy', percentage: Math.random() * 100 },
      { name: 'Bacterial Leaf Blight', percentage: Math.random() * 100 },
      { name: 'Rice Blast', percentage: Math.random() * 100 },
      { name: 'Sheath Blight', percentage: Math.random() * 100 },
    ];
    setDiagnosisResults(diagnosisres);

    //during the analysis process.
    setIsAnalyzing(true);

    setTimeout(() => {
      //when analysis is complete.
      setIsAnalyzing(false);
    }, 2000);
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">GreenCheck</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        {photo ? (
          <IonImg onClick={() => setPhotoToDelete(photo)} src={photo?.webviewPath} />
        ) : (
          <AddFileContainer />
        )}
        <p style={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold', margin: '20px 0 5px 0', color:'#5F6F52' }}>
          Feature Selectors
        </p>
        <IonButton
            id="NoFeature"
            style={{ display: 'flex', margin: '0 auto 0' }}
            onClick={() => handleFeatureButtonClick('NoFeature')}
            fill={featureSelector === 'NoFeature' ? 'solid' : 'outline'}
            className={`button-normal ${featureSelector === 'NoFeature' ? 'button-active' : ''}`}
          >
            No Feature
          </IonButton>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <IonButton
            id="buttons"
            onClick={() => handleFeatureButtonClick('PSO')}
            fill={featureSelector === 'PSO' ? 'solid' : 'outline'}
            className={`button-normal ${featureSelector === 'PSO' ? 'button-active' : ''}`}
          >
            PSO
          </IonButton>
          <IonButton
            id="buttons"
            onClick={() => handleFeatureButtonClick('ABC')}
            fill={featureSelector === 'ABC' ? 'solid' : 'outline'}
            className={`button-normal ${featureSelector === 'ABC' ? 'button-active' : ''}`}
          >
            ABC
          </IonButton>
          <IonButton
            id="buttons"
            onClick={() => handleFeatureButtonClick('ACO')}
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
              diagnosisResults.map((result, index) => (
                <tr key={index} className={result.percentage === Math.max(...diagnosisResults.map(item => item.percentage)) ? 'highest' : ''}>
                  <td>{result.name}</td>
                  <td>{result.percentage.toFixed(2)}%</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>

        <IonButton
          id="analyze"
          style={{ display: 'flex', margin: '20px auto 0' }}
          disabled={isAnalyzing}
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
