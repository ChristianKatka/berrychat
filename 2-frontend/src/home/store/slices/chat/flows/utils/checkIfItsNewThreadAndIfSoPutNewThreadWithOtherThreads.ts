export const checkIfItsNewThreadAndIfSoPutNewThreadWithOtherThreads = (
  newMetaDataThread: any,
  selectedThreadId: any,
  alreadyExistingThreads: any,
) => {
  // jos selectedThreadId = undefined meinaa et on eka viesti jolloin
  // puske newMetaDataThread alreadyExistingThreads directoryyn

  if (!selectedThreadId) {
    return {
      ...alreadyExistingThreads,
      [newMetaDataThread.id]: newMetaDataThread,
    };
  }

  // jos on jo selectedThreadId se meinaa että keskustelu jatkuu kyseiseen ketjuun
  // tällöin voit vain palauttaa olemassa olevat threadit alreadyExistingThreads
  else {
    return alreadyExistingThreads;
  }

  const newMetaDataThreadMock = {
    id: '382dd621-0cfc-4082-881d-752428ef0d6a',
    metadata: {},
    user_id: 'c26574a4-30c1-70bb-3052-98d35adfdb94',
    status: 'idle',
    created_at: '2025-05-22 11:56:10.656243',
  };

  const selectedThreadIdMock = '382dd621-0cfc-4082-881d-752428ef0d6a';

  const alreadyExistingThreadsMock = {
    '0bca2c73-d38c-4cb8-9c30-b6af32d5f61b': {
      id: '0bca2c73-d38c-4cb8-9c30-b6af32d5f61b',
      metadata: {},
      user_id: 'c26574a4-30c1-70bb-3052-98d35adfdb94',
      status: 'idle',
      created_at: '2025-05-20 04:01:18.351326',
    },
    '3aced16a-a89b-4c50-858d-b63f8257a9af': {
      id: '3aced16a-a89b-4c50-858d-b63f8257a9af',
      metadata: {},
      user_id: 'c26574a4-30c1-70bb-3052-98d35adfdb94',
      status: 'idle',
      created_at: '2025-05-21 04:01:11.532747',
    },
    '539b9510-eb43-48c2-96a6-a4b4a50addff': {
      id: '539b9510-eb43-48c2-96a6-a4b4a50addff',
      metadata: {},
      user_id: 'c26574a4-30c1-70bb-3052-98d35adfdb94',
      status: 'idle',
      created_at: '2025-05-21 04:01:11.532747',
    },
  };
};
