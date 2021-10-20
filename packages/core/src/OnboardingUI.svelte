<script lang="ts">
  export let x: number;
  export let y: number;
  export let width: string;
  export let height: string;
</script>

<style>
  p#test {

    color:yellow;
  }
  div {
    position: relative;
    width: var(--width);
    height: var(--height);
    background-color: wheat;
  }

</style>

<div id="onboarding-ui-test"
style="--width:{width}; --height:{height}">
<p id="testt">Test</p>
</div>
