<script lang="ts">
  import { IMarkerInformation } from "../interfaces";
  import { activeMarker } from "./stores";
  import { v4 as uuidv4 } from 'uuid';

  export let markerInformation: IMarkerInformation;
  export let order: number;
  const markerId = uuidv4();

  const handleClick = () => {
    if($activeMarker?.markerId === markerId) {
      activeMarker.set(null);
    } else {
      activeMarker.set({
        markerId,
        markerInformation
      });
    }
  }

  let {x,y, cx, cy, offset} = markerInformation.anchorPosition;
  if(offset?.left) { cx += offset?.left; x += offset?.left; }
  if(offset?.right) { cx -= offset?.right; x -= offset?.right; }
  if(offset?.top) { cy += offset?.top; y += offset?.top; }
  if(offset?.bottom) { cy -= offset?.bottom; y -= offset?.bottom; }

  const {activeBackgroundColor, hoverBackgroundColor, backgroundColor} = markerInformation.message.onboardingStage;
  const {marker} = markerInformation;
</script>

<g id={markerId} text-anchor="middle" on:click={handleClick}>
  <circle style="
    --active-background-color:{activeBackgroundColor || hoverBackgroundColor || backgroundColor};
    --hover-background-color:{hoverBackgroundColor || backgroundColor};
    --backgroundColor:{backgroundColor}
  "
  class={`visahoi-marker ${ $activeMarker?.markerId === markerId ? 'active' : ''}`} cx={markerInformation.anchorPosition.cx} cy={markerInformation.anchorPosition.cy} r={marker?.radius || 15} />
  <text style="user-select:none" fill="white" x={markerInformation.anchorPosition.x} y={markerInformation.anchorPosition.y}>{typeof marker?.content == 'string' ? marker.content : order}</text>
</g>

<style>
  circle {
    display: flex;
    justify-content: center;
    align-items: center;
    fill: var(--backgroundColor);
    transition: fill 0.2s ease;
  }

  circle.active {
    fill: var(--active-background-color);
  }

  g:hover > circle{
    fill: var(--hover-background-color);
  }

  g {
    cursor: pointer;
  }
</style>
