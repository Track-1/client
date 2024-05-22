import uuid from 'react-uuid';
import zizi from '../../assets/image/zizi.jpeg';
import Bornfire from '../../assets/audio/bonfire.mp3';
import profile1 from '../../assets/image/profile1.jpeg';
import profile2 from '../../assets/image/profile2.jpeg';
import profile3 from '../../assets/image/profile3.jpeg';
import profile4 from '../../assets/image/profile4.jpeg';
import profile5 from '../../assets/image/profile5.jpeg';
import profile6 from '../../assets/image/profile6.jpeg';
import profile7 from '../../assets/image/profile7.jpeg';
import profile8 from '../../assets/image/profile8.jpeg';
import profile9 from '../../assets/image/profile9.jpeg';
import profile10 from '../../assets/image/profile10.jpeg';
import profile12 from '../../assets/image/profile12.jpeg';
import { Categories } from '../../core/common/categories';

const getRandomIndex = (arrLength: number) => {
  return Math.floor(Math.random() * arrLength);
};

export const SOURCE = {
  getId() {
    return uuid();
  },

  getImage() {
    return [
      zizi,
      profile1,
      profile2,
      profile3,
      profile4,
      profile5,
      profile6,
      profile7,
      profile8,
      profile9,
      profile10,
      profile12,
    ][getRandomIndex(12)];
  },

  getAudio() {
    return [Bornfire][getRandomIndex(1)];
  },

  getTitle() {
    return [
      'Neon Beats',
      'Street Swagger',
      'Midnight Groove',
      'Urban Pulse',
      'Funky Flow',
      'City Lights',
      'Soulful Rhythm',
      'Electric Dreams',
      'Funk Fusion',
      'Hip Hop Haven',
      'Retro Vibes',
      'Underground Jam',
      'Groovy Gangsta',
      'Beatbox Boulevard',
      'Bounce Break',
      'Urban Anthem',
      'Fresh Beats',
      'Soulful Cypher',
      'Block Party Groove',
      'Beat Blast',
    ][getRandomIndex(20)];
  },

  getUser() {
    return [
      'GroovyWave',
      '블루쥬스',
      'UrbanVibes',
      '퓨처서프',
      'NeonBeat',
      '소울스타',
      'CityGroove',
      '별빛팝',
      'Funky노래',
      '글로벌비트',
      'Electric파티',
      '그루브타임',
      '레트로스윙',
      '더블스탭',
      'Soulful댄스',
      '미래팝',
      'Glamorous비트',
      '서울시티',
      '힙합볼륨',
      '자유발라드',
    ][getRandomIndex(20)];
  },

  getKeyword() {
    return Array.from({ length: 2 }, (_) => _).map(
      () =>
        [
          '신나는음악',
          '흥겨운노래',
          '재미있는음악',
          '파워풀한비트',
          '트렌디한사운드',
          '쿨한리듬',
          '모던한스타일',
          '세련된음악',
          '열정적인리듬',
          '스타일리시한비트',
          '차분한멜로디',
          '감각적인음악',
          '신선한사운드',
          '환상적인음악',
          '시원한비트',
          '매력적인사운드',
          '아이코닉한리듬',
          '현대적인음악',
          '편안한분위기',
          '트렌디한리듬',
        ][getRandomIndex(20)]
    );
  },

  getCategory() {
    return Categories[getRandomIndex(9)];
  },

  getFileLength() {
    return 10;
  },

  getBoolean() {
    return [true, false][getRandomIndex(2)];
  },

  getUserType() {
    return ['vocal', 'producer'][getRandomIndex(2)];
  },
};
