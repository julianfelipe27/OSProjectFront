var app = new Vue({
    el: '#app',
    router:new VueRouter({
        routes:[
            {path:'/', component:this}
        ]
    }),
    vuetify:new Vuetify(),
    data: {
        isOpen:false,
        loaded:false,
        search:'',
        msg:'',
        pid:'',
        name:'',
        headers:[
            {text:'Process ID', value:'pid', align:'center'},
            {text:'Process Name', value:'name', sorteable:true, align:'center'},
            {text:'Kill?', value:'kill', sorteable:false, align:'center'},
        ],
        processes:[]
    },
    mounted(){
        let process=[]
        fetch('http://localhost:3000/listProcess').then(response=>{
            return response.json()
        }).then(json=>{
             json.map(p=>{
                 process.push(p)
             })   
        })
        this.processes=process
        },
    methods:{
        refresh(){
        window.location.reload()
        },
        async killProcess(id){
        let msg=""
        await fetch(`http://localhost:3000/killProcess/${id}`).then(response=>{
             return response.json()
        }).then(json=>{
            msg=json.text
        })
        this.isOpen=true
        this.msg=msg
        this.loaded=true
        }
    }
})
