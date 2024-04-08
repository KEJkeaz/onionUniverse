

export default {
  
  CheckObjEmpty: ( obj => { 
    return Object.keys(obj).length === 0;
  }),
  textCapitalize: (string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }),

  checkFriendsBoth: ( (friends,targetUser) =>{
    if(friends?.length > 0){
      // 친구가 한명 이상일때
      // 팔로우한 친구 + isMyFriend === true면 unFriends 노출
      // 팔로우하지 않은 친구 + isMyFriend === false면 addFriends 노출
      // this.type = 'addFriends'

      const firendRes = friends.find((friend) => friend.userKey === targetUser);

      // exist
      if(typeof firendRes !== 'undefined'){
        return 'unFriends'
      }
    }
    return 'addFriends'
  }),

}
