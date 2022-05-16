<template>
  <select class="select" v-model="lang" v-on:change="handleChange()">
    <option value="en-GB">English</option>
    <option value="et-EE">Eesti</option>
    <option value="ru-RU">Russian</option>
  </select>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  name: "LangSwitcher",
  data(){
    const lang = localStorage.getItem("lang") || "en-GB";
    return {
      lang: lang,
    }
  },
  methods: {
    handleChange(){
      localStorage.setItem("lang", this.lang)
      this.$i18n.locale = localStorage.getItem("lang") || "en-GB";
    }
  }
})
</script>

<style lang="less" scoped>

@glass: #4CAF50;
@glass-icon: #4CAF50;
@gradient: linear-gradient(35deg, red, purple);
@option: #42b983;



/* <select> styles */
select {
  /* Reset */
  appearance: none;
  border: 0;
  outline: 0;
  font: inherit;
  font-size: 15px;
  /* Personalize */
  height: 3em;
  padding: 0 2em 0 15px;
  background: url(https://upload.wikimedia.org/wikipedia/commons/9/9d/Caret_down_font_awesome_whitevariation.svg)
  no-repeat right 0.8em center / 1.4em,
  linear-gradient(to left, @glass-icon 3em, @glass 3em);
  color: white;
  border-radius: 0.25em;
  box-shadow: 0 0 1em 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
  /* <option> colors */
  option {
    color: inherit;
    background-color: @option;
  }
  /* Remove focus outline */
  &:focus {
    outline: none;
  }
  /* Remove IE arrow */
  &::-ms-expand {
    display: none;
  }
}

</style>