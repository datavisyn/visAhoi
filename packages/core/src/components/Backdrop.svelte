<script lang="ts">
  import { VisahoiState } from "./state.js";
  
  export let visState: VisahoiState;
  const { visHeight, visWidth, visXPosition, visYPosition, backdropOpacity } = visState;

  const fullAppWidth = "100vw";
  const fullAppHeight = "100vh";

  // consider the current scroll offset inside the window
  const scrollOffsetX = window.scrollX;
  const scrollOffsetY = window.scrollY;

  // @see http://bennettfeely.com/clippy/ -> select `Frame` example
  $: backdropPath = `polygon(
      0% 0%,
      0% ${fullAppHeight},
      ${$visXPosition + scrollOffsetX}px ${fullAppHeight},
      ${$visXPosition + scrollOffsetX}px ${$visYPosition + scrollOffsetY}px,
      ${$visXPosition + $visWidth + scrollOffsetX}px ${$visYPosition + scrollOffsetY}px,
      ${$visXPosition + $visWidth + scrollOffsetX}px ${
    $visYPosition + $visHeight + scrollOffsetY + 5
  }px,
      ${$visXPosition + scrollOffsetX}px ${
    $visYPosition + $visHeight + scrollOffsetY + 5
  }px,
      ${$visXPosition + scrollOffsetX}px ${fullAppHeight},
      ${fullAppWidth} ${fullAppHeight},
      ${fullAppWidth} 0%
    )`;

</script>

<div class="backdrop" style="--clipPath: {backdropPath}; --opacity: {$backdropOpacity}"></div>

<style>
  .backdrop {
    background-color: rgba(0, 0, 0, var(--opacity));
    clip-path: var(--clipPath);
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }
</style>
