import React, { useState } from 'react';
import { RectButton } from 'react-native-gesture-handler';
import {
  View,
  Image,
  Text,
  Linking,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import headerOutlineIcon from '../../assets/images/icons/heart-outline.png';
import unfavoriteIcon from '../../assets/images/icons/unfavorite.png';
import whatsappIcon from '../../assets/images/icons/whatsapp.png';

import styles from './styles';
import api from '../../services/api';

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFavorited] = useState(favorited);

  function handleLinkToWhatsapp() {
    api.post('connections', {
      user_id: teacher.id,
    });

    Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}&text=Oi, ${teacher.name}! Estou interessado em suas aulas de ${teacher.subject}.`);
  }
  
  async function handleToggleFavorite() {
    const favorites = await AsyncStorage.getItem('favorites');
    let favoritesArray: Teacher[] = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorited) {
      const unfavoritedIndex = favoritesArray.findIndex(el => el.id === teacher.id);
      if (unfavoritedIndex > -1) {
        favoritesArray.splice(unfavoritedIndex, 1);
      }
      setIsFavorited(false);
    } else {
      favoritesArray.push(teacher);
      setIsFavorited(true);
    }

    await AsyncStorage.setItem('favorites', JSON.stringify(favoritesArray));
  }

  return <View style={styles.container}>
    <View style={styles.profile}>
      <Image
        style={styles.avatar}
        source={{ uri: teacher.avatar || 'https://github.com/bernardohmr.png' }}
      />

      <View style={styles.profileInfo}>
        <Text style={styles.name}>{teacher.name}</Text>
        <Text style={styles.subject}>{teacher.subject}</Text>
      </View>
    </View>

    <Text style={styles.bio}>
      {teacher.bio}
    </Text>

    <View style={styles.footer}>
      <Text style={styles.price}>
        Preço/hora {'   '}
      <Text style={styles.priceValue}>{teacher.cost}</Text>
      </Text>
    </View>

    <View style={styles.buttonsContainer}>
      <RectButton
        style={[
          styles.favoriteButton,
          isFavorited ? styles.favorited : {},
        ]}
        onPress={handleToggleFavorite}
      >
        { isFavorited
          ? <Image source={unfavoriteIcon} />
          : <Image source={headerOutlineIcon} />
        }
      </RectButton>

      <RectButton style={styles.contactButton} onPress={handleLinkToWhatsapp}>
        <Image source={whatsappIcon} />
        <Text style={styles.contactButtonText}>Entrar em contato</Text>
      </RectButton>
    </View>
  </View>
}

export default TeacherItem;
