
var baseUrl = window.location.origin
if(import.meta.env.PROD === true) {
  baseUrl = "https://onion-universe.com"
}


export default {
  baseUrl,
  navList: {
    'Home': ['/', 'house'],
    'Search': ['/search', 'magnifying-glass'],
    'Follower': ['/follower', 'address-book'],
    'Message': ['/message', 'envelope'],
  },

  adminMsgType: {
    join: {
      text: 'join',
      buttonTargetName: 'guide',
      buttonText: 'Guide'
    },
    follow: {
      text: 'follow',
      buttonTarget: 'userpage',
      buttonText: 'Go',
    },
    followRequestPrivate: {
      text: 'followRequestPrivate',
      buttonTargetName: 'userpage',
      buttonText: 'Go',
    },
    followRequestNormal: {
      text: 'followRequestNormal',
      buttonTargetName: 'userpage',
      buttonText: 'Go',
    },
  },
  adminInfo: {
    'userImg': '/adminImg.png',
    'userImgError': '/adminImgSorry.png',
    'userImg404': '/adminImg404.png',
    'imgAlt': 'Team Compass Logo',
    'userName': 'ADMIN'
  },
  messageRules:{
    textareaRules: [
      value => !!value || 'Required.',
      value => (value && value.length > 3) || 'Min 3 characters',
      value => (value && value.length < 201) || 'Max 200 characters',
    ],
    userSelectRules: [
      value => !!value || 'Required.',
    ],
  },
  validateRules: {
    nicknameRules: [
      value => !!value || 'Required.',
      value => (value && value.length > 1) || 'Min 1 characters',
      value => !(value && value.length > 51) || 'Max 50 characters'
    ],
    thumbnailRules: [
      value => !!value || 'Required.',
      value => (value && value.length > 3) || 'Min 5 characters',
    ],
    Inforules: [
      value => !!value || 'Required.',
      value => (value && value.length > 10) || 'Min 10 characters',
      value => !(value && value.length > 201) || 'Max 200 characters'
    ],
    langRules: [
      value => !!value || 'Required.',
    ],
  },
  snsRule: {
    mastodonRule: [
      value => !!value || 'Required.',
    ]
  },
  userUrlRule:{
    labelRule: [
      value => !!value || 'Required.',
    ],
    urlRule: [
      value => !!value || 'Required.',
    ],

  },

  navListBack: {
    'Home': ['/', 'house'],
    'Search': ['/search', 'magnifying-glass'],
    'Friends': ['/friends', 'friends'],
    'Profile': ['/profile', 'user'],
    'Message': ['/message', 'envelope'],
  },
  userRandomImageList:[
    "https://raw.githubusercontent.com/onionuniverse/images/main/img1.jpg",
    "https://raw.githubusercontent.com/onionuniverse/images/main/img2.jpg",
    "https://raw.githubusercontent.com/onionuniverse/images/main/img3.png",
    "https://raw.githubusercontent.com/onionuniverse/images/main/img4.jpg",
    "https://raw.githubusercontent.com/onionuniverse/images/main/img5.jpg",
    "https://raw.githubusercontent.com/onionuniverse/images/main/img6.jpg",
    "https://raw.githubusercontent.com/onionuniverse/images/main/img7.png",
  ],
  userSiteList:[
    {
      'title': 'user naver',
      'url': 'https://www.naver.com/'
    },
    {
      'title': 'user naver shopping',
      'url': 'https://shopping.naver.com/home'
    },
    {
      'title': 'user naver+',
      'url': 'https://www.naver.com/'
    },
    {
      'title': 'user naver||',
      'url': 'https://www.naver.com/'
    },
  ],


}