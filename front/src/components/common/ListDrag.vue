
<template >

<div class="dragContainer" id="dragContainer">
  <v-list 
    lines="one"  
    class="mb-6 dragListBox">
    <div 
    v-for="(site, key) in listData"
      @drop.prevent="onDrop($event, site, key)"
      @dragenter="dragEnter($event,site, key)"
      @dragover.prevent
      @dragleave="dragLeave($event,site, key)"
      @dragstart="startDrag($event, site, key)"
      @dragend ="dragEnd($event)"
      draggable="true"
      :class='`dragTarget-${site.key}`'
      class="listContentBox"
      >
    <v-list-item
      class="listContent"
      :key="site.key"
      :title="site.label"
      :subtitle="site.url">

      <template v-slot:prepend>
        <v-avatar color="brendColor" >
          <v-icon color="black">mdi-drag-horizontal-variant</v-icon>
        </v-avatar>
      </template>

      <template v-slot:append>
        <v-btn
          class="closeBtn"
          color="grey-lighten-1"
          icon="mdi-close"
          variant="text"
          @click="clickRemoveBtn(site, key)"
        ></v-btn>
      </template>
    </v-list-item>
  </div>
  </v-list>
</div>
</template>
<script>

export default {
  name: 'listDrag',
  props:{
    list: Array
  },
  data(){
    return{
      listData: [],
      listDataCopy: null,
      selectedElement: null,
      selected: null,
      overTarget: null,

      time: 0,
    }
  },
  mounted(){
    this.listData = JSON.parse(JSON.stringify(this.list))

  },
  methods: {
    clickRemoveBtn(site, key){
      let res = {
        'site': site,
        'key': key
      }
        this.$emit('removeMyUrl', res)

    },
    dragPrevent(event){
      event.stopPropagation()
      event.preventDefault();
    },
    startDrag(event, item, key) {
      event.dataTransfer.dropEffect = 'copy';
      event.dataTransfer.effectAllowed = "move"
      const dragData = {
        item: item,
        key:key
      }
      const selectedKey = event.dataTransfer.setData("selectedItem", JSON.stringify(dragData))

      this.selectedElement = event.target
      this.selected = item
      
      event.target.classList.add('draging');
    },
    deepCopy(data){
      return JSON.parse(JSON.stringify(data))
    },
    dragEnter(event, item, key){
      let dragBox = document.getElementsByClassName(`dragTarget-${item.key}`);
      if(this.selected.key === item.key){
        return;
      }
      
      if ((new Date).getTime() - this.time > 2) {
        this.time = (new Date).getTime();
        dragBox[0].classList.add('dragEnter');

        if(this.overTarget !== null){
          return
        }
        const dragData = {
          item: item,
          key:key
        }

        this.overTarget = dragData
      }
      this.dragPrevent(event)
    },
    dragLeave(event, item, key){
      event.preventDefault();
      if(this.overTarget === null){
        return
      }
      if ((new Date).getTime() - this.time > 2) {
        
        this.time = (new Date).getTime();
        let dragBox = document.getElementsByClassName('listContentBox');
        
        if(dragBox.length> 0){
          for (var i = 0; i < dragBox.length; i++) {
            dragBox[i].classList.remove("dragEnter");
          }
        }

        this.overTarget = null
        const selectedKey = event.dataTransfer.getData("selectedItem")
      }
    },
    dragEnd(event){
      // drag element style remove
      var element = document.getElementsByClassName("draging");
      if(element.length> 0){
        element[0].classList.remove('draging')
      }
      
      let dragBox = document.getElementsByClassName('listContentBox');
      if(dragBox.length> 0){
        for (var i = 0; i < dragBox.length; i++) {
          dragBox[i].classList.remove("dragEnter");
        }
      }

      
    },
    
    onDrop(event,item, key ) {

    const selected = JSON.parse(event.dataTransfer.getData("selectedItem"))
    this.listData[selected.key].ghost = true

    
    let ghostKey = null
      this.listData.map((data, key) => {  
        if(data.ghost === true){
          return ghostKey = key
        }
    })

    // last or first
    if(this.listData.length - 1 === key|| key > ghostKey ){
      key = key+1
    }
    
    this.listData.splice(key, 0, selected.item);
    let withoutGhost = this.listData.filter((list=> list.ghost === undefined))
    this.listData = withoutGhost
    this.returnDragRes(this.listData)
    },


    returnDragRes(res){

      this.$emit('returnDragRes', res)
    },
  },
  watch:{
    list(val){
      this.listData = []
      this.listData = val
    }
  }
};
</script>
