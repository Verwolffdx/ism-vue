<template>
    <div class="document-input">
      <span v-if="isShowTitle" class="document-input__title"><slot/></span>
      <my-input class="input" v-model="inputModel"/>
    </div>
  </template>
  
  <script>
    import MyInput from './UI/MyInput';
  
    export default {
      name: 'document-input',
  
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
  
      components: { MyInput },
  
      computed: {
        /**
         * условие отображения заголовка
         */
        isShowTitle() {
          return this.$slots?.default()?.[0];
        },
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
  
  