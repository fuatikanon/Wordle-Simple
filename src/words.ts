import { WordItem } from './types';
import { VALID_GUESS_WORDS } from './validWords';

// Target words to be picked randomly (easy & common words with Thai meanings)
export const TARGET_WORDS: WordItem[] = [
  { word: 'APPLE', meaningTh: 'แอปเปิ้ล' },
  { word: 'BEACH', meaningTh: 'ชายหาด' },
  { word: 'BREAD', meaningTh: 'ขนมปัง' },
  { word: 'CHAIR', meaningTh: 'เก้าอี้' },
  { word: 'CLOUD', meaningTh: 'ก้อนเมฆ' },
  { word: 'DANCE', meaningTh: 'เต้นรำ' },
  { word: 'DREAM', meaningTh: 'ความฝัน' },
  { word: 'EARTH', meaningTh: 'โลก' },
  { word: 'FRUIT', meaningTh: 'ผลไม้' },
  { word: 'GRACE', meaningTh: 'ความสง่างาม' },
  { word: 'GREEN', meaningTh: 'สีเขียว' },
  { word: 'HEART', meaningTh: 'หัวใจ' },
  { word: 'HOUSE', meaningTh: 'บ้าน' },
  { word: 'LEMON', meaningTh: 'มะนาวเหลือง' },
  { word: 'LIGHT', meaningTh: 'แสงสว่าง' },
  { word: 'MONEY', meaningTh: 'เงิน' },
  { word: 'MUSIC', meaningTh: 'ดนตรี' },
  { word: 'NIGHT', meaningTh: 'กลางคืน' },
  { word: 'OCEAN', meaningTh: 'มหาสมุทร' },
  { word: 'PEACE', meaningTh: 'ความสงบสุข' },
  { word: 'PIANO', meaningTh: 'เปียโน' },
  { word: 'PLANT', meaningTh: 'พืช / ต้นไม้' },
  { word: 'QUEEN', meaningTh: 'ราชินี' },
  { word: 'RIVER', meaningTh: 'แม่น้ำ' },
  { word: 'SHINE', meaningTh: 'เปล่งประกาย' },
  { word: 'SMILE', meaningTh: 'รอยยิ้ม' },
  { word: 'SPACE', meaningTh: 'อวกาศ / พื้นที่' },
  { word: 'STORY', meaningTh: 'เรื่องราว' },
  { word: 'SWEET', meaningTh: 'หวาน' },
  { word: 'TRAIN', meaningTh: 'รถไฟ' },
  { word: 'WATER', meaningTh: 'น้ำ' },
  { word: 'WORLD', meaningTh: 'โลก' },
  { word: 'YOUTH', meaningTh: 'วัยเยาว์' },
  { word: 'BRAIN', meaningTh: 'สมอง' },
  { word: 'CLOCK', meaningTh: 'นาฬิกา' },
  { word: 'TIGER', meaningTh: 'เสือ' },
  { word: 'STONE', meaningTh: 'ก้อนหิน' },
  { word: 'TABLE', meaningTh: 'โต๊ะ' },
  { word: 'PAPER', meaningTh: 'กระดาษ' },
  { word: 'MOUSE', meaningTh: 'หนู / เม้าส์' },
  { word: 'HORSE', meaningTh: 'ม้า' },
  { word: 'SUGAR', meaningTh: 'น้ำตาล' },
  { word: 'GLASS', meaningTh: 'แก้ว' },
  { word: 'SHIRT', meaningTh: 'เสื้อเชิ้ต' },
  { word: 'STORM', meaningTh: 'พายุ' },
  { word: 'SHEEP', meaningTh: 'แกะ' },
  { word: 'CANDY', meaningTh: 'ลูกอม' },
  { word: 'RULER', meaningTh: 'ไม้บรรทัด' },
  { word: 'KNIFE', meaningTh: 'มีด' },
  { word: 'SPOON', meaningTh: 'ช้อน' },
  { word: 'PHONE', meaningTh: 'โทรศัพท์' },
  { word: 'GARDEN', meaningTh: 'สวน' },
].filter((w) => w.word.length === 5);

export const WORD_LIST = TARGET_WORDS;

// Comprehensive Set of all valid 5-letter words (Target words are automatically included)
const VALID_WORDS_SET = new Set<string>([
  ...TARGET_WORDS.map((w) => w.word.toUpperCase()),
  ...VALID_GUESS_WORDS.map((w) => w.toUpperCase()),
]);

export function isValidWord(word: string): boolean {
  if (!word || word.length !== 5) return false;
  return VALID_WORDS_SET.has(word.toUpperCase());
}

export function getRandomWord(): WordItem {
  const randomIndex = Math.floor(Math.random() * TARGET_WORDS.length);
  return TARGET_WORDS[randomIndex];
}
