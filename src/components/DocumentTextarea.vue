<template>
    <div class="document-input">
      <span v-if="isShowTitle" class="document-input__title"><slot/></span>
      <my-textarea class="input" v-model="inputModel"/>
    </div>
  </template>
  
  <script>
    import MyTextarea from './UI/MyTextarea.vue';
  
    export default {
      name: 'document-textarea',
  
      props: {
        /**
         * значение инпута
         */
        inputValue: {
          type: [String, Number],
          default: ''
        }
      },
  
      data() {
        return {
          inputModel: this.inputValue
        }
      },
  
      components: { MyTextarea },
  
      computed: {
        /**
         * условие отображения заголовка
         */
        isShowTitle() {
          return this.$slots?.default()?.[0];
        },
        chapterToArray() {
          
        }
      },
  
      watch: {
        inputModel: {
          handler(value) {
            this.$emit('update:inputValue', value);
          }
        }
      }
    }
  </script>
  
  <style>
    .document-input {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      margin: 15px 0;
    }
  
    .document-input > .input {
      width: 70%;
    }
  </style>
  
  