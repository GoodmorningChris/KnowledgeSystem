import {createStore} from "vuex";

// 创建一个新的 store 实例
const store = createStore({
    state: {
        userId:'',
        nickname:'',
        searchComment:'',
        userInfo:{},         //用户信息
    },
    getters: {    //获取用户信息
        getUserInfo: state => {
            if(state.userInfo === undefined || state.userInfo.username === undefined){
                let userInfo = window.localStorage.getItem("userInfo");
                if(userInfo === undefined){
                    return new Object();
                }else{
                    state.userInfo=JSON.parse(userInfo);
                    return state.userInfo;
                }
            }else{
                return state.userInfo
            }
        }
    },
    mutations:{
        setKnowledgeDetail1(state,obj){
            state.knowledgeDetail1=obj
        },
        setUserInfo(state, payload) {     //将用户信息保存到浏览器缓存
            window.localStorage.setItem("userInfo", JSON.stringify(payload));
            state.userInfo = payload;
        }
    },
    actions:{},
    plugins: [

    ]
});

export default store;