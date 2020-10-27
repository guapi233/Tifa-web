<template>
  <div class="hello">
    <Button>我靠</Button>
  </div>
</template>

<script lang="ts">
import {
  Component,
  Prop,
  Vue,
  Watch,
  Ref,
  Provide,
  ProvideReactive
} from "vue-property-decorator";

@Component
export default class HelloWorld extends Vue {
  private content = "12";
  @Ref() private add!: HTMLButtonElement;
  @Ref("add") private dda!: HTMLButtonElement;

  @Provide() private info = "I'm provide man";
  @ProvideReactive() infoR = "I'm provideR man";

  private acc(val: string, tt: string | undefined) {
    console.log(this.add, this.dda);
    this.content = val;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
