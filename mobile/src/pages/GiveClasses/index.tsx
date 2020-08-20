import React from 'react';
import { View, Image, Text, ImageBackground } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import giveClassesBgImage from '../../assets/images/give-classes-background.png';

import styles from './styles';

function GiveClasses() {
  const { goBack } = useNavigation();

  // poderiamos tambem usar goBack diretamente
  // no botão.
  function handleNavigation() {
    goBack()
  }

  return (
    // ImageBackground precisa de um tamanho definido
    // para funcionar correntamente.
    <View style={styles.container}>
      <ImageBackground
        resizeMode='contain'
        source={giveClassesBgImage}
        style={styles.content}
      >
        <Text style={styles.title}>Quer ser um Proffy?</Text>
        <Text style={styles.description}>
          Para começar, você precisa se cadastrar como
          professor na nossa plataforma web.
        </Text>
      </ImageBackground>

      <RectButton  onPress={handleNavigation} style={styles.okButton}>
        <Text style={styles.okButtonText}>Tudo Bem</Text>
      </RectButton>
    </View>
  )
}

export default GiveClasses;