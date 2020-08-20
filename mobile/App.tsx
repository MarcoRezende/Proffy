import { StatusBar } from 'expo-status-bar';
import React from 'react';
// Como a semantica não é importante, podemos usar
// View como usamos div.
import Landing from './src/pages/Landing';
// exibe um icone até que os recursos sejam carregados,
// como, por exemplo, o "N" da netflix.
import { AppLoading } from 'expo';

// importar useFonts de um deles
import { Archivo_400Regular, Archivo_700Bold, useFonts } from '@expo-google-fonts/archivo';
import { Poppins_400Regular, Poppins_600SemiBold } from '@expo-google-fonts/poppins';

import AppStack from './src/routes/AppStack';

export default function App() {
  // a varivel fontsLoaded vai receber true
  // assim que todas as fontes forem carregdas.
  let [fontsLoaded] = useFonts({
    Archivo_400Regular,
    Archivo_700Bold,
    Poppins_400Regular,
    Poppins_600SemiBold
  })

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      // Elemento vazio tambem conhecido como fragment,
      // é um recurso que não cria conteudo, serve apenas
      // para agrupar, como a View.
      <>
        <AppStack />
        <StatusBar style="light" />
      </>
    );
  }
}