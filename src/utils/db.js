import Dexie from 'dexie'

export const db = new Dexie('sns_db')

db.version(1).stores({
  categories: '++id, en_name,jp_name',
  photos: '++id,url,category_id,author,avatar,title,desc'
})
export const DEFAULT_PHOTO_DATA = [
  {
    id: 1,
    category_id: 1,
    author: 'Caio',
    avatar: 'https://images.pexels.com/users/avatars/7780/caio-763.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'a tower at night time',
    desc: 'from pexels',
    // url: '/src/assets/images/01.jpeg',
    url: '/photos-view/dist/assets/images/01.jpeg',
    pin: 0
  }, {
    id: 2,
    category_id: 1,
    author: 'moldy vintages',
    avatar: 'https://images.pexels.com/users/avatars/58866212/pexels-user-404.jpeg?auto=compress&fit=crop&h=256&w=256',
    title: 'chocolate french macarons',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/02.jpeg'
    // url: '/src/assets/images/02.jpeg'
  }, {
    id: 3,
    category_id: 1,
    author: 'Flora Westbrook',
    avatar: 'https://images.pexels.com/users/avatars/820907/flora-westbrook-862.jpeg?auto=compress&fit=crop&h=256&w=256',
    title: 'teacup with coffee',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/03.jpeg'
    // url: '/src/assets/images/03.jpeg'
  }, {
    id: 4,
    category_id: 1,
    author: 'Rachel Claire',
    avatar: 'https://images.pexels.com/users/avatars/2272619/rachel-claire-913.jpeg?auto=compress&fit=crop&h=256&w=256',
    title: 'heart shaped latte art',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/04.jpeg'
    // url: '/src/assets/images/04.jpeg'
  }, {
    id: 5,
    category_id: 1,
    author: 'Ben Mack',
    avatar: 'https://images.pexels.com/users/avatars/4672/kaique-rocha-608.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'colorful background with rainbow',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/05.jpeg'
    // url: '/src/assets/images/05.jpeg'
  }, {
    id: 6,
    category_id: 1,
    author: 'Flo Maderebner',
    avatar: 'https://images.pexels.com/users/avatars/67200/flo-maderebner-353.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'aerial view of city',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/06.jpeg'
    // url: '/src/assets/images/06.jpeg'
  }, {
    id: 7,
    category_id: 1,
    author: 'Gradienta',
    avatar: 'https://images.pexels.com/users/avatars/31927565/shahadat-306.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'gradient background',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/07.jpeg'
    // url: '/src/assets/images/07.jpeg'
  },
  {
    id: 8,
    category_id: 1,
    author: 'Pixabay',
    avatar: 'https://images.pexels.com/users/avatars/2659/pixabay-617.png?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'green hill near body of water',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/08.jpeg'
    // url: '/src/assets/images/08.jpeg'
  }, {
    id: 9,
    category_id: 1,
    author: 'Nadezhda Moryak',
    avatar: 'https://images.pexels.com/users/avatars/2359851/nadezhda-moryak-992.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'blue and white light',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/09.jpeg'
    // url: '/src/assets/images/09.jpeg'
  },
  {
    id: 10,
    category_id: 1,
    author: 'Donat Hoti',
    avatar: 'https://images.pexels.com/users/avatars/63700741/donat-hoti-146.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'pink red yellow petaled flower',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/10.jpeg'
    // url: '/src/assets/images/10.jpeg'
  },
  {
    id: 11,
    category_id: 1,
    author: 'Jonathan Cooper',
    avatar: 'https://images.pexels.com/users/avatars/82255355/jonathan-cooper-484.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'green grass field',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/11.jpeg'
    // url: '/src/assets/images/11.jpeg'
  },
  {
    id: 12,
    category_id: 1,
    author: 'Carlos Escobar',
    avatar: 'https://images.pexels.com/users/avatars/32250122/carlos-escobar-122.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'aerial view of ity buildings',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/12.jpeg'
    // url: '/src/assets/images/12.jpeg'
  }, {
    id: 13,
    category_id: 1,
    author: 'shutter_speed',
    avatar: 'https://images.pexels.com/users/avatars/27736/bastian-riccardi-255.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'coloured light of smoke',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/13.jpeg'
    // url: '/src/assets/images/13.jpeg'
  },
  {
    id: 14,
    category_id: 1,
    author: 'Fatih Doğrul',
    avatar: 'https://images.pexels.com/users/avatars/139432474/fatih-dogrul-820.png?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'white and brown building',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/14.jpeg'
    // url: '/src/assets/images/14.jpeg'
  },
  {
    id: 15,
    category_id: 1,
    author: 'Khoa Võ',
    avatar: 'https://images.pexels.com/users/avatars/2347168/khoa-vo-552.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'buildings city lights',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/15.jpeg'
    // url: '/src/assets/images/15.jpeg'
  }, {
    id: 16,
    category_id: 1,
    author: 'Aleksandar Pasaric',
    avatar: 'https://images.pexels.com/users/avatars/105079/aleksandar-pasaric-858.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'white sedan during nighttime',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/16.jpeg'
    // url: '/src/assets/images/16.jpeg'
  }, {
    id: 17,
    category_id: 1,
    author: 'DLKR',
    avatar: 'https://images.pexels.com/users/avatars/3561867/dlkr-666.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'sunset yushima tokyo',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/17.jpeg'
    // url: '/src/assets/images/17.jpeg'
  }, {
    id: 18,
    category_id: 1,
    author: 'Matthew Padilla',
    avatar: 'https://images.pexels.com/users/avatars/44740216/matthew-padilla-370.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'city rooftop building',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/18.jpeg'
    // url: '/src/assets/images/18.jpeg'
  }, {
    id: 19,
    category_id: 1,
    author: 'DLKR',
    avatar: 'https://images.pexels.com/users/avatars/3561867/dlkr-666.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'sunset buildings ueno',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/19.jpeg'
    // url: '/src/assets/images/19.jpeg'
  }, {
    id: 20,
    category_id: 1,
    author: 'Stephen + Alicia',
    avatar: 'https://images.pexels.com/users/avatars/1315397/alicia-collier-125.png?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'high rise buildings',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/20.jpeg'
    // url: '/src/assets/images/20.jpeg'
  }, {
    id: 21,
    category_id: 1,
    author: 'Flo Maderebner',
    avatar: 'https://images.pexels.com/users/avatars/67200/flo-maderebner-353.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'hiking on snow mountain',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/21.jpeg'
    // url: '/src/assets/images/21.jpeg'
  }, {
    id: 22,
    category_id: 1,
    author: 'Marina Shatskikh',
    avatar: 'https://images.pexels.com/users/avatars/25043/marina-shatskih-814.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'stuffed toy on snow',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/22.jpeg'
    // url: '/src/assets/images/22.jpeg'
  }, {
    id: 23,
    category_id: 1,
    author: 'Jill Wellington',
    avatar: 'https://images.pexels.com/users/avatars/1638660/jill-wellington-390.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'snowman holding shovel',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/23.jpeg'
    // url: '/src/assets/images/23.jpeg'
  }, {
    id: 24,
    category_id: 1,
    author: 'Sindre Strom',
    avatar: 'https://images.pexels.com/users/avatars/122132/sindre-strom-344.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'aerial photography of water',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/24.jpeg'
    // url: '/src/assets/images/24.jpeg'
  }, {
    id: 25,
    category_id: 1,
    author: 'David Taljat',
    avatar: 'https://images.pexels.com/users/avatars/3748658/david-taljat-156.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'building near bridge',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/25.jpeg'
    // url: '/src/assets/images/25.jpeg'
  },
  {
    id: 26,
    category_id: 1,
    author: 'Anete Lusina',
    avatar: 'https://images.pexels.com/users/avatars/2202476/anete-lusina-393.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'saucers near instant photo',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/26.jpeg'
    // url: '/src/assets/images/26.jpeg'
  }, {
    id: 27,
    category_id: 1,
    author: 'Francesco Ungaro',
    avatar: 'https://images.pexels.com/users/avatars/21273/francesco-ungaro-565.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'rainbow design decoration',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/27.jpeg'
    // url: '/src/assets/images/27.jpeg'
  }, {
    id: 28,
    category_id: 1,
    author: 'cottonbro',
    avatar: 'https://images.pexels.com/users/avatars/1437723/cottonbro-studio-531.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'white and blue smoke illustration',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/28.jpeg'
    // url: '/src/assets/images/28.jpeg'
  }, {
    id: 29,
    category_id: 1,
    author: 'Tom Verdoot',
    avatar: 'https://images.pexels.com/users/avatars/634961/tom-verdoot-993.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'mountain peak and clouds',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/29.jpeg'
    // url: '/src/assets/images/29.jpeg'
  }, {
    id: 30,
    category_id: 1,
    author: 'Simon Berger',
    avatar: 'https://images.pexels.com/users/avatars/181980/simon-berger-251.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'wooden house burning',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/30.jpeg'
    // url: '/src/assets/images/30.jpeg'
  }, {
    id: 31,
    category_id: 1,
    author: 'Peng LIU',
    avatar: 'https://images.pexels.com/users/avatars/45946/peng-liu-869.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'raised building frame',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/31.jpeg'
    // url: '/src/assets/images/31.jpeg'
  }, {
    id: 32,
    category_id: 1,
    author: 'Peng LIU',
    avatar: 'https://images.pexels.com/users/avatars/45946/peng-liu-869.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'timelapse photography of vehicle',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/32.jpeg'
    // url: '/src/assets/images/32.jpeg'
  }, {
    id: 33,
    category_id: 1,
    author: 'Peng LIU',
    avatar: 'https://images.pexels.com/users/avatars/45946/peng-liu-869.jpeg?auto=compress&fit=crop&h=50&w=50&dpr=2',
    title: 'architecture asia asian building',
    desc: 'from pexels',
    url: '/photos-view/dist/assets/images/33.jpeg'
    // url: '/src/assets/images/33.jpeg'
  }
]

export const PHOTO_TOTAL = DEFAULT_PHOTO_DATA.length

export const initDB = function() {
  let categories = [
    {
      id: 0,
      en_name: 'all',
      jp_name: '全て'
    },
    { id: 1, en_name: 'web_app_icon', jp_name: 'UI/UX' },
    { id: 2, en_name: 'design', jp_name: 'デザイン' },
    { id: 3, en_name: 'illustration', jp_name: 'イラスト' },
    { id: 4, en_name: 'photography', jp_name: '撮影' },
    { id: 5, en_name: 'games', jp_name: 'ゲーム' },
    { id: 6, en_name: 'anime', jp_name: 'アニメ' },
    { id: 7, en_name: 'industrial_design', jp_name: 'インダストリアルデザイン' },
    { id: 8, en_name: 'classical_art', jp_name: '古典芸術' }
  ]

  for (const ele of categories) {
    db.categories.add(ele)
  }


  for (const ele of DEFAULT_PHOTO_DATA) {
    db.photos.add(ele)
  }
}