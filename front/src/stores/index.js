import { createStore } from "vuex";
import axios from "@/utills/hooks/axiosWrapper"
import router from "@/router"
import commonVariable from "../utills/commonVariable";

export default createStore({
  state: {
    width: 959,
    isMobile: false,
    userKey: '',
    isLogin: false,
    myDetail: {},
    snsList: null
  },
  getters: {
    snsList(state){
      return state.snsList;
    },
    isLogin(state){
      return state.isLogin;
    },
    time2(state) {
      return state.counter * 2;
    },
    myDetail(state){
      return state.myDetail;
    },
    userKey(state){
      return state.userKey;
    },
  },
  mutations: {
    setSnsList(state, snsList){
      state.snsList = snsList
    },
    checkMobile(state, stat){
      if(stat == true){
        state.isMobile = true
      }else{
        if(state.width >= window.innerWidth){
          state.isMobile = true
        }else{
          state.isMobile = false
        }
      }
    },
    setCounter(state, value) {
      state.counter = value;
    },

    setMyDetail(state, value) {
      state.userKey = value.user.userKey

      // add user.userLinkList KEY
      value.user.userLinkList.map((url, key) =>{
        Object.assign(url, {'key': 'drag_' + key})
      })
      state.myDetail.friends = value.friends
      state.myDetail = value
      state.myDetail.user.userLinkListCopy = JSON.parse(JSON.stringify(value.user.userLinkList));
    },
    setLogout(state) {
      state.isLogin= false
      state.userKey = '';
      state.myDetail = {}
      localStorage.removeItem('compassJwt')
      localStorage.removeItem('compassRT')
    },
    setFriendMemo(state, value) {
       let friend = state.myDetail.friends.map( friend=>{
        if(friend.userKey === value.friend_userKey){
          friend.memo = value.props.memo
        }
      })
    },
  },
  actions: {
    async initSPA({commit}) {
      const res = await axios.get('/api/init-spa')
      let json = res.data 
      commit('setSnsList', json.snsList)
    },
    async logout({commit}){
      commit('setLogout')
      router.replace({name: 'main' })
    },
    async logReset({commit}){
      commit('setLogout')
    },
    changeFriendMemo({commit}, context){
      commit('setFriendMemo', context)
    },
    async getMyDetail({commit, dispatch}){
      try {
        const res = await axios.get('/api/me/detail')
        if (res.status === 200) {
          commit('setMyDetail', res.data)
          
        }
      }
      catch(error) {
        alert("Error occured")
        dispatch('logout') 
      }
      
    },
    
    async refreshJwt({commit, dispatch}, context){
      
      try {

        let param ={
          access_token: localStorage.getItem('compassJwt'),
          refresh_token: localStorage.getItem('compassRT')
        }

        const res = await axios.post('/api/refresh-access-token', param)
        if (res.status === 200) {
          localStorage.setItem('compassJwt', res.data.jwt);
          localStorage.setItem('compassRT', res.data.rt);
          
        }else{
          alert("Your login has expired.")
          dispatch('logout')
        }
      }
      catch(error) {
        // error ignore
      }

    },
    test(context){
      
    }
  }
});
 