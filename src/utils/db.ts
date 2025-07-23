import { openDB, DBSchema, IDBPDatabase } from 'idb';
import { Nickname } from '@/types';

// DB 스키마 타입 정의
interface NicknameDB extends DBSchema {
  nicknames: {
    key: number;
    value: Nickname;
    indexes: { 'by-date': string };
  };
}

const DB_NAME = 'nickname-db';
const STORE_NAME = 'nicknames';
let dbPromise: Promise<IDBPDatabase<NicknameDB>> | null = null;

// DB 초기화 함수
function getDb() {
  if (!dbPromise) {
    dbPromise = openDB<NicknameDB>(DB_NAME, 1, {
      upgrade(db) {
        // 'nicknames'라는 object store(테이블과 유사)를 생성
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: 'id',
        });
        // 날짜로 정렬할 수 있도록 인덱스 생성
        store.createIndex('by-date', 'date');
      },
    });
  }
  return dbPromise;
}

// 모든 닉네임 가져오기 (최신순으로 정렬)
export async function getAllNicknames(): Promise<Nickname[]> {
  const db = await getDb();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  // 최신 날짜가 위로 오도록 역순으로 정렬
  const nicknames = await store.index('by-date').getAll();
  return nicknames;
}

// 새 닉네임 추가하기
export async function addNickname(nickname: Nickname): Promise<void> {
  const db = await getDb();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.objectStore(STORE_NAME).put(nickname);
  await tx.done;
}

// 여러 닉네임 삭제하기
export async function deleteNicknames(ids: number[]): Promise<void> {
  const db = await getDb();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  // Promise.all을 사용해 여러 삭제 작업을 동시에 처리
  await Promise.all([
    ...ids.map((id) => tx.objectStore(STORE_NAME).delete(id)),
    tx.done,
  ]);
}

// 전체 닉네임 삭제하기
export async function deleteAllNicknames(): Promise<void> {
  const db = await getDb();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  await tx.objectStore(STORE_NAME).clear();
  await tx.done;
}

// DB 파일 저장하기
export async function exportDBToJsonFile() {
  const db = await getDb();
  const tx = db.transaction(STORE_NAME, 'readonly');
  const store = tx.objectStore(STORE_NAME);
  const allData = await store.getAll();

  const json = JSON.stringify(allData, null, 2); // 보기 좋게 들여쓰기
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'db.json';
  a.click();
  URL.revokeObjectURL(url);
}

// DB 파일 불러오기
export async function importJsonToDB(file: File): Promise<void> {
  const text = await file.text();
  const parsed: Nickname[] = JSON.parse(text);

  const db = await getDb();
  const tx = db.transaction(STORE_NAME, 'readwrite');
  const store = tx.objectStore(STORE_NAME);

  for (const item of parsed) {
    await store.put(item);
  }

  await tx.done;
}
